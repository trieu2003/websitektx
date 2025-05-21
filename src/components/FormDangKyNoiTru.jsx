import React, { useState, useEffect } from "react";
import { getAvailableBeds } from "../services/api_KyTucXac";
import api from "../services/api_KyTucXac";
import Modal from './Modal';
import Table from './Table';

const FormDangKyNoiTru = () => {
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Current date: May 21, 2025, 12:48 PM +07
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Fetch available beds when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const fetchBeds = async () => {
        setIsLoading(true);
        setError(null);
        setAvailableBeds([]);
        try {
          console.log('Calling getAvailableBeds');
          const beds = await getAvailableBeds();
          console.log('Fetched beds:', beds);
          const formattedBeds = beds.map(bed => ({
            ...bed,
            TenThietBi: Array.isArray(bed.TenThietBi) && bed.TenThietBi.length > 0
              ? bed.TenThietBi.join(", ")
              : "Không có thiết bị"
          }));
          console.log('Formatted beds:', formattedBeds);
          setAvailableBeds(formattedBeds);
        } catch (err) {
          console.error('Error in fetchBeds:', err.message);
          setError(err.message || 'Không thể lấy danh sách giường trống.');
          setAvailableBeds([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBeds();
    }
  }, [isModalOpen]);

  // Handle bed selection
  const handleSelectBed = (bed) => {
    console.log('Selected bed:', bed);
    setSelectedBed(bed);
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleRegister = async () => {
    if (!studentId.trim()) {
      setError("Vui lòng nhập mã sinh viên!");
      return;
    }
    if (!selectedBed) {
      setError("Vui lòng chọn một giường!");
      return;
    }
    if (!isTermsAgreed) {
      setError("Vui lòng đồng ý với các điều khoản nội trú!");
      return;
    }

    setIsLoading(true);
    try {
      const registrationData = {
        MaSV: studentId.trim(),
        MaGiuong: selectedBed.MaGiuong,
        MaPhong: selectedBed.MaPhong,
        NgayDangKy: new Date().toISOString().split('T')[0],
        NgayBatDau: new Date().toISOString().split('T')[0],
        NgayKetThuc: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        DotDangKy: selectedYear,
        MaNamHoc: selectedYear.replace("-", ""),
        TrangThai: "Chờ duyệt",
        TrangThaiDuyet: "Chưa duyệt",
        PhuongThucThanhToan: "Chuyển khoản",
        MaNV: null
      };

      await api.axiosInstance.post('api/HopDongNoiTru', registrationData);
      alert(`Đăng ký thành công! Giường: ${selectedBed.MaGiuong}, Phòng: ${selectedBed.TenPhong}`);
      setStudentId("");
      setSelectedBed(null);
      setIsTermsAgreed(false);
      setSelectedYear("2024-2025");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Academic years
  const academicYears = ["2024-2025", "2025-2026", "2026-2027"];

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Đăng ký nội trú</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thời gian đăng ký nội trú
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentDate}
            readOnly
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          >
            {academicYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mã sinh viên
        </label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Nhập mã sinh viên"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thông tin giường - phòng
        </label>
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => {
              console.log('Opening modal');
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            Chọn giường
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              console.log('Closing modal');
              setIsModalOpen(false);
            }}
            title="Chọn giường"
            showConfirm={false}
          >
            {isLoading && <div className="text-gray-500 mb-4">Đang tải danh sách giường...</div>}
            {!isLoading && error && <div className="text-red-500 mb-4">{error}</div>}
            {!isLoading && availableBeds.length === 0 && !error && (
              <div className="text-gray-500 mb-4">Không có giường trống nào hiện tại.</div>
            )}
            {!isLoading && availableBeds.length > 0 && (
              <>
                <div className="mb-4">Số giường trống: {availableBeds.length}</div>
                <Table
                  columns={[
                    { title: "Mã giường", field: "MaGiuong" },
                    { title: "Mã phòng", field: "MaPhong" },
                    { title: "Tên phòng", field: "TenPhong" },
                    { title: "Loại phòng", field: "TenLoaiPhong" },
                    { title: "Trạng thái", field: "TrangThai" },
                    { title: "Tên thiết bị", field: "TenThietBi" },
                  ]}
                  data={availableBeds}
                  onRowClick={handleSelectBed}
                />
              </>
            )}
          </Modal>
          <button
            onClick={() => setSelectedBed(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400"
            disabled={!selectedBed || isLoading}
          >
            Xóa giường
          </button>
        </div>
        {selectedBed && (
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>Giường đã chọn:</strong> {selectedBed.MaGiuong}</p>
            <p><strong>Phòng:</strong> {selectedBed.TenPhong} ({selectedBed.MaPhong})</p>
            <p><strong>Loại phòng:</strong> {selectedBed.TenLoaiPhong}</p>
            <p><strong>Thiết bị:</strong> {selectedBed.TenThietBi}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isTermsAgreed}
            onChange={(e) => setIsTermsAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
            disabled={isLoading}
          />
          <span className="ml-2 text-gray-700">Tôi đồng ý với các điều khoản nội trú</span>
        </label>
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!studentId.trim() || !selectedBed || !isTermsAgreed || isLoading}
      >
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </button>
    </div>
  );
};

export default FormDangKyNoiTru;
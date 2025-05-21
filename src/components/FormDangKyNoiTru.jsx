import React, { useState, useEffect } from "react";
import { getAvailableBeds } from "../services/api_KyTucXac"; // Named import
import Modal from './Modal';
import Table from './Table';

const FormDangKyNoiTru = () => {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [error, setError] = useState(null);

  // Current date: May 20, 2025, formatted as DD/MM/YYYY
  const currentDate = "20/05/2025";

  // Fetch available beds when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const fetchBeds = async () => {
        try {
          const beds = await getAvailableBeds();
          setAvailableBeds(beds);
          setError(null);
        } catch (err) {
          setError(err.message);
          setAvailableBeds([]);
        }
      };
      fetchBeds();
    }
  }, [isModalOpen]);

  // Handle bed selection from Table
  const handleSelectBed = (bed) => {
    setSelectedBed(bed);
    setIsModalOpen(false); // Close modal after selection
  };

  // Handle form submission
  const handleRegister = () => {
    if (!selectedBed) {
      alert("Vui lòng chọn một giường!");
      return;
    }
    if (!isTermsAgreed) {
      alert("Vui lòng đồng ý với các điều khoản nội trú!");
      return;
    }
    // Implement registration logic (e.g., send data to backend)
    alert(`Đăng ký thành công! Giường: ${selectedBed.MaGiuong}, Phòng: ${selectedBed.TenPhong}`);
    // Reset form
    setSelectedBed(null);
    setIsTermsAgreed(false);
    setSelectedYear("2023-2024");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Đăng ký nội trú</h2>

      {/* First Row: Date and Academic Year */}
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
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>
      </div>

      {/* Second Row: Bed-Room Information */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thông tin giường - phòng
        </label>
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Chọn giường
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Chọn giường"
            showConfirm={false}
          >
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Table
              columns={[
                { title: "Mã giường", field: "MaGiuong" },
                { title: "Mã phòng", field: "MaPhong" },
                { title: "Tên phòng", field: "TenPhong" },
                { title: "Loại phòng", field: "TenLoaiPhong" },
                { title: "Trạng thái", field: "TrangThai" },
              ]}
              data={availableBeds}
              onRowClick={handleSelectBed}
            />
          </Modal>
          <button
            onClick={() => setSelectedBed(null)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            disabled={!selectedBed}
          >
            Xóa giường
          </button>
        </div>
        {selectedBed && (
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>Giường đã chọn:</strong> {selectedBed.MaGiuong}</p>
            <p><strong>Phòng:</strong> {selectedBed.TenPhong} ({selectedBed.MaPhong})</p>
            <p><strong>Loại phòng:</strong> {selectedBed.TenLoaiPhong}</p>
          </div>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isTermsAgreed}
            onChange={(e) => setIsTermsAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Tôi đồng ý với các điều khoản nội trú</span>
        </label>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!selectedBed || !isTermsAgreed}
      >
        Đăng ký
      </button>
    </div>
  );
};

export default FormDangKyNoiTru;
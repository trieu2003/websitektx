import React, { useEffect, useState } from "react";
import axios from "axios";

const LOCAL_STORAGE_KEY = "hoadon_boloc";

export default function HoaDon() {
  const [maSV, setMaSV] = useState("");
  const [hoaDonData, setHoaDonData] = useState([]);
  const [hoTen, setHoTen] = useState("");
  const [ngayTu, setNgayTu] = useState("");
  const [ngayDen, setNgayDen] = useState("");
  const [loaiKhoanThu, setLoaiKhoanThu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  const loaiKhoanThuOptions = ["Tiền Điện", "Tiền Nước", "Hợp Đồng Nội Trú"];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
  }, []);

  // Load bộ lọc từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (saved) {
      setHoTen(saved.hoTen || "");
      setNgayTu(saved.ngayTu || "");
      setNgayDen(saved.ngayDen || "");
      setLoaiKhoanThu(saved.loaiKhoanThu || []);
    }
  }, []);

  useEffect(() => {
    if (maSV) fetchData();
  }, [maSV]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!maSV) return;
      fetchData();
      // Lưu lại bộ lọc
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ hoTen, ngayTu, ngayDen, loaiKhoanThu })
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [hoTen, ngayTu, ngayDen, loaiKhoanThu, currentPage]);

  const fetchData = async () => {
    try {
      const res = await axios.post("https://localhost:5181/api/PhieuThu/phieuthu/loc-nang-cao", {
        MaSV: maSV,
        TenSinhVien: hoTen.trim() || null,
        NgayLapTu: ngayTu || null,
        NgayLapDen: ngayDen || null,
        LoaiKhoanThu: loaiKhoanThu.length > 0 ? loaiKhoanThu : null,
        Page: currentPage,
        PageSize: pageSize,
      });

      setHoaDonData(res.data.data || []);
      setTotalRecords(res.data.totalRecords || 0);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const handleClearFilters = () => {
    setHoTen("");
    setNgayTu("");
    setNgayDen("");
    setLoaiKhoanThu([]);
    setCurrentPage(1);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Lọc & Danh sách hóa đơn</h2>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Họ tên sinh viên</label>
          <input
            type="text"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ngày lập từ</label>
          <input
            type="date"
            value={ngayTu}
            onChange={(e) => setNgayTu(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ngày lập đến</label>
          <input
            type="date"
            value={ngayDen}
            onChange={(e) => setNgayDen(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Loại khoản thu</label>
        <div className="flex flex-wrap gap-4">
          {loaiKhoanThuOptions.map((option) => (
            <label key={option} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                checked={loaiKhoanThu.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLoaiKhoanThu([...loaiKhoanThu, option]);
                  } else {
                    setLoaiKhoanThu(loaiKhoanThu.filter((item) => item !== option));
                  }
                }}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nút xoá lọc */}
      <div className="mb-6 text-right">
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Xóa bộ lọc
        </button>
      </div>

      {/* Bảng kết quả */}
      <div className="overflow-x-auto border rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Mã phiếu thu</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Họ tên</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Ngày lập</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Tổng tiền</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Trạng thái</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Loại khoản thu</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hoaDonData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              hoaDonData.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{item.maPhieuThu}</td>
                  <td className="px-4 py-2">{item.hoTen}</td>
                  <td className="px-4 py-2">
                    {new Date(item.ngayLap).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2">
                    {item.tongTien.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-2">{item.trangThai}</td>
                  <td className="px-4 py-2">
                    {item.chiTietPhieuThu?.map((ct, i) => (
                      <span key={i} className="inline-block mr-2">
                        {ct.loaiKhoanThu}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="text-sm">
          Trang {currentPage} / {Math.ceil(totalRecords / pageSize) || 1}
        </span>
        <button
          disabled={currentPage >= Math.ceil(totalRecords / pageSize)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

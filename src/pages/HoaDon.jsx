import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HoaDonThanhToan() {
  const [maSV, setMaSV] = useState("");
  const [danhSachPhieuThu, setDanhSachPhieuThu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
  }, []);

  useEffect(() => {
    if (!maSV) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://localhost:5181/api/PhieuThu/phieu-thu-da-thanh-toan?maSV=${maSV}`
        );
        setDanhSachPhieuThu(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phiếu thu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maSV]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Hóa đơn đã thanh toán</h2>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : danhSachPhieuThu.length === 0 ? (
        <p className="text-center text-gray-600">Không có phiếu thu nào đã thanh toán.</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                {[
                  "Mã Phiếu Thu",
                  "Ngày Lập",
                  "Tổng Tiền",
                  "Trạng Thái",
                  "Nhân Viên",
                  "Loại Khoản Thu",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {danhSachPhieuThu.map((phieu, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{phieu.maPhieuThu}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {new Date(phieu.ngayLap).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {phieu.tongTien.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{phieu.trangThai}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{phieu.tenNhanVien}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {Array.isArray(phieu.loaiKhoanThu)
                      ? phieu.loaiKhoanThu.join(", ")
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

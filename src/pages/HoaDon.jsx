import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HoaDonThanhToan() {
  const [maSV, setMaSV] = useState("");
  const [danhSachPhieuThu, setDanhSachPhieuThu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy mã sinh viên từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
  }, []);

  // Gọi API khi đã có mã sinh viên
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hóa đơn đã thanh toán</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : danhSachPhieuThu.length === 0 ? (
        <p>Không có phiếu thu nào đã thanh toán.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2">Mã Phiếu Thu</th>
                <th className="border px-4 py-2">Ngày Lập</th>
                <th className="border px-4 py-2">Tổng Tiền</th>
                <th className="border px-4 py-2">Trạng Thái</th>
                <th className="border px-4 py-2">Nhân Viên</th>
                <th className="border px-4 py-2">Loại Khoản Thu</th>
              </tr>
            </thead>
            <tbody>
              {danhSachPhieuThu.map((phieu, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{phieu.maPhieuThu}</td>
                  <td className="border px-4 py-2 text-center">
                    {new Date(phieu.ngayLap).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {phieu.tongTien.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="border px-4 py-2 text-center">{phieu.trangThai}</td>
                  <td className="border px-4 py-2 text-center">{phieu.tenNhanVien}</td>
                  <td className="border px-4 py-2">
                    {phieu.loaiKhoanThu.join(", ")}
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

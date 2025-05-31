import React, { useEffect, useState } from "react";
import { checkInPhong } from "../services/api"; // Sửa đúng đường dẫn đến file API

export default function NhanPhong() {
  const [message, setMessage] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy maSV từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV;

  useEffect(() => {
    const fetchData = async () => {
      if (!maSV) {
        setMessage("Không tìm thấy mã sinh viên. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      try {
        const response = await checkInPhong({ MaSV: maSV });
        setMessage(response.message);
        setDetails(response.details || null);
      } catch (error) {
        setMessage("Có lỗi xảy ra khi nhận phòng.");
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maSV]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Nhận phòng</h2>

      {loading ? (
        <p>Đang tải thông tin...</p>
      ) : (
        <>
          {message && (
            <p className="mt-4 font-semibold text-blue-600">{message}</p>
          )}

          {details && (
            <div className="mt-6 p-4 border rounded shadow bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Thông tin phòng:</h3>
              <ul className="space-y-1">
                <li><strong>Mã phòng:</strong> {details.MaPhong}</li>
                <li><strong>Tên phòng:</strong> {details.TenPhong}</li>
                <li><strong>Tầng:</strong> {details.TenTang}</li>
                <li><strong>Loại phòng:</strong> {details.TenLoaiPhong}</li>
                <li><strong>Sức chứa:</strong> {details.SucChua}</li>
                <li><strong>Mã giường:</strong> {details.MaGiuong || "Chưa có giường"}</li>
                <li><strong>Thiết bị:</strong> {details.DanhSachThietBi?.join(", ") || "Không có thiết bị"}</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

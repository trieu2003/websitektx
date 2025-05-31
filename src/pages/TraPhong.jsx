import React, { useState } from "react";
import { traPhong } from "../services/api"; // Đảm bảo đúng đường dẫn

export default function TraPhong() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Lấy mã sinh viên từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV;

  const handleTraPhong = async () => {
    if (!maSV) {
      setMessage("Không tìm thấy mã sinh viên. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    try {
      const response = await traPhong({ MaSV: maSV });
      setMessage(response.message || "Trả phòng thành công.");
      setResult(response.details || null);
    } catch (error) {
      setMessage("Có lỗi xảy ra khi trả phòng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trả phòng</h2>

      <button
        onClick={handleTraPhong}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Đang xử lý..." : "Xác nhận trả phòng"}
      </button>

      {message && <p className="mt-4 font-semibold">{message}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Thông tin trả phòng:</h3>
          <ul className="space-y-1">
            <li><strong>Phòng đã trả:</strong> {result.TenPhong}</li>
            <li><strong>Giường:</strong> {result.MaGiuong || "Không xác định"}</li>
            <li><strong>Ngày trả:</strong> {result.NgayTra || "Không rõ"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

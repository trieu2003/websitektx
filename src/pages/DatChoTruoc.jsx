import React, { useState } from "react";
import axios from "axios";

export default function DatChoTruoc() {
  const [maSV, setMaSV] = useState("");
  const [maChiTietPhong, setMaChiTietPhong] = useState("");
  const [hanDat, setHanDat] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!maSV || !hanDat) {
      setMessage("Vui lòng nhập đầy đủ mã sinh viên và hạn đặt.");
      return;
    }

    try {
      const payload = {
        maSV: maSV,
        maChiTietPhong: maChiTietPhong || null,
        hanDat: hanDat,
      };

      const response = await axios.post(
        "https://yourdomain/api/DatChoTruoc/DatChoTruoc",
        payload
      );

      setMessage(response.data.message);
      setMaSV("");
      setMaChiTietPhong("");
      setHanDat("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Đặt chỗ trước</h2>
      <p className="mb-6">Chức năng đặt chỗ trước phòng nội trú.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Mã sinh viên *</label>
          <input
            type="text"
            value={maSV}
            onChange={(e) => setMaSV(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nhập mã sinh viên"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Mã chi tiết phòng (nếu có)
          </label>
          <input
            type="text"
            value={maChiTietPhong}
            onChange={(e) => setMaChiTietPhong(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="VD: CTP123"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hạn đặt *</label>
          <input
            type="date"
            value={hanDat}
            onChange={(e) => setHanDat(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Gửi yêu cầu đặt chỗ
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-red-600 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}

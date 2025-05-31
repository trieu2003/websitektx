import React, { useState } from "react";
import { giaHanHopDong } from "../services/api";

export default function GiaHanHopDong() {
  const [form, setForm] = useState({
    maSV: "",
    ngayKetThucMoi: "",
    maNamHoc: "",
    phuongThucThanhToan: "",
    dotDangKy: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await giaHanHopDong({
      ...form,
      ngayKetThucMoi: new Date(form.ngayKetThucMoi),
    });
    setMessage(response.message || "Đã gửi yêu cầu gia hạn.");
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-600">Gia hạn hợp đồng</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="maSV"
          value={form.maSV}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Mã sinh viên"
        />
        <input
          name="ngayKetThucMoi"
          type="date"
          value={form.ngayKetThucMoi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="maNamHoc"
          value={form.maNamHoc}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Mã năm học"
        />
        <input
          name="phuongThucThanhToan"
          value={form.phuongThucThanhToan}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Phương thức thanh toán"
        />
        <input
          name="dotDangKy"
          value={form.dotDangKy}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Đợt đăng ký"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Gửi yêu cầu gia hạn
        </button>
      </form>
      {message && <p className="mt-3 text-center text-purple-700">{message}</p>}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getAllTang, getPhongByTang, getGiuongTrongByChiTietPhong, dangKyGiuong } from "../services/api";
import GiuongTrong from "../components/GiuongTrong";

export default function DangKyNoiTru() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    maPhong: "",
    maGiuong: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

   const user = JSON.parse(localStorage.getItem("user"));
const maSV = user?.maSV; // hoặc user?.MaSV


    if (!maSV) {
      setMessage("Không tìm thấy mã sinh viên, vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    try {
      const response = await dangKyGiuong({
        MaSV: maSV,
        MaPhong: form.maPhong,
        MaGiuong: form.maGiuong,
      });

      if (response && response.message) {
        setMessage(response.message);
      } else {
        setMessage("Đăng ký thành công!");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setMessage("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form bên trái */}
      <div className="bg-white p-4 rounded shadow h-fit sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Đăng ký nội trú</h2>
        {message && <p className="mb-2 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Mã phòng:</label>
            <input
              type="text"
              name="maPhong"
              value={form.maPhong}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded"
              required
              placeholder="Nhập mã phòng"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Mã giường:</label>
            <input
              type="text"
              name="maGiuong"
              value={form.maGiuong}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded"
              required
              placeholder="Nhập mã giường"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>

      {/* Danh sách giường trống bên phải */}
      <div className="bg-white p-4 rounded shadow max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Danh sách giường trống</h3>
        <GiuongTrong />
      </div>
    </div>
  );
}

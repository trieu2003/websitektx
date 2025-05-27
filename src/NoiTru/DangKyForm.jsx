import React, { useState, useEffect } from "react";
import axios from "axios";
import ChonTang from "./ChonTang";
import ChonPhong from "./ChonPhong";
import ChonGiuong from "./ChonGiuong";
import { dangKyGiuong } from "../Service/api_KyTucXac"; // Đường dẫn đến file chứa axiosInstance



const DangKyForm = () => {
  const [maTang, setMaTang] = useState("");
  const [maPhong, setMaPhong] = useState("");
  const [maGiuong, setMaGiuong] = useState("");
  const [maSV, setMaSV] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Tự động load mã sinh viên từ localStorage khi component mount
  useEffect(() => {
    const thongTin = localStorage.getItem("thongTin");
    if (thongTin) {
      const parsed = JSON.parse(thongTin);
      setMaSV(parsed.maSV); // ✅ lưu ý: dùng đúng tên thuộc tính đã lưu từ API, ví dụ maSV hoặc maSinhVien
    }
  }, []);

 const handleSubmit = async () => {
  if (!maSV || !maGiuong) {
    setMessage("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  try {
    const today = new Date().toISOString();

    const payload = {
      maSV,
      maGiuong,
      ngayDangKy: today,
      ngayBatDau: today,
      ngayKetThuc: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
      dotDangKy: "Dot-1",
      trangThai: "Chờ duyệt",
      trangThaiDuyet: "Chưa duyệt",
      phuongThucThanhToan: "Chuyển khoản",
      minhChungThanhToan: "",
      maNamHoc: "2024-2025",
      nhomTruong: "",
      maNV: ""
    };

    const result = await dangKyGiuong(payload);
    setMessage(result.message || "Đăng ký thành công.");
  } catch (error) {
    console.error(error);
    setMessage(error || "Lỗi đăng ký.");
  }
};



  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Đăng ký nội trú</h2>
      <div>
        <label className="font-medium text-gray-700">Mã sinh viên:</label>
        <input
          value={maSV}
          onChange={(e) => setMaSV(e.target.value)}
          readOnly
          className="mt-1 p-2 border rounded w-full bg-gray-100 text-gray-600"
        />
      </div>
      <ChonTang onTangChange={setMaTang} />
      <ChonPhong maTang={maTang} onPhongChange={setMaPhong} />
      <ChonGiuong maPhong={maPhong} onGiuongChange={setMaGiuong} />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
      >
        Đăng ký
      </button>
      <p className="text-red-600 font-medium">{message}</p>
    </div>
  );
};

export default DangKyForm;

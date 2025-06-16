import React, { useEffect, useState } from "react";
import { getAllTang, getPhongByTang, getGiuongTrongByChiTietPhong, dangKyGiuong } from "../services/api";
import GiuongTrong from "../components/GiuongTrong";
import Modal from "../components/Modal";
import HopDongNoiTruPage from "./HopDongNoiTruPage";

export default function DangKyNoiTru() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    maPhong: "",
    maGiuong: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowClick = (maPhong, maGiuong) => {
    setForm({ maPhong, maGiuong });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const user = JSON.parse(localStorage.getItem("user"));
    const maSV = user?.maSV;

    if (!maSV) {
      setMessage("Không tìm thấy mã sinh viên, vui lòng đăng nhập lại.");
      setIsSuccess(false);
      setIsModalOpen(true);
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
        setIsSuccess(response.message.includes("thành công"));
      } else {
        setMessage("Đăng ký thành công!");
        setIsSuccess(true);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setMessage("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      setIsSuccess(false);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage("");
    if (isSuccess) {
      setForm({ maPhong: "", maGiuong: "" }); // Reset form on successful registration
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form bên trái */}
      <div className="bg-gray-200 p-4 rounded shadow h-fit sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Đăng ký nội trú</h2>
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
        <div className="mt-8">
          <HopDongNoiTruPage />
        </div>
      </div>

      {/* Danh sách giường trống bên phải */}
      <div className="bg-white p-4 rounded shadow max-h-[80vh] overflow-y-auto">
        {/* <h3 className="text-lg font-semibold mb-2">Danh sách giường trống</h3> */}
        <GiuongTrong onRowClick={handleRowClick} />
      </div>

      {/* Modal thông báo */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isSuccess ? "Đăng ký thành công" : "Lỗi đăng ký"}
        showConfirm={false}
      >
        <p className={isSuccess ? "text-green-600" : "text-red-500"}>{message}</p>
      </Modal>
    </div>
  );
}
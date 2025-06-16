import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DatChoTruoc() {
  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV || user?.MaSV || "";

  const [sdt, setSdt] = useState(user?.sdt || "");
  const [email, setEmail] = useState(user?.email || "");
  const [hanDat, setHanDat] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    const newDate = new Date(today.setMonth(today.getMonth() + selectedDuration));
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, "0");
    const dd = String(newDate.getDate()).padStart(2, "0");
    setHanDat(`${yyyy}-${mm}-${dd}`);
  }, [selectedDuration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!maSV || !sdt || !email || !hanDat) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        maSV,
        sdt,
        email,
        hanDat,
      };

      const response = await axios.post(
        "https://localhost:5181/api/DatChoTruoc/dat-cho", // đúng endpoint theo curl
        payload
      );

      setMessage(response.data.message || "Đặt chỗ thành công!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi khi gửi yêu cầu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-gray-200 mt-3 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Đặt chỗ trước</h2>
      <p className="mb-6">Chức năng đặt chỗ trước phòng nội trú.</p>

      {message && (
        <div className="mb-4 text-center font-semibold text-red-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Mã sinh viên</label>
          <input
            type="text"
            value={maSV}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Số điện thoại *</label>
          <input
            type="text"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Chọn hạn đặt *</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          >
            <option value={3}>3 tháng</option>
            <option value={6}>6 tháng</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ngày hết hạn đặt (tự động)</label>
          <input
            type="date"
            value={hanDat}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu đặt chỗ"}
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GuiYeuCauSuaChua() {
  const [maSV, setMaSV] = useState(""); // mã sinh viên
  const [moTaChung, setMoTaChung] = useState("");
  const [thietBiTrongPhong, setThietBiTrongPhong] = useState([]);
  const [chiTietSuaChua, setChiTietSuaChua] = useState([]);
  const [message, setMessage] = useState("");

  // Giả lập gọi API để lấy mã sinh viên đã đăng nhập
  useEffect(() => {
    const maSVFromStorage = localStorage.getItem("maSV");
    setMaSV(maSVFromStorage || "");
    // Tải danh sách thiết bị
    if (maSVFromStorage) {
      axios.get(`/api/sinhvien/thietbi/${maSVFromStorage}`).then((res) => {
        setThietBiTrongPhong(res.data || []);
      });
    }
  }, []);

  const handleAddThietBi = () => {
    setChiTietSuaChua([...chiTietSuaChua, { MaThietBi: "", MoTaLoi: "" }]);
  };

  const handleThayDoiChiTiet = (index, field, value) => {
    const updated = [...chiTietSuaChua];
    updated[index][field] = value;
    setChiTietSuaChua(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        MaSV: maSV,
        MoTa: moTaChung,
        ChiTietSuaChua: chiTietSuaChua,
      };
      const res = await axios.post("/api/repair/submit", payload);
      setMessage(res.data.message);
      setChiTietSuaChua([]);
      setMoTaChung("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Đã xảy ra lỗi.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Gửi yêu cầu sửa chữa</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Mô tả chung:</label>
          <textarea
            value={moTaChung}
            onChange={(e) => setMoTaChung(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="Ví dụ: Phòng có nhiều thiết bị hư..."
          />
        </div>

        <div>
          <label className="font-medium">Chi tiết thiết bị cần sửa:</label>
          {chiTietSuaChua.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mt-2">
              <select
                value={item.MaThietBi}
                onChange={(e) =>
                  handleThayDoiChiTiet(index, "MaThietBi", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">-- Chọn thiết bị --</option>
                {thietBiTrongPhong.map((tb) => (
                  <option key={tb.maThietBi} value={tb.maThietBi}>
                    {tb.tenThietBi}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Mô tả lỗi"
                value={item.MoTaLoi}
                onChange={(e) =>
                  handleThayDoiChiTiet(index, "MoTaLoi", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddThietBi}
            className="mt-2 px-4 py-1 bg-green-500 text-white rounded"
          >
            + Thêm thiết bị
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          Gửi yêu cầu sửa chữa
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

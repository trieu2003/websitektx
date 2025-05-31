import React, { useEffect, useState } from "react";
import {
  getAllTang,
  getPhongByTang,
  getGiuongTrongByChiTietPhong,
  dangKyGiuong,
} from "../services/api";

export default function DangKyNoiTru() {
  const [tangList, setTangList] = useState([]);
  const [phongList, setPhongList] = useState([]);
  const [chiTietPhongList, setChiTietPhongList] = useState([]);
  const [giuongTrongList, setGiuongTrongList] = useState([]);

  const [form, setForm] = useState({
    maSV: "",
    maTang: "",
    maPhong: "",
    maChiTietPhong: "",
    maGiuong: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy danh sách tầng khi component mount
  useEffect(() => {
    async function fetchTang() {
      try {
        const data = await getAllTang();
        setTangList(data || []);
      } catch (error) {
        console.error("Lỗi lấy tầng:", error);
        setMessage("Lỗi lấy danh sách tầng");
      }
    }
    fetchTang();
  }, []);

  // Lấy danh sách phòng khi chọn tầng
  useEffect(() => {
    if (!form.maTang) {
      // Reset các dropdown phía dưới khi tầng bị bỏ chọn
      setPhongList([]);
      setChiTietPhongList([]);
      setGiuongTrongList([]);
      setForm((f) => ({ ...f, maPhong: "", maChiTietPhong: "", maGiuong: "" }));
      return;
    }
    async function fetchPhong() {
      try {
        const data = await getPhongByTang(form.maTang);
        setPhongList(data || []);
      } catch (error) {
        console.error("Lỗi lấy phòng:", error);
        setMessage("Lỗi lấy danh sách phòng");
      }
    }
    fetchPhong();
  }, [form.maTang]);

  // Lấy chi tiết phòng khi chọn phòng
  useEffect(() => {
    if (!form.maPhong) {
      setChiTietPhongList([]);
      setGiuongTrongList([]);
      setForm((f) => ({ ...f, maChiTietPhong: "", maGiuong: "" }));
      return;
    }
    async function fetchChiTietPhong() {
      try {
        const res = await fetch(
          `https://localhost:5181/api/NoiQuy/chitietphong-by-phong/${form.maPhong}`
        );

        if (!res.ok) {
          const text = await res.text();
          setChiTietPhongList([]);
          setMessage(`Lỗi lấy chi tiết phòng: ${text}`);
          return;
        }

        const data = await res.json();
        setChiTietPhongList(data || []);
        setMessage("");
      } catch (error) {
        console.error("Lỗi lấy chi tiết phòng:", error);
        setMessage("Lỗi lấy chi tiết phòng, vui lòng thử lại sau.");
      }
    }
    fetchChiTietPhong();
  }, [form.maPhong]);

  // Lấy giường trống khi chọn chi tiết phòng
  useEffect(() => {
    if (!form.maChiTietPhong) {
      setGiuongTrongList([]);
      setForm((f) => ({ ...f, maGiuong: "" }));
      return;
    }
    async function fetchGiuongTrong() {
      try {
        const data = await getGiuongTrongByChiTietPhong(form.maChiTietPhong);
        setGiuongTrongList(data || []);
      } catch (error) {
        console.error("Lỗi lấy giường trống:", error);
        setMessage("Lỗi lấy giường trống, vui lòng thử lại sau.");
      }
    }
    fetchGiuongTrong();
  }, [form.maChiTietPhong]);

  // Xử lý khi thay đổi input/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  // Xử lý submit form đăng ký giường
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra form đầy đủ
    if (
      !form.maSV ||
      !form.maTang ||
      !form.maPhong ||
      !form.maChiTietPhong ||
      !form.maGiuong
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await dangKyGiuong({ maSV: form.maSV, maGiuong: form.maGiuong });
      if (res.success || res.status === 200) {
        setMessage("Đăng ký giường thành công!");
        // Reset form nếu muốn
        // setForm({ maSV: "", maTang: "", maPhong: "", maChiTietPhong: "", maGiuong: "" });
      } else {
        setMessage(res.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi hệ thống khi đăng ký giường:", error);
      setMessage("Lỗi hệ thống, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
        Đăng ký nội trú
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="maSV"
          >
            Mã sinh viên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="maSV"
            name="maSV"
            value={form.maSV}
            onChange={handleChange}
            placeholder="Nhập mã sinh viên"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete="off"
          />
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="maTang"
          >
            Chọn tầng <span className="text-red-500">*</span>
          </label>
          <select
            id="maTang"
            name="maTang"
            value={form.maTang}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Chọn tầng --</option>
            {tangList.map((tang) => (
              <option key={tang.maTang} value={tang.maTang}>
                {tang.tenTang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="maPhong"
          >
            Chọn phòng <span className="text-red-500">*</span>
          </label>
          <select
            id="maPhong"
            name="maPhong"
            value={form.maPhong}
            onChange={handleChange}
            disabled={!form.maTang}
            className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400 ${
              !form.maTang ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">-- Chọn phòng --</option>
            {phongList.map((phong) => (
              <option key={phong.maPhong} value={phong.maPhong}>
                {phong.tenPhong}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="maChiTietPhong"
          >
            Chọn chi tiết phòng <span className="text-red-500">*</span>
          </label>
          <select
            id="maChiTietPhong"
            name="maChiTietPhong"
            value={form.maChiTietPhong}
            onChange={handleChange}
            disabled={!form.maPhong}
            className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400 ${
              !form.maPhong ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">-- Chọn chi tiết phòng --</option>
            {chiTietPhongList.map((ctp) => (
              <option key={ctp.maChiTietPhong} value={ctp.maChiTietPhong}>
                {ctp.moTa}-{ctp.maChiTietPhong}- {ctp.tenPhong}-{ctp.maPhong}-{ctp.maThietBi}-{ctp.soGiuong}-{ctp.tenGiuong}-{ctp.tenThietBi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="maGiuong"
          >
            Chọn giường trống <span className="text-red-500">*</span>
          </label>
          <select
            id="maGiuong"
            name="maGiuong"
            value={form.maGiuong}
            onChange={handleChange}
            disabled={!form.maChiTietPhong}
            className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-400 ${
              !form.maChiTietPhong ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">-- Chọn giường trống --</option>
            {giuongTrongList.map((g) => (
              <option key={g.maGiuong} value={g.maGiuong}>
                {g.soGiuong}-{g.maChiTietPhong}-{g.maPhong}--{g.maThietBi}--{g.giuong.maGiuong}-{g.giuong.trangThai}-{g.moTa}-{g.tenThietBi}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-md transition-colors"
        >
          {loading ? "Đang gửi..." : "Đăng ký giường"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-6 text-center font-semibold ${
            message.includes("thành công") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

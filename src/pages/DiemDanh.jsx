import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const LOCAL_STORAGE_KEY = "diemdanh_boloc";

export default function DiemDanh() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maSV, setMaSV] = useState("");

  // Bộ lọc
  const [tuNgay, setTuNgay] = useState("");
  const [denNgay, setDenNgay] = useState("");
  const [trangThai, setTrangThai] = useState("");

  const columns = [
    { header: "Mã Điểm Danh", accessor: "maDiemDanh" },
    { header: "Mã Sinh Viên", accessor: "maSV" },
    {
      header: "Thời Gian",
      accessor: "thoiGian",
      cell: (row) =>
        row.thoiGian
          ? new Date(row.thoiGian).toLocaleString("vi-VN")
          : "Chưa cập nhật",
    },
    { header: "Trạng Thái", accessor: "trangThai" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);

    // Lấy bộ lọc từ localStorage
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (saved) {
      setTuNgay(saved.tuNgay || "");
      setDenNgay(saved.denNgay || "");
      setTrangThai(saved.trangThai || "");
    }
  }, []);

  useEffect(() => {
    if (!maSV) return;
    fetchData(); // Gọi API lần đầu khi có mã SV
  }, [maSV]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!maSV) return;
      fetchData();
      // Lưu bộ lọc vào localStorage
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ tuNgay, denNgay, trangThai })
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [tuNgay, denNgay, trangThai]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const body = {
        maSV,
        tuNgay: tuNgay ? new Date(tuNgay).toISOString() : null,
        denNgay: denNgay ? new Date(denNgay).toISOString() : null,
        trangThai: trangThai || null,
      };
      const res = await axios.post("https://localhost:5181/tim-kiem", body);
      setData(res.data);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm điểm danh:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setTuNgay("");
    setDenNgay("");
    setTrangThai("");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Danh sách điểm danh của sinh viên
      </h2>

      {/* Bộ lọc */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Từ ngày</label>
          <input
            type="date"
            value={tuNgay}
            onChange={(e) => setTuNgay(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Đến ngày</label>
          <input
            type="date"
            value={denNgay}
            onChange={(e) => setDenNgay(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Trạng thái</label>
          <select
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">-- Tất cả --</option>
            <option value="Có mặt">Có mặt</option>
            <option value="Vắng">Vắng</option>
          </select>
        </div>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tìm kiếm
        </button>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Xóa bộ lọc
        </button>
      </div>

      {/* Bảng dữ liệu */}
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
}

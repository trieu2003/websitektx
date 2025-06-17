import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

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
  }, []);

  useEffect(() => {
    if (!maSV) return;
    fetchData(); // tự fetch khi có maSV ban đầu
  }, [maSV]);

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
      </div>

      {/* Bảng dữ liệu */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
}

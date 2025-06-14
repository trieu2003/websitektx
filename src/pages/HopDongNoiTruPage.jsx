import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table"; // Đường dẫn đúng đến Table.jsx

const HopDongNoiTruPage = () => {
  const [hopDongList, setHopDongList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const maSV = user?.maSV;
    if (!maSV) {
      setError("Chưa đăng nhập hoặc không có mã sinh viên!");
      setLoading(false);
      return;
    }

    axios
      .get(`https://localhost:5181/api/HopDongNoiTru/GetAllByMaSV/${maSV}`)
      .then((response) => {
        setHopDongList(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(data.message || "Lấy dữ liệu thất bại");
        setLoading(false);
      });
  }, []);

  const columns = [
    { header: "Mã Hợp Đồng", accessor: "maHopDong" },
    { header: "Mã SV", accessor: "maSV" },
    { header: "Mã Giường", accessor: "maGiuong" },
    { header: "Mã Phòng", accessor: "maPhong" },
    {
      header: "Ngày Đăng Ký",
      accessor: "ngayDangKy",
      cell: (row) =>
        row.ngayDangKy ? new Date(row.ngayDangKy).toLocaleDateString() : "",
    },
    {
      header: "Ngày Bắt Đầu",
      accessor: "ngayBatDau",
      cell: (row) =>
        row.ngayBatDau ? new Date(row.ngayBatDau).toLocaleDateString() : "",
    },
    {
      header: "Ngày Kết Thúc",
      accessor: "ngayKetThuc",
      cell: (row) =>
        row.ngayKetThuc ? new Date(row.ngayKetThuc).toLocaleDateString() : "",
    },
    { header: "Đợt Đăng Ký", accessor: "dotDangKy" },
    {
      header: "Nhóm Trưởng",
      accessor: "nhomTruong",
      cell: (row) => row.nhomTruong?.trim() || "",
    },
    { header: "Trạng Thái", accessor: "trangThai" },
    { header: "Trạng Thái Duyệt", accessor: "trangThaiDuyet" },
    { header: "Phương Thức Thanh Toán", accessor: "phuongThucThanhToan" },
    { header: "Minh Chứng Thanh Toán", accessor: "minhChungThanhToan" },
    {
      header: "Mã Năm Học",
      accessor: "maNamHoc",
      cell: (row) => row.maNamHoc?.trim() || "",
    },
  ];

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-full px-5 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Danh sách hợp đồng nội trú của sinh viên
      </h2>
      <Table columns={columns} data={hopDongList} />
    </div>
  );
};

export default HopDongNoiTruPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

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
        setError("Lấy dữ liệu thất bại");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Danh sách hợp đồng nội trú của sinh viên</h2>
      <HopDongNoiTruTable hopDongList={hopDongList} />
    </div>
  );
};

const HopDongNoiTruTable = ({ hopDongList }) => {
  if (!hopDongList || hopDongList.length === 0) {
    return <p className="text-center text-gray-600">Không có hợp đồng nội trú nào.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            {[
              "Mã Hợp Đồng",
              "Mã SV",
              "Mã Giường",
              "Mã Phòng",
              "Ngày Đăng Ký",
              "Ngày Bắt Đầu",
              "Ngày Kết Thúc",
              "Đợt Đăng Ký",
              "Nhóm Trưởng",
              "Trạng Thái",
              "Trạng Thái Duyệt",
              "Phương Thức Thanh Toán",
              "Minh Chứng Thanh Toán",
              "Mã Năm Học",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hopDongList.map((hd) => (
            <tr
              key={hd.maHopDong}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.maHopDong}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.maSV}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.maGiuong}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.maPhong}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.ngayDangKy ? new Date(hd.ngayDangKy).toLocaleDateString() : ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.ngayBatDau ? new Date(hd.ngayBatDau).toLocaleDateString() : ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.ngayKetThuc ? new Date(hd.ngayKetThuc).toLocaleDateString() : ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.dotDangKy || ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.nhomTruong ? hd.nhomTruong.trim() : ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.trangThai || ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.trangThaiDuyet || ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.phuongThucThanhToan || ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.minhChungThanhToan || ""}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{hd.maNamHoc ? hd.maNamHoc.trim() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HopDongNoiTruPage;

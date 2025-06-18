import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HoaDon() {
  const [maSV, setMaSV] = useState("");
  const [hoaDonData, setHoaDonData] = useState([]);
  const [dienNuocList, setDienNuocList] = useState([]);

  // --- Bộ lọc hóa đơn ---
  const [hoTen, setHoTen] = useState("");
  const [ngayTu, setNgayTu] = useState("");
  const [ngayDen, setNgayDen] = useState("");
  const [loaiKhoanThu, setLoaiKhoanThu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  const loaiKhoanThuOptions = ["Tiền Điện", "Tiền Nước", "Hợp Đồng Nội Trú"];

  // --- Bộ lọc điện nước ---
  const [dnTuNgay, setDnTuNgay] = useState("");
  const [dnDenNgay, setDnDenNgay] = useState("");
  const [filteredDienNuoc, setFilteredDienNuoc] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
    if (ma) {
      fetchDienNuoc(ma);
    }
  }, []);

  useEffect(() => {
    if (maSV) fetchHoaDon();
  }, [maSV, currentPage]);

  const fetchHoaDon = async () => {
    try {
      const res = await axios.post("https://localhost:5181/api/PhieuThu/phieuthu/loc-nang-cao", {
        MaSV: maSV,
        TenSinhVien: hoTen.trim() || null,
        NgayLapTu: ngayTu || null,
        NgayLapDen: ngayDen || null,
        LoaiKhoanThu: loaiKhoanThu.length > 0 ? loaiKhoanThu : null,
        Page: currentPage,
        PageSize: pageSize,
      });

      setHoaDonData(res.data.data || []);
      setTotalRecords(res.data.totalRecords || 0);
    } catch (error) {
      console.error("Lỗi khi tải hóa đơn:", error);
    }
  };

  const fetchDienNuoc = async (ma) => {
    try {
      const res = await axios.get(`https://localhost:5181/api/DienNuoc/sinhvien/${ma}/dien-nuoc`);
      setDienNuocList(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu điện nước:", error);
      setDienNuocList([]);
    }
  };

  const handleSearchHoaDon = () => {
    setCurrentPage(1);
    fetchHoaDon();
  };

  const handleClearHoaDon = () => {
    setHoTen("");
    setNgayTu("");
    setNgayDen("");
    setLoaiKhoanThu([]);
    setCurrentPage(1);
    fetchHoaDon();
  };

  const handleSearchDienNuoc = () => {
    if (!dnTuNgay && !dnDenNgay) {
      setFilteredDienNuoc(dienNuocList);
      return;
    }
    const tu = dnTuNgay ? new Date(dnTuNgay) : null;
    const den = dnDenNgay ? new Date(dnDenNgay) : null;
    const filtered = dienNuocList.filter((dn) => {
      const ngayBD = new Date(dn.ngayBatDau);
      const ngayKT = new Date(dn.ngayKetThuc);
      return (!tu || ngayKT >= tu) && (!den || ngayBD <= den);
    });
    setFilteredDienNuoc(filtered);
  };

  const handleClearDienNuoc = () => {
    setDnTuNgay("");
    setDnDenNgay("");
    setFilteredDienNuoc(dienNuocList);
  };

  useEffect(() => {
    setFilteredDienNuoc(dienNuocList); // reset khi fetch xong
  }, [dienNuocList]);

  return (
    <div className="p-6 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Hóa đơn & Điện nước</h2>

      {/* Layout chia 2 bên */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ===== CỘT HÓA ĐƠN ===== */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Hóa đơn</h3>

          {/* Bộ lọc hóa đơn */}
          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Họ tên sinh viên"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={ngayTu}
                onChange={(e) => setNgayTu(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="date"
                value={ngayDen}
                onChange={(e) => setNgayDen(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {loaiKhoanThuOptions.map((option) => (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={option}
                    checked={loaiKhoanThu.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setLoaiKhoanThu([...loaiKhoanThu, option]);
                      } else {
                        setLoaiKhoanThu(loaiKhoanThu.filter((item) => item !== option));
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <button onClick={handleSearchHoaDon} className="bg-blue-600 text-white px-3 py-1 rounded">
                Tìm kiếm
              </button>
              <button onClick={handleClearHoaDon} className="text-blue-600 text-sm underline">
                Xóa lọc
              </button>
            </div>
          </div>

          {/* Bảng hóa đơn */}
          <div className="overflow-x-auto border rounded shadow">
            <table className="min-w-full text-sm divide-y">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Mã phiếu</th>
                  <th className="px-3 py-2 text-left">Họ tên</th>
                  <th className="px-3 py-2 text-left">Ngày lập</th>
                  <th className="px-3 py-2 text-left">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {hoaDonData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center px-3 py-4 text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  hoaDonData.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-3 py-2">{item.maPhieuThu}</td>
                      <td className="px-3 py-2">{item.hoTen}</td>
                      <td className="px-3 py-2">{new Date(item.ngayLap).toLocaleDateString("vi-VN")}</td>
                      <td className="px-3 py-2">
                        {item.tongTien.toLocaleString("vi-VN")} ₫
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang trước
            </button>
            <span>
              Trang {currentPage} / {Math.ceil(totalRecords / pageSize) || 1}
            </span>
            <button
              disabled={currentPage >= Math.ceil(totalRecords / pageSize)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </div>

        {/* ===== CỘT ĐIỆN NƯỚC ===== */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Điện nước</h3>

          {/* Bộ lọc điện nước */}
          <div className="space-y-3 mb-4">
            <div className="flex gap-2">
              <input
                type="date"
                value={dnTuNgay}
                onChange={(e) => setDnTuNgay(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="date"
                value={dnDenNgay}
                onChange={(e) => setDnDenNgay(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={handleSearchDienNuoc} className="bg-green-600 text-white px-3 py-1 rounded">
                Tìm kiếm
              </button>
              <button onClick={handleClearDienNuoc} className="text-green-600 text-sm underline">
                Xóa lọc
              </button>
            </div>
          </div>

          {/* Bảng điện nước */}
          <div className="overflow-x-auto border rounded shadow text-sm">
            <table className="min-w-full divide-y">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Mã</th>
                  <th className="px-3 py-2 text-left">Từ ngày</th>
                  <th className="px-3 py-2 text-left">Đến ngày</th>
                  <th className="px-3 py-2 text-left">Điện</th>
                  <th className="px-3 py-2 text-left">Nước</th>
                </tr>
              </thead>
              <tbody>
                {filteredDienNuoc.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center px-3 py-4 text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  filteredDienNuoc.map((dn) => (
                    <tr key={dn.maDN} className="border-b">
                      <td className="px-3 py-2">{dn.maDN}</td>
                      <td className="px-3 py-2">{new Date(dn.ngayBatDau).toLocaleDateString("vi-VN")}</td>
                      <td className="px-3 py-2">{new Date(dn.ngayKetThuc).toLocaleDateString("vi-VN")}</td>
                      <td className="px-3 py-2">
                        {dn.soDienCu} → {dn.soDienMoi}
                      </td>
                      <td className="px-3 py-2">
                        {dn.soNuocCu} → {dn.soNuocMoi}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

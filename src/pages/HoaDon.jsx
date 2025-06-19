import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function HoaDon() {
  const [maSV, setMaSV] = useState("");
  const [hoaDonData, setHoaDonData] = useState([]);
  const [filteredHoaDon, setFilteredHoaDon] = useState([]);
  const [loadingHoaDon, setLoadingHoaDon] = useState(false);
  const [isNhomTruong, setIsNhomTruong] = useState(false);

  // Lọc nâng cao
  const [hoTen, setHoTen] = useState("");
  const [hopDongNoiTru, setHopDongNoiTru] = useState(false);
  const [tienDien, setTienDien] = useState(false);
  const [tienNuoc, setTienNuoc] = useState(false);
  const [ngayLapTu, setNgayLapTu] = useState("");
  const [ngayLapDen, setNgayLapDen] = useState("");

  // Điện nước
  const [dienNuocList, setDienNuocList] = useState([]);
  const [filteredDienNuoc, setFilteredDienNuoc] = useState([]);
  const [loadingDienNuoc, setLoadingDienNuoc] = useState(false);
  const [dnTuNgay, setDnTuNgay] = useState("");
  const [dnDenNgay, setDnDenNgay] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
    if (ma) {
      checkNhomTruong(ma);
      fetchHoaDon(ma);
      fetchDienNuoc(ma);
    }
  }, []);

  const checkNhomTruong = async (ma) => {
    try {
      const res = await axios.post("https://localhost:5181/api/PhieuThu/xem-hoa-don", { MaSV: ma });
      const danhSach = res.data || [];
      const isTruong = danhSach.some(p => p.hoTen !== undefined && p.maSV !== ma);
      setIsNhomTruong(isTruong);
    } catch (err) {
      setIsNhomTruong(false);
    }
  }

  const fetchHoaDon = async (ma) => {
    setLoadingHoaDon(true);
    try {
      const res = await axios.post("https://localhost:5181/api/PhieuThu/xem-hoa-don", { MaSV: ma });
      setHoaDonData(res.data || []);
      setFilteredHoaDon(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể lấy danh sách hóa đơn.");
      setHoaDonData([]);
      setFilteredHoaDon([]);
    } finally {
      setLoadingHoaDon(false);
    }
  };

  const fetchDienNuoc = async (ma) => {
    setLoadingDienNuoc(true);
    try {
      const res = await axios.get(`https://localhost:5181/api/DienNuoc/sinhvien/${ma}/dien-nuoc`);
      setDienNuocList(res.data || []);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu điện nước!");
      setDienNuocList([]);
    } finally {
      setLoadingDienNuoc(false);
    }
  };

  const handleSearchHoaDon = () => {
    let filtered = hoaDonData;

    // Filter by hoTen
    if (hoTen && isNhomTruong) {
      filtered = filtered.filter(item => 
        item.hoTen?.toLowerCase().includes(hoTen.toLowerCase())
      );
    }

    // Filter by loaiKhoanThu
    if (hopDongNoiTru || tienDien || tienNuoc) {
      filtered = filtered.filter(item => {
        const khoanThu = item.loaiKhoanThu || [];
        return (!hopDongNoiTru || khoanThu.includes("Hợp Đồng Nội Trú")) &&
               (!tienDien || khoanThu.includes("Tiền Điện")) &&
               (!tienNuoc || khoanThu.includes("Tiền Nước"));
      });
    }

    // Filter by date range
    if (ngayLapTu || ngayLapDen) {
      const tu = ngayLapTu ? new Date(ngayLapTu) : null;
      const den = ngayLapDen ? new Date(ngayLapDen) : null;
      filtered = filtered.filter(item => {
        const ngayLap = new Date(item.ngayLap);
        return (!tu || ngayLap >= tu) && (!den || ngayLap <= den);
      });
    }

    setFilteredHoaDon(filtered);
  };

  const handleClearHoaDon = () => {
    setHoTen("");
    setHopDongNoiTru(false);
    setTienDien(false);
    setTienNuoc(false);
    setNgayLapTu("");
    setNgayLapDen("");
    setFilteredHoaDon(hoaDonData);
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
    setFilteredDienNuoc(dienNuocList);
  }, [dienNuocList]);

  useEffect(() => {
    handleSearchHoaDon();
  }, [hoTen, hopDongNoiTru, tienDien, tienNuoc, ngayLapTu, ngayLapDen, hoaDonData]);

  return (
    <div className="p-6 max-w-full mx-auto relative">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Hóa đơn & Điện nước</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* === CỘT HÓA ĐƠN === */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Hóa đơn</h3>

          {/* Bộ lọc nâng cao */}
          <div className="space-y-3 mb-4">
            {isNhomTruong && (
              <input
                type="text"
                placeholder="Tìm theo tên sinh viên"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            )}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hopDongNoiTru}
                  onChange={(e) => setHopDongNoiTru(e.target.checked)}
                  className="form-checkbox"
                />
                Hợp Đồng Nội Trú
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tienDien}
                  onChange={(e) => setTienDien(e.target.checked)}
                  className="form-checkbox"
                />
                Tiền Điện
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={tienNuoc}
                  onChange={(e) => setTienNuoc(e.target.checked)}
                  className="form-checkbox"
                />
                Tiền Nước
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={ngayLapTu}
                onChange={(e) => setNgayLapTu(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="date"
                value={ngayLapDen}
                onChange={(e) => setNgayLapDen(e.target.value)}
                className="w-1/2 border rounded px-2 py-1"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSearchHoaDon}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Tìm kiếm
              </button>
              <button
                onClick={handleClearHoaDon}
                className="text-blue-600 text-sm underline"
              >
                Xóa lọc
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border rounded shadow text-sm">
            {loadingHoaDon ? (
              <div className="text-center p-4 text-gray-500">⏳ Đang tải hóa đơn...</div>
            ) : (
              <table className="min-w-full divide-y">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Mã phiếu</th>
                    <th className="px-3 py-2 text-left">Họ tên</th>
                    <th className="px-3 py-2 text-left">Ngày lập</th>
                    <th className="px-3 py-2 text-left">Tổng tiền</th>
                    <th className="px-3 py-2 text-left">Trạng thái</th>
                    <th className="px-3 py-2 text-left">Nhân viên</th>
                    <th className="px-3 py-2 text-left">Khoản thu</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHoaDon.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center px-3 py-4 text-gray-500">
                        Không có hóa đơn phù hợp.
                      </td>
                    </tr>
                  ) : (
                    filteredHoaDon.map((item) => (
                      <tr key={item.maPhieuThu} className="border-b">
                        <td className="px-3 py-2">{item.maPhieuThu}</td>
                        <td className="px-3 py-2">{item.hoTen}</td>
                        <td className="px-3 py-2">{new Date(item.ngayLap).toLocaleDateString("vi-VN")}</td>
                        <td className="px-3 py-2">{item.tongTien.toLocaleString("vi-VN")} ₫</td>
                        <td className="px-3 py-2">{item.trangThai}</td>
                        <td className="px-3 py-2">{item.tenNhanVien || "—"}</td>
                        <td className="px-3 py-2">{item.loaiKhoanThu.join(", ")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* === CỘT ĐIỆN NƯỚC === */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Điện nước</h3>

          <div className="space-y-3 mb-4">
            <div className="flex gap-2">
              <input type="date" value={dnTuNgay} onChange={(e) => setDnTuNgay(e.target.value)} className="w-1/2 border rounded px-2 py-1" />
              <input type="date" value={dnDenNgay} onChange={(e) => setDnDenNgay(e.target.value)} className="w-1/2 border rounded px-2 py-1" />
            </div>
            <div className="flex justify-between">
              <button onClick={handleSearchDienNuoc} className="bg-green-600 text-white px-3 py-1 rounded">Tìm kiếm</button>
              <button onClick={handleClearDienNuoc} className="text-green-600 text-sm underline">Xóa lọc</button>
            </div>
          </div>

          <div className="overflow-x-auto border rounded shadow text-sm">
            {loadingDienNuoc ? (
              <div className="text-center p-4 text-gray-500">⏳ Đang tải dữ liệu điện nước...</div>
            ) : (
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
                      <td colSpan={5} className="text-center px-3 py-4 text-gray-500">Không có dữ liệu</td>
                    </tr>
                  ) : (
                    filteredDienNuoc.map((dn) => (
                      <tr key={dn.maDN} className="border-b">
                        <td className="px-3 py-2">{dn.maDN}</td>
                        <td className="px-3 py-2">{new Date(dn.ngayBatDau).toLocaleDateString("vi-VN")}</td>
                        <td className="px-3 py-2">{new Date(dn.ngayKetThuc).toLocaleDateString("vi-VN")}</td>
                        <td className="px-3 py-2">{dn.soDienCu} → {dn.soDienMoi}</td>
                        <td className="px-3 py-2">{dn.soNuocCu} → {dn.soNuocMoi}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
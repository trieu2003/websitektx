import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DanhSachViPham() {
  const [maSV, setMaSV] = useState("");
  const [dsViPham, setDsViPham] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tuKhoa, setTuKhoa] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedViPhamId, setSelectedViPhamId] = useState(null);
  const [viPhamDetail, setViPhamDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);
    if (ma) {
      fetchViPham(ma);
    }
  }, []);

  const fetchViPham = async (ma) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://localhost:5181/api/ViPham/sinhvien/${ma}/ds-chi-tiet-vi-pham`);
      setDsViPham(res.data || []);
      setFilteredList(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể tải danh sách vi phạm.");
    } finally {
      setLoading(false);
    }
  };

  const fetchViPhamDetail = async (maViPham) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`https://localhost:5181/api/ViPham/chi-tiet/${maViPham}`);
      setViPhamDetail(res.data);
    } catch (err) {
      toast.error("Không thể tải chi tiết vi phạm.");
      setViPhamDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDownloadBienBan = async (maViPham) => {
    setDownloading(true);
    try {
      const response = await axios.get(`https://localhost:5181/api/ViPham/bien-ban/${maViPham}`, {
        responseType: 'blob', // Important for file downloads
      });
      
      // Create a URL for the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BienBan_ViPham_${maViPham}.pdf`); // Assuming PDF format
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("Tải biên bản thành công!");
    } catch (err) {
      toast.error("Không thể tải biên bản.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSearch = () => {
    const keyword = tuKhoa.toLowerCase();
    const filtered = dsViPham.filter(
      (item) =>
        (item.hinhThucXuLy && item.hinhThucXuLy.toLowerCase().includes(keyword)) ||
        (item.mucDoXuLy && item.mucDoXuLy.toLowerCase().includes(keyword)) ||
        (item.ghiChu && item.ghiChu.toLowerCase().includes(keyword))
    );
    setFilteredList(filtered);
    setSelectedViPhamId(null); // Reset selected violation when filtering
    setViPhamDetail(null);
  };

  const handleClear = () => {
    setTuKhoa("");
    setFilteredList(dsViPham);
    setSelectedViPhamId(null);
    setViPhamDetail(null);
  };

  const handleToggleDetail = (maViPham) => {
    if (selectedViPhamId === maViPham) {
      setSelectedViPhamId(null);
      setViPhamDetail(null);
    } else {
      setSelectedViPhamId(maViPham);
      fetchViPhamDetail(maViPham);
    }
  };

  const columns = [
    { header: 'Mã vi phạm', accessor: 'maViPham' },
    { header: 'Hình thức xử lý', accessor: 'hinhThucXuLy', cell: (row) => row.hinhThucXuLy || "—" },
    { header: 'Mức độ', accessor: 'mucDoXuLy', cell: (row) => row.mucDoXuLy || "—" },
    { header: 'Ghi chú', accessor: 'ghiChu', cell: (row) => row.ghiChu || "—" },
    { header: 'Mã nhân viên', accessor: 'maNV', cell: (row) => row.maNV || "—" }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-red-700">Danh sách vi phạm</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <input
          type="text"
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
          placeholder="Tìm theo hình thức xử lý, mức độ hoặc ghi chú..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button onClick={handleSearch} className="bg-red-600 text-white px-4 py-2 rounded">Tìm kiếm</button>
        <button onClick={handleClear} className="text-red-600 underline">Xóa lọc</button>
      </div>

      {loading ? (
        <div className="text-center p-4 text-gray-500">⏳ Đang tải dữ liệu...</div>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-600 text-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredList.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    Không có vi phạm nào.
                  </td>
                </tr>
              ) : (
                filteredList.map((row) => (
                  <React.Fragment key={row.maViPham}>
                    <tr
                      onClick={() => handleToggleDetail(row.maViPham)}
                      className={`cursor-pointer transition ${selectedViPhamId === row.maViPham ? 'bg-red-100' : 'hover:bg-red-50'}`}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.accessor}
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                        >
                          {typeof col.cell === 'function' ? col.cell(row) : row[col.accessor]}
                        </td>
                      ))}
                    </tr>
                    {selectedViPhamId === row.maViPham && (
                      <tr>
                        <td colSpan={columns.length} className="px-4 py-2 bg-gray-100">
                          {loadingDetail ? (
                            <p className="text-gray-500">Đang tải chi tiết...</p>
                          ) : viPhamDetail ? (
                            <div className="p-4 border border-gray-300 rounded">
                              <h3 className="text-lg font-bold mb-2 text-red-600">Chi tiết vi phạm</h3>
                              <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
                                <li><strong>Mã vi phạm:</strong> {viPhamDetail.maViPham}</li>
                                <li><strong>Mã sinh viên:</strong> {viPhamDetail.maSV}</li>
                                <li><strong>Hình thức xử lý:</strong> {viPhamDetail.hinhThucXuLy || "—"}</li>
                                <li><strong>Mức độ xử lý:</strong> {viPhamDetail.mucDoXuLy || "—"}</li>
                                <li><strong>Ghi chú:</strong> {viPhamDetail.ghiChu || "—"}</li>
                                <li><strong>Mã nhân viên:</strong> {viPhamDetail.maNV || "—"}</li>
                              </ul>
                              <button
                                onClick={() => handleDownloadBienBan(viPhamDetail.maViPham)}
                                disabled={downloading}
                                className={`px-4 py-2 rounded text-white ${downloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                              >
                                {downloading ? 'Đang tải...' : 'Tải Biên Bản'}
                              </button>
                            </div>
                          ) : (
                            <p className="text-gray-500">Không có dữ liệu chi tiết.</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
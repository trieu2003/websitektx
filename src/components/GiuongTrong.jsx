import React, { useEffect, useState } from 'react';
import Table from '../components/Table';

const LOCAL_STORAGE_KEY = "giuong_boloc";

const GiuongTrong = ({ onRowClick }) => {
  const [giuongs, setGiuongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bộ lọc
  const [tenLoai, setTenLoai] = useState('');
  const [tenTang, setTenTang] = useState('');
  const [maPhong, setMaPhong] = useState('');

  const fetchData = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (tenLoai) params.append('tenLoai', tenLoai);
    if (tenTang) params.append('tenTang', tenTang);
    if (maPhong) params.append('maPhong', maPhong);

    fetch(`https://localhost:5181/api/Giuong/advanced-search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setGiuongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải giường trống:', err);
        setLoading(false);
      });
  };

  // Lấy bộ lọc đã lưu khi vào trang
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (saved) {
      setTenLoai(saved.tenLoai || '');
      setTenTang(saved.tenTang || '');
      setMaPhong(saved.maPhong || '');
    }
  }, []);

  // Gọi API lần đầu
  useEffect(() => {
    fetchData();
  }, []);

  // Gọi API lại khi bộ lọc thay đổi (debounced 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tenLoai, tenTang, maPhong }));
    }, 300);
    return () => clearTimeout(timer);
  }, [tenLoai, tenTang, maPhong]);

  const handleClearFilters = () => {
    setTenLoai('');
    setTenTang('');
    setMaPhong('');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const columns = [
    { header: 'Mã Giường', accessor: 'maGiuong' },
    {
      header: 'Phòng',
      accessor: 'maPhong',
      cell: (row) => `${row.tenPhong} (${row.maPhong})`
    },
    { header: 'Loại Phòng', accessor: 'tenLoai' },
    { header: 'Tầng', accessor: 'tenTang' },
    {
      header: 'Trạng Thái',
      accessor: 'trangThai',
      cell: (row) => <span className="text-green-500 font-medium">{row.trangThai}</span>,
    },
    {
      header: 'Thiết Bị',
      accessor: 'danhSachThietBi',
      cell: (row) =>
        row.danhSachThietBi?.length > 0 ? (
          <ul className="list-disc list-inside">
            {row.danhSachThietBi.map((tb, i) => (
              <li key={i}>{tb}</li>
            ))}
          </ul>
        ) : (
          <em>Không có</em>
        ),
    },
  ];

  return (
    <div className="bg-gray-100 p-4 max-w-5xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Danh sách giường trống</h1>

      {/* Bộ lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Loại phòng</label>
          <select
            value={tenLoai}
            onChange={(e) => setTenLoai(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Tất cả --</option>
            <option value="Phòng thường">Phòng thường</option>
            <option value="Phòng VIP">Phòng VIP</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tầng</label>
          <select
            value={tenTang}
            onChange={(e) => setTenTang(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Tất cả --</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 1} value={`Tầng ${i + 1}`}>Tầng {i + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Mã phòng</label>
          <input
            type="text"
            value={maPhong}
            onChange={(e) => setMaPhong(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nhập mã phòng..."
          />
        </div>
      </div>

      {/* Nút xóa bộ lọc */}
      <div className="mb-4 text-right">
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Xóa bộ lọc
        </button>
      </div>

      {/* Bảng dữ liệu */}
      {loading ? (
        <p className="text-gray-500">Đang tải danh sách giường...</p>
      ) : (
        <Table columns={columns} data={giuongs} onRowClick={onRowClick} />
      )}
    </div>
  );
};

export default GiuongTrong;

import React, { useEffect, useState } from 'react';
import Table from '../components/Table'; // chỉnh đường dẫn nếu cần

const GiuongTrong = ({ onRowClick }) => {
  const [giuongs, setGiuongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:5181/api/Giuong/available')
      .then((res) => res.json())
      .then((data) => {
        setGiuongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải giường trống:', err);
        setLoading(false);
      });
  }, []);

  const columns = [
    { header: 'Mã Giường', accessor: 'maGiuong' },
    { header: 'Phòng', accessor: 'maPhong', cell: (row) => `${row.tenPhong} (${row.maPhong})` },
    { header: 'Loại Phòng', accessor: 'tenLoai' },
    { header: 'Tầng', accessor: 'tenTang' },
    { header: 'Trạng Thái', accessor: 'trangThai', cell: (row) => <span className="text-green-300 font-medium">{row.trangThai}</span> },
    {
      header: 'Thiết Bị',
      accessor: 'danhSachThietBi',
      cell: (row) =>
        row.danhSachThietBi.length > 0 ? (
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

  if (loading) return <p className="text-gray-500">Đang tải danh sách giường...</p>;

  return (
    <div className="p-1 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Danh sách giường trống</h1>
      <Table columns={columns} data={giuongs} onRowClick={onRowClick} />
    </div>
  );
};

export default GiuongTrong;

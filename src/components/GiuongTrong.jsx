import React, { useEffect, useState } from 'react';

const GiuongTrong = ({ onRowClick }) => {
  const [giuongs, setGiuongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:5181/api/Giuong/available') // chỉnh lại nếu port khác
      .then((res) => res.json())
      .then((data) => {
        setGiuongs(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi tải giường trống:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải danh sách giường...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách giường trống</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Mã Giường</th>
            <th className="border px-3 py-2">Phòng</th>
            <th className="border px-3 py-2">Loại Phòng</th>
            <th className="border px-3 py-2">Tầng</th>
            <th className="border px-3 py-2">Trạng Thái</th>
            <th className="border px-3 py-2">Thiết Bị</th>
          </tr>
        </thead>
        <tbody>
          {giuongs.map((g, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(g.maPhong, g.maGiuong)}
            >
              <td className="border px-3 py-2">{g.maGiuong}</td>
              <td className="border px-3 py-2">{g.tenPhong} ({g.maPhong})</td>
              <td className="border px-3 py-2">{g.tenLoai}</td>
              <td className="border px-3 py-2">{g.tenTang}</td>
              <td className="border px-3 py-2 text-green-600 font-medium">{g.trangThai}</td>
              <td className="border px-3 py-2">
                {g.danhSachThietBi.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {g.danhSachThietBi.map((tb, i) => (
                      <li key={i}>{tb}</li>
                    ))}
                  </ul>
                ) : (
                  <em>Không có</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiuongTrong;
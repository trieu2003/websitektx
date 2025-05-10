import React from 'react';

const HopDongNoiTru = () => {
  const hopDongData = [
    {
      maHD: 'HD20240101',
      maSV: 'SV2023001',
      tenSV: 'Nguyễn Văn B',
      maPhong: 'P701',
      tenPhong: 'Phòng 701',
      loaiPhong: 'Phòng 500k/tháng',
      ngayBD: '2025-01-01',
      ngayKT: '2025-12-31',
      trangThai: 'Còn hiệu lực',
      maNV: 'NV002',
      tenNV: 'Nguyễn Văn A',
      giaDien: 3000,
      giaNuoc: 15000
    },
    {
      maHD: 'HD20240102',
      maSV: 'SV2023002',
      tenSV: 'Trần Thị C',
      maPhong: 'P702',
      tenPhong: 'Phòng 702',
      loaiPhong: 'Phòng 1tr5/tháng (Free điện nước)',
      ngayBD: '2025-01-01',
      ngayKT: '2025-12-31',
      trangThai: 'Còn hiệu lực',
      maNV: 'NV002',
      tenNV: 'Nguyễn Văn A',
      giaDien: 0,
      giaNuoc: 0
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách Hợp đồng nội trú</h2>
      <table className="table-auto w-full border text-sm">
        <thead className="bg-green-100 text-center">
          <tr>
            <th className="border p-2">Mã HĐ</th>
            <th className="border p-2">Mã SV</th>
            <th className="border p-2">Tên SV</th>
            <th className="border p-2">Mã Phòng</th>
            <th className="border p-2">Tên Phòng</th>
            <th className="border p-2">Loại Phòng</th>
            <th className="border p-2">Ngày BĐ</th>
            <th className="border p-2">Ngày KT</th>
            <th className="border p-2">Trạng Thái</th>
            <th className="border p-2">Mã NV</th>
            <th className="border p-2">Tên NV</th>
            <th className="border p-2">Giá điện</th>
            <th className="border p-2">Giá nước</th>
          </tr>
        </thead>
        <tbody>
          {hopDongData.map((hd, idx) => (
            <tr key={idx} className="text-center border">
              <td className="border p-2">{hd.maHD}</td>
              <td className="border p-2">{hd.maSV}</td>
              <td className="border p-2">{hd.tenSV}</td>
              <td className="border p-2">{hd.maPhong}</td>
              <td className="border p-2">{hd.tenPhong}</td>
              <td className="border p-2">{hd.loaiPhong}</td>
              <td className="border p-2">{hd.ngayBD}</td>
              <td className="border p-2">{hd.ngayKT}</td>
              <td className="border p-2">{hd.trangThai}</td>
              <td className="border p-2">{hd.maNV}</td>
              <td className="border p-2">{hd.tenNV}</td>
              <td className="border p-2">{hd.giaDien.toLocaleString()}</td>
              <td className="border p-2">{hd.giaNuoc.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HopDongNoiTru;

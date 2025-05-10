import React from 'react';

const ChiTietPhieuThuBang = () => {
  const thongTinPhieu = {
    maPhieu: 'PT202504001',
    maSV: 'SV2023001',
    ngayLap: '2025-04-15',
    tongTien: 1730000,
    trangThai: 'Đã thanh toán',
    maNV: 'NV002',
    tenNV: 'Nguyễn Văn A',
    maHopDong: 'HD20240123',
    mucPhi: 'Phòng 500k/tháng',
  };

  const bangChiTiet = [
    {
      stt: 1,
      phong: '701',
      chiSoDienCu: 1234,
      chiSoDienMoi: 1270,
      soKw: 36,
      chiSoDienNop: 36,
      donGiaKw: 3000,
      tienDien: 108000,

      chiSoNuocCu: 85,
      chiSoNuocMoi: 95,
      soM3: 10,
      chiSoNuocNop: 10,
      donGiaM3: 15000,
      tienNuoc: 150000,
    },
    {
      stt: 2,
      phong: '702',
      chiSoDienCu: 1400,
      chiSoDienMoi: 1430,
      soKw: 30,
      chiSoDienNop: 30,
      donGiaKw: 3000,
      tienDien: 90000,

      chiSoNuocCu: 60,
      chiSoNuocMoi: 68,
      soM3: 8,
      chiSoNuocNop: 8,
      donGiaM3: 15000,
      tienNuoc: 120000,
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Thông tin phiếu thu</h2>
      <table className="table-auto w-full border mb-8 text-sm">
        <tbody>
          <tr className="border bg-gray-100">
            <td className="p-2 font-medium">Mã phiếu thu</td>
            <td className="p-2">{thongTinPhieu.maPhieu}</td>
            <td className="p-2 font-medium">Mã sinh viên</td>
            <td className="p-2">{thongTinPhieu.maSV}</td>
          </tr>
          <tr className="border">
            <td className="p-2 font-medium">Ngày lập</td>
            <td className="p-2">{thongTinPhieu.ngayLap}</td>
            <td className="p-2 font-medium">Tổng tiền</td>
            <td className="p-2">{thongTinPhieu.tongTien.toLocaleString()} đ</td>
          </tr>
          <tr className="border bg-gray-100">
            <td className="p-2 font-medium">Trạng thái</td>
            <td className="p-2">{thongTinPhieu.trangThai}</td>
            <td className="p-2 font-medium">Mức phí</td>
            <td className="p-2">{thongTinPhieu.mucPhi}</td>
          </tr>
          <tr className="border">
            <td className="p-2 font-medium">Mã nhân viên</td>
            <td className="p-2">{thongTinPhieu.maNV}</td>
            <td className="p-2 font-medium">Tên nhân viên</td>
            <td className="p-2">{thongTinPhieu.tenNV}</td>
          </tr>
          <tr className="border bg-gray-100">
            <td className="p-2 font-medium">Mã hợp đồng</td>
            <td className="p-2" colSpan="3">{thongTinPhieu.maHopDong}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-2">Chi tiết điện - nước theo phòng</h2>
      <table className="table-auto w-full border text-sm">
        <thead className="bg-blue-100">
          <tr className="text-center">
            <th rowSpan="2" className="border p-2">STT</th>
            <th rowSpan="2" className="border p-2">Phòng</th>
            <th colSpan="6" className="border p-2">Điện</th>
            <th colSpan="6" className="border p-2">Nước</th>
          </tr>
          <tr className="text-center">
            <th className="border p-2">Cũ</th>
            <th className="border p-2">Mới</th>
            <th className="border p-2">KW</th>
            <th className="border p-2">Phải nộp</th>
            <th className="border p-2">Đơn giá</th>
            <th className="border p-2">Thành tiền</th>

            <th className="border p-2">Cũ</th>
            <th className="border p-2">Mới</th>
            <th className="border p-2">M3</th>
            <th className="border p-2">Phải nộp</th>
            <th className="border p-2">Đơn giá</th>
            <th className="border p-2">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {bangChiTiet.map((item, idx) => (
            <tr key={idx} className="text-center border">
              <td className="border p-1">{item.stt}</td>
              <td className="border p-1">{item.phong}</td>
              <td className="border p-1">{item.chiSoDienCu}</td>
              <td className="border p-1">{item.chiSoDienMoi}</td>
              <td className="border p-1">{item.soKw}</td>
              <td className="border p-1">{item.chiSoDienNop}</td>
              <td className="border p-1">{item.donGiaKw.toLocaleString()}</td>
              <td className="border p-1">{item.tienDien.toLocaleString()}</td>

              <td className="border p-1">{item.chiSoNuocCu}</td>
              <td className="border p-1">{item.chiSoNuocMoi}</td>
              <td className="border p-1">{item.soM3}</td>
              <td className="border p-1">{item.chiSoNuocNop}</td>
              <td className="border p-1">{item.donGiaM3.toLocaleString()}</td>
              <td className="border p-1">{item.tienNuoc.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChiTietPhieuThuBang;

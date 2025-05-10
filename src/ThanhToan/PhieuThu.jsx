import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockData = [
  {
    phong: '701',
    loaiPhong: 'Phòng 500k/tháng',
    thang: '01',
    nam: '2025',
    tienDien: 264000,
    tienNuoc: 630000,
    tongTien: 894000,
    ghiChu: '',
  },
  {
    phong: '712',
    loaiPhong: 'Phòng 1tr5/tháng (miễn phí dịch vụ)',
    thang: '01',
    nam: '2025',
    tienDien: 0,
    tienNuoc: 0,
    tongTien: 1500000,
    ghiChu: 'Đã thanh toán theo năm',
  },
  {
    phong: '702',
    loaiPhong: 'Phòng 500k/tháng',
    thang: '01',
    nam: '2025',
    tienDien: 22000,
    tienNuoc: 90000,
    tongTien: 730000,
    ghiChu: '',
  }
];

const PhieuThu = () => {
  const [filter, setFilter] = useState({ month: '', year: '', room: '' });

  const filteredData = mockData.filter(item => {
    return (
      (!filter.month || item.thang === filter.month) &&
      (!filter.year || item.nam === filter.year) &&
      (!filter.room || item.phong.includes(filter.room))
    );
  });

  const data500k = filteredData.filter(item => item.loaiPhong.includes('500k'));
  const data1500k = filteredData.filter(item => item.loaiPhong.includes('1tr5'));

  const renderCard = (item, idx) => (
    <Card key={idx} className="mb-4">
      <CardContent>
        <p><strong>Phòng:</strong> {item.phong} ({item.loaiPhong})</p>
        <p><strong>Tháng/Năm:</strong> {item.thang}/{item.nam}</p>
        <p><strong>Tiền điện:</strong> {item.tienDien.toLocaleString()} đ</p>
        <p><strong>Tiền nước:</strong> {item.tienNuoc.toLocaleString()} đ</p>
        <p><strong>Tổng cộng:</strong> {item.tongTien.toLocaleString()} đ</p>
        <p><strong>Ghi chú:</strong> {item.ghiChu}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Input placeholder="Tháng" onChange={e => setFilter({ ...filter, month: e.target.value })} />
        <Input placeholder="Năm" onChange={e => setFilter({ ...filter, year: e.target.value })} />
        <Input placeholder="Phòng" onChange={e => setFilter({ ...filter, room: e.target.value })} />
        <Button onClick={() => setFilter({ month: '', year: '', room: '' })}>Xoá bộ lọc</Button>
      </div>

      {data500k.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Phòng 500k/tháng (trả điện nước)</h3>
          {data500k.map(renderCard)}
        </>
      )}

      {data1500k.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2 mt-6">Phòng 1tr5/tháng (miễn phí điện nước)</h3>
          {data1500k.map(renderCard)}
        </>
      )}

      {filteredData.length === 0 && <p className="text-gray-500">Không có dữ liệu phù hợp với bộ lọc.</p>}
    </div>
  );
};

export default PhieuThu;

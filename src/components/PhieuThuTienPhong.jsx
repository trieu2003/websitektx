import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";


const PhieuThuTienPhong = () => {
  const [phongList, setPhongList] = useState([
    { id: "P101", ten: "Phòng 101", loai: 500 },
    { id: "P102", ten: "Phòng 102", loai: 1500 }
  ]);

  const [selectedPhong, setSelectedPhong] = useState(null);
  const [thanhToanTheoNam, setThanhToanTheoNam] = useState(false);
  const [soThang, setSoThang] = useState(1);
  const [tongTien, setTongTien] = useState(0);

  useEffect(() => {
    if (selectedPhong) {
      const loai = selectedPhong.loai;
      if (loai === 1500) {
        setThanhToanTheoNam(true);
        setSoThang(12);
        setTongTien(1500 * 12);
      } else {
        setThanhToanTheoNam(false);
        setTongTien(loai * soThang);
      }
    }
  }, [selectedPhong, soThang]);

  const handleLapPhieu = () => {
    if (!selectedPhong) return;
    alert(`Đã lập phiếu thu: ${selectedPhong.ten} - ${tongTien.toLocaleString()} VND`);
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 p-4 shadow-xl">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">Lập Phiếu Thu Tiền Phòng</h2>

        <Label>Chọn phòng</Label>
        <Select onChange={(val) => {
  const phong = phongList.find(p => p.id === val);
  setSelectedPhong(phong);
}}>
  <SelectItem value="">-- Chọn phòng --</SelectItem>
  {phongList.map((phong) => (
    <SelectItem key={phong.id} value={phong.id}>
      {phong.ten} - {phong.loai.toLocaleString()}đ/tháng
    </SelectItem>
  ))}
</Select>


        {!thanhToanTheoNam && (
          <div>
            <Label>Số tháng thanh toán</Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={soThang}
              onChange={(e) => setSoThang(Number(e.target.value))}
            />
          </div>
        )}

        <div>
          <Label>Tổng tiền cần thu</Label>
          <Input value={tongTien.toLocaleString()} readOnly />
        </div>

        <Button onClick={handleLapPhieu} disabled={!selectedPhong}>Lập Phiếu Thu</Button>
      </CardContent>
    </Card>
  );
};

export default PhieuThuTienPhong;

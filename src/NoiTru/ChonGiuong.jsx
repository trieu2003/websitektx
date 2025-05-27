import React, { useEffect, useState } from "react";
import { getGiuongTrongByPhong } from "../Service/api_KyTucXac";

const ChonGiuong = ({ maPhong, onGiuongChange }) => {
  const [dsGiuong, setDsGiuong] = useState([]);

  useEffect(() => {
    if (!maPhong) return;
    const fetchGiuong = async () => {
      try {
        const res = await getGiuongTrongByPhong(maPhong);
        setDsGiuong(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Lỗi lấy giường trống:", err);
      }
    };

    fetchGiuong();
  }, [maPhong]);

  return (
    <div>
      <label>Chọn giường:</label>
      <select onChange={(e) => onGiuongChange(e.target.value)}>cdcd
        <option value="">-- Chọn giường --</option>
        {dsGiuong.map((giuong) => (
          <option key={giuong.maGiuong} value={giuong.maGiuong}>
            {giuong.maGiuong}- {giuong.tenThietBi} - {giuong.trangThai}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChonGiuong;

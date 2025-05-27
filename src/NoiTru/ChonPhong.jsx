import React, { useEffect, useState } from "react";
import { getPhongByTang } from "../Service/api_KyTucXac";

const ChonPhong = ({ maTang, onPhongChange }) => {
  const [dsPhong, setDsPhong] = useState([]);

  useEffect(() => {
    if (!maTang) return;
    const fetchPhong = async () => {
      try {
        const res = await getPhongByTang(maTang);
        setDsPhong(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách phòng:", err);
      }
    };

    fetchPhong();
  }, [maTang]);

  return (
    <div>
      <label>Chọn phòng:</label>
      <select onChange={(e) => onPhongChange(e.target.value)}>
        <option value="">-- Chọn phòng --</option>
        {dsPhong.map((phong) => (
          <option key={phong.maPhong} value={phong.maPhong}>
            {phong.maPhong}- {phong.tenPhong} - {phong.trangThai}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChonPhong;

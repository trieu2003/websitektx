import React, { useEffect, useState } from "react";
import { getDanhSachTang } from "../Service/api_KyTucXac"; // Đường dẫn đến file chứa axiosInstance

const ChonTang = ({ onTangChange }) => {
  const [dsTang, setDsTang] = useState([]);

  useEffect(() => {
    const fetchTang = async () => {
      try {
        const res = await getDanhSachTang();
        setDsTang(res.data); // giả sử API trả về .data là danh sách
      } catch (err) {
        console.error("Lỗi lấy danh sách tầng:", err);
      }
    };

    fetchTang();
  }, []);

  return (
    <div>
      <label>Chọn tầng:</label>
      <select onChange={(e) => onTangChange(e.target.value)}>
        <option value="">-- Chọn tầng --</option>
        {dsTang.map((tang) => (
          <option key={tang.maTang} value={tang.maTang}>
            {tang.tenTang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChonTang;

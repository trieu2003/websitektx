import { useEffect, useState } from "react";
import { getDanhSachTang, getPhongByTang, dangKyGiuong } from "../Service/api";

const DanhSachTang = () => {
  const [tangs, setTangs] = useState([]);

  useEffect(() => {
    getDanhSachTang().then(setTangs).catch(console.error);
  }, []);

  return (
    <ul>
      {tangs.map(t => (
        <li key={t.maTang}>{t.tenTang}</li>
      ))}
    </ul>
  );
};

export default DanhSachTang;
import React from "react";
import { useNavigate } from "react-router-dom";
import '/src/assets/style/style.css';
const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quanly/register");
  };

  return (
    <section className="banner bg-light text-center py-4">
      <div className="container">
        <h1 className="display-5 fw-bold">Hệ Thống Quản Lý Ký Túc Xá</h1>
        <p className="lead text-muted">Trường Đại học Công Thương TP. Hồ Chí Minh</p>
        <button className="btn btn-primary" onClick={handleClick}>
          Đăng Ký Ngay
        </button>
      </div>
    </section>
  );
};

export default Banner;

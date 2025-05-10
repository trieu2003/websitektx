import '/src/assets/style/Sidebar.css';



import React, { useState } from 'react';


const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="sidebar">
      <div className="menu-item">
        <span className="icon">🏠</span> Trang chủ
      </div>
      <div className="menu-item" onClick={() => toggleMenu('info')}>
        <span className="icon">📋</span> Thông tin sinh viên
      </div>
      <div className={`collapse-content ${openMenu === 'info' ? 'open' : ''}`}>
        <a href="#">Chi tiết thông tin</a>
      </div>
      <div className="menu-item" onClick={() => toggleMenu('register')}>
        <span className="icon">🏠</span> Đăng ký nội trú
      </div>
      <div className={`collapse-content ${openMenu === 'register' ? 'open' : ''}`}>
        <a href="#">Nhận phòng</a>
        <a href="#">Gửi yêu cầu sửa chữa</a>
        <a href="#">Gia hạn đăng ký nội trú</a>
        <a href="#">Đặt chỗ trước</a>
      </div>
      <div className="menu-item" onClick={() => toggleMenu('visa')}>
        <span className="icon">💳</span> Visa học phí
      </div>
      <div className={`collapse-content ${openMenu === 'visa' ? 'open' : ''}`}>
        <a href="#">Thanh toán</a>
      </div>
      <div className="menu-item" onClick={() => toggleMenu('other')}>
        <span className="icon">⚙️</span> Khác
      </div>
      <div className={`collapse-content ${openMenu === 'other' ? 'open' : ''}`}>
        <a href="#">Hỗ trợ</a>
      </div>
      <div className="color-options">
        <span className="color-circle white"></span>
        <span className="color-circle purple"></span>
        <span className="color-circle blue"></span>
        <span className="color-circle red"></span>
        <span className="color-circle cyan"></span>
      </div>
    </div>
  );
};

export default Sidebar;
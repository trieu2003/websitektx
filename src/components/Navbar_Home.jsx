import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm Link và useNavigate
import '/src/assets/style/Navbar_Home.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Để xử lý đăng xuất

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất (ví dụ: xóa token, state, v.v.)
    navigate('/'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };

  return (
    <nav className="navbar">
      <div className="logo-search">
        <div className="navbar-brand">
          <img src="sv_logo_navbarhome.png" alt="Logo" className="logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
          <button type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8787 11.8787C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86207 11.8787C1.6614 10.6873 0.98999 9.06576 0.98999 7.375C0.98999 5.68424 1.6614 4.06274 2.86207 2.86207C4.06274 1.6614 5.68424 0.98999 7.375 0.98999C9.06576 0.98999 10.6873 1.6614 11.8787 2.86207C13.0784 4.06274 13.75 5.68424 13.75 7.375Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Đăng Kí</Link></li>
        <li><Link to="/home">Nhận Phòng</Link></li>
        <li><Link to="/home">Đặt Chỗ</Link></li>
        <li><Link to="/home">Gia Hạn</Link></li>
        <li><Link to="/home">Trả Phòng</Link></li>
        <li><Link to="/home">Thanh Toán</Link></li>
        <li><Link to="/NoiQuy">Nội Quy Ký túc xá</Link></li>
      </ul>
      <div className="user-menu">
        <button className="user-button" onClick={toggleDropdown}>
          <img src="avatar.jpg" alt="User Avatar" className="user-avatar" />
          <span className="username">Huỳnh Vĩ Khang</span>
          <svg
            className="dropdown-arrow"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3L5 7L9 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Thông tin cá nhân</Link>
            <Link to="/change-password">Đổi mật khẩu</Link>
            <a href="#" onClick={handleLogout}>Đăng xuất</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
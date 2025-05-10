import React from "react";
import '/src/assets/style/style.css';
const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
          {/* Left Section: Contact Info and Social Links */}
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">THÔNG TIN LIÊN HỆ</h5>
            <p><i className="bi bi-house-door me-2"></i>Địa chỉ: Trường Đại học Công Thương TP. Hồ Chí Minh</p>
            <p><i className="bi bi-geo-alt me-2"></i>140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, TP.HCM</p>
            <p><i className="bi bi-telephone me-2"></i>Điện thoại: 0283 8163 318</p>
            <p><i className="bi bi-envelope me-2"></i>Email: info@huit.edu.vn</p>
            {/* Social Media Links */}
            <div className="social-links mt-3">
              <a href="https://youtube.com" className="text-white me-3"><i className="bi bi-youtube fs-4"></i></a>
              <a href="https://instagram.com" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></a>
              <a href="https://zalo.me" className="text-white me-3"><i className="bi bi-chat fs-4"></i></a>
              <a href="https://facebook.com" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></a>
              <a href="https://tiktok.com" className="text-white"><i className="bi bi-tiktok fs-4"></i></a>
            </div>
          </div>

          {/* Right Section: Quick Links */}
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">KẾT NỐI VỚI CHÚNG TÔI</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Thông tin tuyển dụng</a></li>
              <li><a href="#" className="text-white text-decoration-none">Bán HUIT</a></li>
              <li><a href="#" className="text-white text-decoration-none">Thư điện tử</a></li>
              <li><a href="#" className="text-white text-decoration-none">Media</a></li>
              <li><a href="#" className="text-white text-decoration-none">Văn bản, quy định</a></li>
              <li><a href="#" className="text-white text-decoration-none">Tra cứu văn bằng</a></li>
              <li><a href="#" className="text-white text-decoration-none">Elearning</a></li>
              <li><a href="#" className="text-white text-decoration-none">Thống kê truy cập</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-top pt-3">
          <p className="mb-0">© 2025 HUIT.edu.vn</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

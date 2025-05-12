import React from "react";
import '../assets/css/footer.css';
const Footer = () => {
  return (
    <footer className="footer bg-primary text-white py-8 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Contact Info and Social Links */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold uppercase tracking-wide">Thông Tin Liên Hệ</h5>
            <p className="flex items-center">
              <i className="bi bi-house-door mr-2 text-lg"></i>
              Trường Đại học Công Thương TP. Hồ Chí Minh
            </p>
            <p className="flex items-center">
              <i className="bi bi-geo-alt mr-2 text-lg"></i>
              140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú, TP.HCM
            </p>
            <p className="flex items-center">
              <i className="bi bi-telephone mr-2 text-lg"></i>
              0283 8163 318
            </p>
            <p className="flex items-center">
              <i className="bi bi-envelope mr-2 text-lg"></i>
              info@huit.edu.vn
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="https://youtube.com" className="text-white hover:text-gray-300 transition-colors">
                <i className="bi bi-youtube text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-300 transition-colors">
                <i className="bi bi-instagram text-2xl"></i>
              </a>
              <a href="https://zalo.me" className="text-white hover:text-gray-300 transition-colors">
                <i className="bi bi-chat text-2xl"></i>
              </a>
              <a href="https://facebook.com" className="text-white hover:text-gray-300 transition-colors">
                <i className="bi bi-facebook text-2xl"></i>
              </a>
              <a href="https://tiktok.com" className="text-white hover:text-gray-300 transition-colors">
                <i className="bi bi-tiktok text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Right Section: Quick Links */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold uppercase tracking-wide">Kết Nối Với Chúng Tôi</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Thông tin tuyển dụng</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Bán HUIT</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Thư điện tử</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Media</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Văn bản, quy định</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Tra cứu văn bằng</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Elearning</a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Thống kê truy cập</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-600 pt-6 mt-8">
          <p className="text-sm">© 2025 HUIT.edu.vn. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
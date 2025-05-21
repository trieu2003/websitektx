import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import HeaderSinhVien from "./components/SinhVien/HeaderSinhVien";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DanhSachPhong from "./Phong/DanhSachPhong";
import ChiTietPhong from "./Phong/ChiTietPhong";
import ChonPhongSinhVien from "./Phong/ChonPhongSinhVien";
import FormDangKyNoiTru from "./components/FormDangKyNoiTru";

function App() {
  const [vaitro, setVaiTro] = useState(null);

  useEffect(() => {
    const storedVaiTro = localStorage.getItem("vaitro");
    if (storedVaiTro) {
      setVaiTro(storedVaiTro);
    }
  }, []);

  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = !!vaitro; // True nếu vaitro tồn tại

  return (
    <Router>
      {/* Hiển thị HeaderSinhVien nếu đã đăng nhập */}
      {isLoggedIn && <HeaderSinhVien />}
      <div className="main-content">
       
        <Routes>
          {!isLoggedIn ? (
            <Route path="*" element={
              <div className="login-container">
                  <Navbar /> 
                 <LoginForm />
              </div>  
          } />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/phong" element={<DanhSachPhong />} />
              <Route path="/phong/:maPhong" element={<ChiTietPhong />} />
              <Route path="/dangkynoitru" 
              element={
                        <div className="dangkynoitru-container mt-5 mb-5">
                            <FormDangKyNoiTru />
                        </div>
                     }
              />
              <Route path="/sinhvien/giahan" element={<div>Gia hạn đăng ký</div>} />
              <Route path="/sinhvien/nhanphong" element={<div>Nhận phòng</div>} />
              <Route path="/sinhvien/traphong" element={<div>Trả phòng</div>} />
              <Route path="/sinhvien/thanhtoan" element={<div>Hóa đơn & thanh toán</div>} />
              <Route path="/sinhvien/suachua" element={<div>Gửi yêu cầu sửa chữa</div>} />
              <Route path="/sinhvien/datcho" element={<div>Đặt chỗ trước</div>} />
              <Route path="/sinhvien/tracuu" element={<div>Tra cứu thông tin</div>} />
            </>
          )}
        </Routes>
      </div>

      {/* Footer hiển thị ở mọi trang */}
      <Footer />
    </Router>
  );
}

export default App;
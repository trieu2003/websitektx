// // import React, { useEffect, useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import "./App.css";
// // import Home from "./Pages/Home";
// // import HeaderSinhVien from "./components/SinhVien/HeaderSinhVien";
// // import LoginForm from "./components/LoginForm";
// // import Footer from "./components/Footer";
// // import Navbar from "./components/Navbar";
// // import DanhSachPhong from "./Phong/DanhSachPhong";
// // import ChiTietPhong from "./Phong/ChiTietPhong";
// // import ChonPhongSinhVien from "./Phong/ChonPhongSinhVien";
// // import FormDangKyNoiTru from "./NoiTru/HopDongNoiTru";

// // function App() {
// //   const [vaitro, setVaiTro] = useState(null);

// //   useEffect(() => {
// //     const storedVaiTro = localStorage.getItem("vaitro");
// //     if (storedVaiTro) {
// //       setVaiTro(storedVaiTro);
// //     }
// //   }, []);

// //   // Kiểm tra trạng thái đăng nhập
// //   const isLoggedIn = !!vaitro; // True nếu vaitro tồn tại

// //   return (
// //     <Router>
// //       {/* Hiển thị HeaderSinhVien nếu đã đăng nhập */}
// //       {isLoggedIn && <HeaderSinhVien />}
// //       <div className="main-content">
       
// //         <Routes>
// //           {!isLoggedIn ? (
// //             <Route path="*" element={
// //               <div className="login-container">
// //                   <Navbar /> 
// //                  <LoginForm />
// //               </div>  
// //           } />
// //           ) : (
// //             <>
// //               <Route path="/" element={<Home />} />
// //               <Route path="/phong" element={<DanhSachPhong />} />
// //               <Route path="/phong/:maPhong" element={<ChiTietPhong />} />
// //               <Route path="/dangkynoitru" 
// //               element={
// //                         <div className="dangkynoitru-container mt-5 mb-5">
// //                             <FormDangKyNoiTru />
// //                         </div>
// //                      }
// //               />
// //               <Route path="/sinhvien/giahan" element={<div>Gia hạn đăng ký</div>} />
// //               <Route path="/sinhvien/nhanphong" element={<div>Nhận phòng</div>} />
// //               <Route path="/sinhvien/traphong" element={<div>Trả phòng</div>} />
// //               <Route path="/sinhvien/thanhtoan" element={<div>Hóa đơn & thanh toán</div>} />
// //               <Route path="/sinhvien/suachua" element={<div>Gửi yêu cầu sửa chữa</div>} />
// //               <Route path="/sinhvien/datcho" element={<div>Đặt chỗ trước</div>} />
// //               <Route path="/sinhvien/tracuu" element={<div>Tra cứu thông tin</div>} />
// //             </>
// //           )}
// //         </Routes>
// //       </div>

// //       {/* Footer hiển thị ở mọi trang */}
// //       <Footer />
// //     </Router>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import "./App.css";

// function App() {
//   // Giả sử lưu token trong localStorage để kiểm tra đăng nhập
//   const token = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         {/* Nếu đã đăng nhập thì không cho vào Login nữa, redirect về Home */}
//         <Route
//           path="/login"
//           element={!token ? <Login /> : <Navigate to="/" />}
//         />

//         {/* Trang chính */}
//         <Route
//           path="/"
//           element={token ? <Home /> : <Navigate to="/login" />}
//         />

//         {/* Nếu đường dẫn không hợp lệ thì chuyển về login */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DangKyNoiTru from "./pages/DangKyNoiTru";
import GiaHanDangKy from "./pages/GiaHanDangKy";
import NhanPhong from "./pages/NhanPhong";
import TraPhong from "./pages/TraPhong";
import HoaDon from "./pages/HoaDon";
import GuiYeuCauSuaChua from "./pages/GuiYeuCauSuaChua";
import DatChoTruoc from "./pages/DatChoTruoc";
import TraCuuThongTin from "./pages/TraCuuThongTin";
import ThanhToan from "./pages/ThanhToan";
import HuyThanhToan from "./pages/HuyThanhToan";
import KetQuaThanhToan from "./pages/KetQuaThanhToan";
import ForgotPassword from "./pages/ForgotPassword"; 

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} />
      <main className="min-h-[80vh] p-4 bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
          />
           {/* Các route nội trú, phòng, thanh toán, tiện ích */}
  <Route
    path="/dangkynoitru"
    element={user ? <DangKyNoiTru /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/giahan"
    element={user ? <GiaHanDangKy /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/nhanphong"
    element={user ? <NhanPhong /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/traphong"
    element={user ? <TraPhong /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/thanhtoan"
    element={user ? <ThanhToan /> : <Navigate to="/login" replace />}
  />
    <Route path="/ket-qua" element={<KetQuaThanhToan />} />
        <Route path="/huy" element={<HuyThanhToan />} />
   <Route
    path="/sinhvien/hoadon"
    element={user ? <HoaDon /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/suachua"
    element={user ? <GuiYeuCauSuaChua /> : <Navigate to="/login" replace />}
  />
  <Route
    path="/sinhvien/datcho"
    element={user ? <DatChoTruoc /> : <Navigate to="/login" replace />}
  />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route
    path="/sinhvien/tracuu"
    element={user ? <TraCuuThongTin /> : <Navigate to="/login" replace />}
  />

          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
      <div className="" ><Footer /> </div>
      
    </BrowserRouter>
  );
}

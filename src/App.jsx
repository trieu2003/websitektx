// // src/App.jsx
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css";
// import Home from "./Pages/Home";
// import HeaderSinhVien from "./components/SinhVien/HeaderSinhVien";
// import LoginForm from "./components/LoginForm"; // Nếu bạn muốn hiển thị form đăng nhập
// import Footer from "./components/Footer";

// import DanhSachPhong from "./Phong/DanhSachPhong";
// import ChiTietPhong from "./Phong/ChiTietPhong";
// import ChonPhongSinhVien from "./Phong/ChonPhongSinhVien";
// function App() {
//   const [vaitro, setVaiTro] = useState(null);

//   useEffect(() => {
//     const storedVaiTro = localStorage.getItem("vaitro");
//     if (storedVaiTro) {
//       setVaiTro(storedVaiTro);
//     }
//   }, []);

//   return (
    
//     <Router>
//       {/* Hiện header nếu là sinh viên */}
//       {vaitro === "sinhvien" && <HeaderSinhVien />}

//       <Routes>
       
//         {!vaitro ? (
//           <Route path="*" element={<LoginForm />} />
//         ) : (
//           <>
              
//             <Route path="/" element={<Home />} />
//             {/* Các route khác có thể thêm tại đây */}
//              <Route path="/" element={<DanhSachPhong />} />
//         <Route path="/phong" element={<DanhSachPhong />} /> {/* Route cho DanhSachPhong */}
//         <Route path="/phong/:maPhong" element={<ChiTietPhong />} />
//         {/* Các route khác nếu cần */}
//         <Route path="/sinhvien/giahan" element={<div>Gia hạn đăng ký</div>} />
//         <Route path="/sinhvien/nhanphong" element={<div>Nhận phòng</div>} />
//         <Route path="/sinhvien/traphong" element={<div>Trả phòng</div>} />
//         <Route path="/sinhvien/thanhtoan" element={<div>Hóa đơn & thanh toán</div>} />
//         <Route path="/sinhvien/suachua" element={<div>Gửi yêu cầu sửa chữa</div>} />
//         <Route path="/sinhvien/datcho" element={<div>Đặt chỗ trước</div>} />
//         <Route path="/sinhvien/tracuu" element={<div>Tra cứu thông tin</div>} />
//  <Route path="/chon-phong" element={<ChonPhongSinhVien />} /> {/* Route chính xác */}
//           </>
        
       
   
//         )}
//       </Routes>

//       {/* Footer hiện cho mọi vai trò nếu cần */}
//       <Footer />
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import HeaderSinhVien from "./components/SinhVien/HeaderSinhVien";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
=======
import DanhSachPhong from "./Phong/DanhSachPhong";
import ChiTietPhong from "./Phong/ChiTietPhong";
import ChonPhongSinhVien from "./Phong/ChonPhongSinhVien";
>>>>>>> 75280f5 (update cho khang giao dien ne)

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
<<<<<<< HEAD
      <Navbar />
      {/* Hiện header nếu là sinh viên */}
      {vaitro === "sinhvien" && <HeaderSinhVien />}
=======
      {/* Hiển thị HeaderSinhVien nếu đã đăng nhập */}
      {isLoggedIn && <HeaderSinhVien />}
>>>>>>> 75280f5 (update cho khang giao dien ne)

      <div className="main-content">
        <Routes>
          {!isLoggedIn ? (
            <Route path="*" element={<LoginForm />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/phong" element={<DanhSachPhong />} />
              <Route path="/phong/:maPhong" element={<ChiTietPhong />} />
              <Route path="/chon-phong" element={<ChonPhongSinhVien />} />
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
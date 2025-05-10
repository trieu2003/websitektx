// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import HeaderSinhVien from "./components/SinhVien/HeaderSinhVien";
import LoginForm from "./components/LoginForm"; // Nếu bạn muốn hiển thị form đăng nhập
import Footer from "./components/Footer";

function App() {
  const [vaitro, setVaiTro] = useState(null);

  useEffect(() => {
    const storedVaiTro = localStorage.getItem("vaitro");
    if (storedVaiTro) {
      setVaiTro(storedVaiTro);
    }
  }, []);

  return (
    <Router>
      {/* Hiện header nếu là sinh viên */}
      {vaitro === "sinhvien" && <HeaderSinhVien />}

      <Routes>
        {/* Nếu chưa có vai trò thì hiện trang đăng nhập */}
        {!vaitro ? (
          <Route path="*" element={<LoginForm />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {/* Các route khác có thể thêm tại đây */}
          </>
        )}
      </Routes>

      {/* Footer hiện cho mọi vai trò nếu cần */}
      <Footer />
    </Router>
  );
}

export default App;

// App.jsx
import React, { useState, useEffect } from 'react';
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
import DiemDanh from "./pages/DiemDanh";
export default function App() {
  // Initialize user state with data from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Optional: Keep user state in sync with localStorage changes (if modified elsewhere)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <main className="bg-white-100">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
          />
          <Route path="/dangkynoitru" element={user ? <DangKyNoiTru /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/giahan" element={user ? <GiaHanDangKy /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/nhanphong" element={user ? <NhanPhong /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/traphong" element={user ? <TraPhong /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/thanhtoan" element={user ? <ThanhToan /> : <Navigate to="/login" replace />} />
          <Route path="/ket-qua" element={<KetQuaThanhToan />} />
          <Route path="/huy" element={<HuyThanhToan />} />
          <Route path="/sinhvien/hoadon" element={user ? <HoaDon /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/suachua" element={user ? <GuiYeuCauSuaChua /> : <Navigate to="/login" replace />} />
          <Route path="/sinhvien/datcho" element={user ? <DatChoTruoc /> : <Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sinhvien/tracuu" element={user ? <TraCuuThongTin /> : <Navigate to="/login" replace />} />
          <Route path="/vipham" element={user ? <h1>Danh sách vi phạm</h1> : <Navigate to="/login" replace />} />
          <Route path="/diemdanh" element={user ? <DiemDanh /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
      {/* {user && <Footer />} */}
    </BrowserRouter>
  );
}
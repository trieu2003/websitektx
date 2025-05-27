import axios from "axios";

// Đặt base URL chung
const BASE_URL = "https://localhost:5181/api";

// Tạo một instance của axios để dùng lại
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// ==========================
// Các hàm gọi API cụ thể
// ==========================

// Login
export const login = async (tenDangNhap, matKhau) => {
  try {
    const response = await axiosInstance.post("/Auth/login", {
      tenDangNhap,
      matKhau
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Lỗi kết nối đến máy chủ.";
  }
};
// =====================
// API dành cho nội trú
// =====================

// 1. Lấy danh sách tầng
export const getDanhSachTang = () => axiosInstance.get("/NoiTru/tang");

// 2. Lấy danh sách phòng theo tầng
export const getPhongByTang = (maTang) => axiosInstance.get(`/NoiTru/phong-by-tang/${maTang}`);

// 3. Lấy tất cả phòng
export const getAllPhong = () => axiosInstance.get("/NoiTru/phong");

// 4. Lấy chi tiết phòng theo mã phòng
export const getChiTietPhongByPhong = (maPhong) => axiosInstance.get(`/NoiTru/chitietphong-by-phong/${maPhong}`);

// 5. Lấy danh sách giường trống theo mã phòng
export const getGiuongTrongByPhong = (maPhong) => axiosInstance.get(`/NoiTru/chitietphong-by-phong/${maPhong}`);

// 6. Lấy giường theo mã chi tiết phòng
export const getGiuongByChiTietPhong = (maChiTietPhong) => axiosInstance.get(`/NoiTru/giuong-by-chitietphong/${maChiTietPhong}`);

// 7. Đăng ký giường (gửi dữ liệu hợp đồng)
export const dangKyGiuong = async (dataHopDong) => {
  try {
    const response = await axiosInstance.post("/NoiTru/dang-ky", dataHopDong);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    throw error.response?.data || "Lỗi khi đăng ký giường.";
  }
};

// (Có thể thêm các API khác sau này, ví dụ)
// export const getDanhSachSinhVien = () => axiosInstance.get("/SinhVien");

export default {
  login,
   getDanhSachTang,
   getPhongByTang,
   getAllPhong,
   getChiTietPhongByPhong,
   getGiuongTrongByPhong,
   getGiuongByChiTietPhong,
   dangKyGiuong,

  // getDanhSachSinhVien, ...
};

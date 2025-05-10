import axios from "axios";

// Đặt base URL chung
const BASE_URL = "https://localhost:5001/api";

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

// (Có thể thêm các API khác sau này, ví dụ)
// export const getDanhSachSinhVien = () => axiosInstance.get("/SinhVien");

export default {
  login,
  // getDanhSachSinhVien, ...
};

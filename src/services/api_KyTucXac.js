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

// Lấy danh sách phòng
export const getRooms = async (trangThai = null) => {
  try {
    const response = await axiosInstance.get("/Phong", {
      params: { trangThai }, // Tham số trạng thái (tùy chọn)
    });
    return response.data; // Trả về danh sách phòng
  } catch (error) {
    // Ném lỗi với thông báo từ server hoặc thông báo mặc định
    throw error.response?.data || "Lỗi khi lấy danh sách phòng.";
  }
};

// Lấy chi tiết phòng theo mã phòng
export const getRoomDetails = async (maPhong) => {
  try {
    const response = await axiosInstance.get(`/Phong/${maPhong}`); // Gọi API với mã phòng
    return response.data; // Trả về chi tiết phòng
  } catch (error) {
    // Ném lỗi với thông báo từ server hoặc thông báo mặc định
    throw error.response?.data || "Lỗi khi lấy chi tiết phòng.";
  }
};

// Xuất các hàm API để sử dụng
export default {
  login,
  getRooms,
  getRoomDetails,
};


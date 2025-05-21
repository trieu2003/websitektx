import axios from "axios";

// Đặt base URL chung
const BASE_URL = "https://localhost:5001/api";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain'
  },
  transformResponse: [(data, headers) => {
    if (typeof data === 'string' && headers['content-type']?.includes('text/plain')) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse text/plain response as JSON:', e);
        throw new Error('Invalid response format from server.');
      }
    }
    return data;
  }]
});

// Mock data for testing
const mockData = [
  {
    maGiuong: "KTX-01-01-01",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Quạt trần", "Đèn huỳnh quang", "Giường tầng"]
  },
  {
    maGiuong: "KTX-01-01-02",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Đèn huỳnh quang", "Giường tầng"]
  },
  {
    maGiuong: "KTX-01-01-03",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Bàn học", "Giường tầng"]
  },
  {
    maGiuong: "KTX-01-01-04",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Bàn học", "Giường tầng"]
  },
  {
    maGiuong: "KTX-01-01-05",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Ghế tựa", "Giường tầng"]
  },
  {
    maGiuong: "KTX-01-01-06",
    maPhong: "KTX-01-01",
    tenPhong: "Phòng 01-01",
    tenLoaiPhong: "Phòng thường",
    trangThai: "Trống",
    tenThietBi: ["Ghế tựa", "Giường tầng"]
  }
];

// Lấy danh sách giường trống (mock data only for now)
// export const getAvailableBeds = async () => {
//   try {
//     const formattedData = mockData.map(bed => ({
//       MaGiuong: bed.maGiuong,
//       MaPhong: bed.maPhong,
//       TenPhong: bed.tenPhong,
//       TenLoaiPhong: bed.tenLoaiPhong,
//       TrangThai: bed.trangThai,
//       TenThietBi: bed.tenThietBi
//     }));
//     if (!formattedData || formattedData.length === 0) {
//       throw new Error('Không có giường trống nào hiện tại.');
//     }
//     console.log('Mock data:', formattedData);
//     return formattedData;
//   } catch (error) {
//     console.error('Error with mock data:', { message: error.message });
//     throw error;
//   }
// };

// API version (uncomment to use after mock data works)

export const getAvailableBeds = async () => {
  try {
    const response = await axiosInstance.get('/Giuong/available');
    if (!response.data || response.data.length === 0) {
      throw new Error('Không có giường trống nào hiện tại.');
    }
    const formattedData = response.data.map(bed => ({
      MaGiuong: bed.maGiuong,
      MaPhong: bed.maPhong,
      TenPhong: bed.tenPhong,
      TenLoaiPhong: bed.tenLoaiPhong,
      TrangThai: bed.trangThai,
      TenThietBi: bed.tenThietBi
    }));
    console.log('API data:', formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error fetching available beds:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      request: error.request ? 'No response received' : undefined,
    });
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách giường trống. Vui lòng thử lại.');
  }
};


// Login
export const login = async (tenDangNhap, matKhau) => {
  try {
    const response = await axiosInstance.post("/Auth/login", {
      tenDangNhap,
      matKhau
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi kết nối đến máy chủ.');
  }
};

// Lấy danh sách phòng
export const getRooms = async (trangThai = null) => {
  try {
    const response = await axiosInstance.get("/Phong", {
      params: { trangThai },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách phòng.');
  }
};

// Lấy chi tiết phòng theo mã phòng
export const getRoomDetails = async (maPhong) => {
  try {
    const response = await axiosInstance.get(`/Phong/${maPhong}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy chi tiết phòng.');
  }
};

// Export axiosInstance and functions
export default {
  login,
  getRooms,
  getRoomDetails,
  getAvailableBeds,
  axiosInstance
};
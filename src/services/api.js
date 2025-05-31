const API_URL = "https://localhost:5181/api";

export async function login(credentials) {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function changePassword(payload) {
  const res = await fetch(`${API_URL}/Auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // payload phải chứa { maSV, oldPassword, newPassword }
  });
  return res.json();
}

// Thêm hàm gọi API nhận phòng
export async function checkInPhong(payload) {
  // payload phải có { MaSV }
  const res = await fetch(`${API_URL}/Phong/nhan-phong`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
export async function traPhong({ MaSV }) {
  const response = await fetch("/Phong/tra-phong", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ MaSV }),
  });

  if (!response.ok) {
    throw new Error("Lỗi trả phòng");
  }

  return await response.json();
}
export async function dangKyHopDong(payload) {
  const res = await fetch(`${API_URL}/HopDongNoiTru/DangKyHopDong`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function giaHanHopDong(payload) {
  const res = await fetch(`${API_URL}/HopDongNoiTru/GiaHanHopDong`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getAllTang() {
  const res = await fetch(`${API_URL}/NoiQuy/tang`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getPhongByTang(maTang) {
  const res = await fetch(`${API_URL}/NoiQuy/phong-by-tang/${maTang}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getAllPhong() {
  const res = await fetch(`${API_URL}/NoiQuy/phong`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getChiTietPhongByPhong(maPhong) {
  const res = await fetch(`${API_URL}/NoiQuy/chitietphong-by-phong/${maPhong}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getGiuongTrongByChiTietPhong(maChiTietPhong) {
  const res = await fetch(`${API_URL}/NoiQuy/giuong-trong-by-chitietphong/${maChiTietPhong}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getGiuongByChiTietPhong(maChiTietPhong) {
  const res = await fetch(`${API_URL}/NoiQuy/giuong-by-chitietphong/${maChiTietPhong}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export const dangKyGiuong = async (data) => {
  try {
    const response = await fetch('/api/NoiQuy/dang-ky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lỗi từ server:", errorData);
      throw new Error(`Lỗi API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export default {
  login,
  changePassword,
  checkInPhong,
  traPhong,
  dangKyHopDong,
  giaHanHopDong,

    getAllTang,
  getPhongByTang,
  getAllPhong,
  getChiTietPhongByPhong,
  getGiuongTrongByChiTietPhong,
  getGiuongByChiTietPhong,
  dangKyGiuong,
};

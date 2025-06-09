const API_URL = "https://localhost:5181/api";
export async function login(credentials) {
  const res = await fetch(`${API_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    // Ném lỗi để frontend bắt được ở Login.jsx
    throw { response: { data } };
  }

  return data;
}

async function updateStudentInfo(data) {
  const res = await fetch(`${API_URL}/SinhVien/cap-nhat`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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
export async function dangKyGiuong(data) {
  const res = await fetch("https://localhost:5181/api/HopDongNoiTru/DangKyHopDong", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}


export default {
  login,
  changePassword,
  checkInPhong,
  traPhong,
  dangKyHopDong,
  giaHanHopDong,
  updateStudentInfo,
  getAllTang,
  getPhongByTang,
  getAllPhong,
  getChiTietPhongByPhong,
  getGiuongTrongByChiTietPhong,
  getGiuongByChiTietPhong,
  dangKyGiuong,
};

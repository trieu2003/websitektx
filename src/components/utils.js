export const sinhVienFields = (data) => [
  { label: "Họ tên", value: data.hoTen },
  { label: "Mã sinh viên", value: data.maSV },
  { label: "Ngày sinh", value: data.ngaySinh },
  { label: "Lớp", value: data.lop },
  { label: "SĐT", value: data.sdt },
  { label: "Email", value: data.email },
  { label: "Số CCCD", value: data.soCanCuoc },
  { label: "SĐT Gia đình", value: data.sdtGiaDinh },
  { label: "Sổ hộ khẩu", value: data.soHoKhau },
  { label: "Mã khoa", value: data.maKhoa },
];

export const nhanVienFields = (data) => [
  { label: "Họ tên", value: data.hoTen },
  { label: "Mã nhân viên", value: data.maNV },
  { label: "Ngày sinh", value: data.ngaySinh },
  { label: "Giới tính", value: data.gioiTinh },
  { label: "Trình độ", value: data.trinhDo },
  { label: "Chức vụ", value: data.chucVu },
  { label: "Email", value: data.email },
  { label: "SĐT", value: data.sdt },
];

export const adminFields = (data) => [
  { label: "Họ tên", value: data.tenDangNhap },
  { label: "Vai trò", value: data.vaiTro },
];

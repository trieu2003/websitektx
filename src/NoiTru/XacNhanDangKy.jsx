const XacNhanDangKy = ({ thongTin }) => (
  <div>
    <h3>Đăng ký thành công!</h3>
    <p>Sinh viên: {thongTin.maSV}</p>
    <p>Phòng: {thongTin.maPhong}</p>
    <p>Giường: {thongTin.maGiuong}</p>
    <p>Trạng thái: Chờ duyệt</p>
  </div>
);
export default XacNhanDangKy;

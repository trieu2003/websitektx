import React from "react";


const DanhSachPhong = () => {
  const phongList = [
    { maPhong: "P101", tenPhong: "Phòng 101", loaiPhong: "2 người", trangThai: "Đang sử dụng" },
    { maPhong: "P102", tenPhong: "Phòng 102", loaiPhong: "4 người", trangThai: "Trống" },
  ];

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-primary mb-3">Danh Sách Phòng</h3>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Mã Phòng</th>
            <th>Tên Phòng</th>
            <th>Loại Phòng</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {phongList.map((phong) => (
            <tr key={phong.maPhong}>
              <td>{phong.maPhong}</td>
              <td>{phong.tenPhong}</td>
              <td>{phong.loaiPhong}</td>
              <td>{phong.trangThai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DanhSachPhong;

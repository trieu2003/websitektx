import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../Service/api_KyTucXac";

const DanhSachPhong = () => {
  const [phongList, setPhongList] = useState([]);
  const [trangThai, setTrangThai] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await api.getRooms(trangThai || null); // Gọi API với trạng thái (nếu có)
        setPhongList(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách phòng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [trangThai]); // Gọi lại API khi trạng thái thay đổi

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-primary mb-3">Danh Sách Phòng</h3>

      {/* Bộ lọc trạng thái */}
      <div className="mb-3">
        <label htmlFor="trangThai" className="form-label">
          Lọc theo trạng thái:
        </label>
        <select
          id="trangThai"
          className="form-select w-25"
          value={trangThai}
          onChange={(e) => setTrangThai(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Không hoạt động">Không hoạt động</option>
        </select>
      </div>

      {/* Trạng thái đang tải */}
      {loading && <div className="text-center">Đang tải...</div>}

      {/* Trạng thái lỗi */}
      {error && <div className="text-danger mb-3">{error}</div>}

      {/* Bảng danh sách phòng */}
      {!loading && !error && (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã Phòng</th>
              <th>Tên Phòng</th>
              <th>Loại Phòng</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {phongList.map((phong) => (
              <tr key={phong.maPhong}>
                <td>{phong.maPhong}</td>
                <td>{phong.tenPhong}</td>
                <td>{phong.loaiPhong}</td>
                <td>{phong.trangThai}</td>
                <td>
                  <Link
                    to={`/phong/${phong.maPhong}`}
                    className="btn btn-sm btn-primary"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DanhSachPhong;
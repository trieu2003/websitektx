import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Service/api_KyTucXac";

const ChiTietPhong = () => {
  const { maPhong } = useParams(); // Lấy mã phòng từ URL
  const navigate = useNavigate();
  const [phong, setPhong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy chi tiết phòng
  useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      try {
        const data = await api.getRoomDetails(maPhong); // Gọi API với mã phòng
        setPhong(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải chi tiết phòng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [maPhong]);

  if (loading) return <div className="text-center p-4">Đang tải...</div>;
  if (error) return <div className="text-danger text-center p-4">{error}</div>;
  if (!phong) return null;

  return (
    <div className="container py-4">
      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary mb-3"
      >
        ← Quay lại danh sách phòng
      </button>
      <h3 className="fw-bold text-primary mb-3">{phong.tenPhong}</h3>
      <div className="card">
        <div className="card-body">
          <p><strong>Mã Phòng:</strong> {phong.maPhong}</p>
          <p><strong>Loại Phòng:</strong> {phong.loaiPhong}</p>
          <p><strong>Sức Chứa:</strong> {phong.sucChua}</p>
          <p><strong>Mức Phí:</strong> {phong.mucPhi?.toLocaleString()} VND</p>
          <p><strong>Tầng:</strong> {phong.tenTang}</p>
          <p><strong>Trạng Thái:</strong> {phong.trangThai}</p>

          <h5 className="fw-bold mt-4">Danh Sách Giường & Thiết Bị</h5>
          {phong.beds?.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Tên Giường</th>
                  <th>Tên Thiết Bị</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {phong.beds.map((bed) => (
                  <tr key={bed.maChiTietPhong}>
                    <td>{bed.tenGiuong}</td>
                    <td>{bed.tenThietBi}</td>
                    <td>{bed.trangThaiChiTiet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có giường hoặc thiết bị nào được gán.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhong;
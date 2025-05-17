import React, { useState, useEffect } from "react";
import api from "../services/api_KyTucXac"; // Điều chỉnh đường dẫn nếu cần

const ChonPhongSinhVien = () => {
  const [phongList, setPhongList] = useState([]);
  const [trangThai, setTrangThai] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhong, setSelectedPhong] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await api.getRooms(trangThai || null);
        setPhongList(data);
        console.log(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách phòng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [trangThai]);

  // Lấy chi tiết phòng
  const handleViewDetails = async (maPhong) => {
    setModalLoading(true);
    setModalError(null);
    try {
      const data = await api.getRoomDetails(maPhong);
      setSelectedPhong(data);
    } catch (err) {
      setModalError("Không thể tải chi tiết phòng");
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  // Đóng modal
  const closeModal = () => {
    setSelectedPhong(null);
    setModalError(null);
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-primary mb-3">Chọn Phòng Ký Túc Xá</h3>

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
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewDetails(phong.maPhong)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal chi tiết phòng */}
      {selectedPhong && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPhong.tenPhong}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalLoading && <div className="text-center">Đang tải...</div>}
                {modalError && <div className="text-danger mb-3">{modalError}</div>}
                {!modalLoading && !modalError && (
                  <>
                    <p><strong>Mã Phòng:</strong> {selectedPhong.maPhong}</p>
                    <p><strong>Loại Phòng:</strong> {selectedPhong.loaiPhong}</p>
                    <p><strong>Sức Chứa:</strong> {selectedPhong.sucChua}</p>
                    <p><strong>Mức Phí:</strong> {selectedPhong.mucPhi?.toLocaleString()} VND</p>
                    <p><strong>Tầng:</strong> {selectedPhong.tenTang}</p>
                    <p><strong>Trạng Thái:</strong> {selectedPhong.trangThai}</p>

                    <h6 className="fw-bold mt-4">Danh Sách Giường & Thiết Bị</h6>
                    {selectedPhong.beds?.length > 0 ? (
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Tên Giường</th>
                            <th>Tên Thiết Bị</th>
                            <th>Trạng Thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPhong.beds.map((bed) => (
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
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChonPhongSinhVien;
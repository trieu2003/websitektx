import React, { useState, useEffect } from 'react';
import Modal from "../components/Modal";

const ThanhToanHoaDon = () => {
  const [danhSach, setDanhSach] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhieu, setSelectedPhieu] = useState(null);
  const [paying, setPaying] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV || user?.MaSV;

  useEffect(() => {
    if (!maSV) {
      alert('Không tìm thấy mã sinh viên trong hệ thống.');
      return;
    }

    const fetchPhieuThu = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://localhost:5181/api/PhieuThu/sinh-vien/${maSV}`);
        const data = await res.json();
        if (res.ok) {
          setDanhSach(data);
        } else {
          alert(data.message || 'Không tìm thấy phiếu thu.');
        }
      } catch (err) {
        alert('Lỗi kết nối máy chủ.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhieuThu();
  }, [maSV]);

  const handleThanhToan = async () => {
    if (!selectedPhieu) return;

    setPaying(true);
    setModalMessage("");

    try {
      const res = await fetch(`https://localhost:5181/api/phieuthu/thanh-toan/${selectedPhieu.maPhieuThu}`, {
        method: 'POST'
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setModalMessage(data.message || "Không thể thanh toán.");
      }
    } catch (err) {
      setModalMessage("Lỗi kết nối máy chủ.");
    } finally {
      setPaying(false);
    }
  };

  const closeModal = () => {
    setSelectedPhieu(null);
    setModalMessage("");
  };

  if (!maSV) {
    return <p className="text-center text-red-500 mt-6">Không có mã sinh viên. Vui lòng đăng nhập.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Danh sách Phiếu thu của bạn</h1>

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : danhSach.length > 0 ? (
        <ul className="divide-y">
          {danhSach.map((phieu) => (
            <li key={phieu.maPhieuThu} className="py-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium">Mã Phiếu: #{phieu.maPhieuThu}</p>
                  <p>Ngày lập: {new Date(phieu.ngayLap).toLocaleDateString()}</p>
                  <p>Tổng tiền: {phieu.tongTien.toLocaleString()} VND</p>
                  <p>Trạng thái: <strong>{phieu.trangThai}</strong></p>
                  <p>Người lập: {phieu.tenNhanVien || "Không rõ"}</p>
                  <p>
                    Khoản thu:{" "}
                    <span className="italic text-sm text-gray-700">
                      {phieu.loaiKhoanThu?.join(", ")}
                    </span>
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  onClick={() => setSelectedPhieu(phieu)}
                  disabled={phieu.trangThai === 'Đã thanh toán'}
                >
                  Thanh toán
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Bạn chưa có phiếu thu nào.</p>
      )}

      {/* Modal xác nhận thanh toán */}
      <Modal
        isOpen={!!selectedPhieu}
        onClose={closeModal}
        title="Xác nhận thanh toán"
        showConfirm={!modalMessage}
        onConfirm={handleThanhToan}
        confirmText={paying ? "Đang xử lý..." : "Xác nhận"}
        disabled={paying}
      >
        {selectedPhieu && (
          <>
            <p>Bạn có chắc chắn muốn thanh toán phiếu thu <strong>#{selectedPhieu.maPhieuThu}</strong> không?</p>
            <p>Tổng tiền: <strong>{selectedPhieu.tongTien.toLocaleString()} VND</strong></p>
            <p>Loại khoản thu: {selectedPhieu.loaiKhoanThu?.join(", ")}</p>
          </>
        )}
        {modalMessage && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md">
            {modalMessage}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ThanhToanHoaDon;

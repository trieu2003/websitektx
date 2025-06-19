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
        const res = await fetch(`https://localhost:5181/api/phieuthu/sinh-vien/${maSV}`);
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
    setModalMessage(""); // Reset thông báo

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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Danh sách Phiếu thu
      </h1>

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : danhSach.length === 0 ? (
        <p className="text-center text-gray-500">Không có phiếu thu nào.</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">
                  Mã phiếu
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">
                  Ngày lập
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {danhSach.map((phieu) => (
                <tr key={phieu.maPhieuThu}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    #{phieu.maPhieuThu}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {new Date(phieu.ngayLap).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {phieu.tongTien.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {phieu.trangThai}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {phieu.trangThai === "Chưa thanh toán" && (
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                        onClick={() => setSelectedPhieu(phieu)}
                        disabled={paying}
                      >
                        Thanh toán
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <p>
              Bạn có chắc chắn muốn thanh toán phiếu thu{" "}
              <strong>#{selectedPhieu.maPhieuThu}</strong> không?
            </p>
            <p>
              Tổng tiền:{" "}
              <strong>
                {selectedPhieu.tongTien.toLocaleString("vi-VN")} VND
              </strong>
            </p>
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
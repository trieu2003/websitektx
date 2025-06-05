import React, { useState } from 'react';
import { useEffect } from 'react';

const ThanhToanHoaDon = () => {
   const [danhSach, setDanhSach] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy mã sinh viên từ localStorage
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

  const handleThanhToan = async (maPhieuThu) => {
    try {
      const res = await fetch(`https://localhost:5181/api/phieuthu/thanh-toan/${maPhieuThu}`, {
        method: 'POST'
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.url; // Redirect sang PayOS
      } else {
        alert(data.message || 'Không thể thanh toán.');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ.');
    }
  };

  if (!maSV) return <p className="text-center text-red-500 mt-6">Không có mã sinh viên. Vui lòng đăng nhập.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Danh sách Phiếu thu của bạn</h1>

      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : danhSach.length > 0 ? (
        <ul className="divide-y">
          {danhSach.map((phieu) => (
            <li key={phieu.maPhieuThu} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mã Phiếu: #{phieu.maPhieuThu}</p>
                  <p>Ngày lập: {new Date(phieu.ngayLap).toLocaleDateString()}</p>
                  <p>Tổng tiền: {phieu.tongTien.toLocaleString()} VND</p>
                  <p>Trạng thái: <strong>{phieu.trangThai}</strong></p>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => handleThanhToan(phieu.maPhieuThu)}
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
    </div>
  );
};


export default ThanhToanHoaDon;

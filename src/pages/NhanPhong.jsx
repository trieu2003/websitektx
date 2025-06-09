import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function NhanPhong() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null); // Lưu thông tin phòng khi nhận phòng thành công

  // Lấy mã sinh viên từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const MaSV = user?.MaSV || user?.maSV;

  const handleNhanPhong = async () => {
    if (!MaSV) {
      setMessage("Không tìm thấy mã sinh viên. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    setMessage("");
    setRoomDetails(null);

    try {
      const res = await axios.post("https://localhost:5181/api/Phong/nhan-phong", { MaSV });

      setMessage(res.data.message || "Nhận phòng thành công.");

      // Nếu có details trả về, lưu vào state để hiển thị
      if (res.data.details) {
        setRoomDetails(res.data.details);
        console.log("Chi tiết phòng:", res.data.details);
      }
    } catch (err) {
      let msg = "Lỗi khi nhận phòng.";
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      setMessage(msg);
      setRoomDetails(null);
      console.error("API lỗi:", err);
    }

    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">

      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Xác nhận nhận phòng</h2>

      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className={`w-full py-3 px-4 font-semibold rounded-md text-white transition-colors ${
          loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Đang xử lý..." : "Xác nhận nhận phòng"}
      </button>

      {message && (
        <div
          className={`mt-6 text-center font-medium ${
            message.toLowerCase().includes("thành công") ? "text-green-700" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* Hiển thị chi tiết phòng nếu có */}
      {roomDetails && (
        <div className="mt-6 border border-green-300 rounded-lg bg-green-50 p-4 text-green-900 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Thông tin phòng</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Mã phòng:</span> {roomDetails.maPhong}
            </li>
            <li>
              <span className="font-semibold">Tên phòng:</span> {roomDetails.tenPhong}
            </li>
            <li>
              <span className="font-semibold">Tầng:</span> {roomDetails.tenTang}
            </li>
            <li>
              <span className="font-semibold">Loại phòng:</span> {roomDetails.tenLoaiPhong}
            </li>
            <li>
              <span className="font-semibold">Sức chứa:</span> {roomDetails.sucChua}
            </li>
            <li>
              <span className="font-semibold">Mã giường:</span> {roomDetails.maGiuong}
            </li>
         <li>
  <span className="font-semibold">Thiết bị:</span>{" "}
  {roomDetails.danhSachThietBi?.length > 0 ? (
    <ul className="list-disc list-inside space-y-1 text-sm">
      {roomDetails.danhSachThietBi.map((tb, index) => (
        <li key={index}>
          <span className="font-semibold">{tb.tenThietBi}</span>: {tb.moTa} | 
          Số lượng: <span className="font-semibold">{tb.soLuong}</span> | 
          Trạng thái: <span className={`font-semibold ${tb.trangThai === "Hoạt động" ? "text-green-600" : "text-red-600"}`}>
            {tb.trangThai}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    "Không có"
  )}
</li>

          </ul>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Xác nhận nhận phòng"
        showConfirm
        onConfirm={handleNhanPhong}
      >
        <p>Bạn có chắc chắn muốn xác nhận đã nhận phòng?</p>
      </Modal>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function TraPhong() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV || user?.MaSV;

  const handleTraPhong = async () => {
    if (!maSV) {
      setMessage("Không tìm thấy mã sinh viên. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://localhost:5181/api/Giuong/TraPhong", { maSV });
      setMessage(res.data.message || "Trả phòng thành công.");
    } catch (err) {
      const msg = err.response?.data?.message || "Lỗi khi trả phòng.";
      setMessage(msg);
      console.error(msg);
    }

    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-600">Xác nhận trả phòng</h2>

      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className={`w-full py-2 px-4 font-semibold rounded-md text-white ${
          loading ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Đang xử lý..." : "Xác nhận trả phòng"}
      </button>

      {message && (
        <div className="mt-4 text-center font-medium text-red-700">
          {message}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Xác nhận trả phòng"
        showConfirm
        onConfirm={handleTraPhong}
      >
        <p>Bạn có chắc chắn muốn trả phòng không?</p>
      </Modal>
    </div>
  );
}

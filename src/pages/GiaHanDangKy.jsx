import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function GiaHanHopDong() {
  // ✅ Khởi tạo mặc định ngày kết thúc mới là 1 năm sau
  const [ngayKetThucMoi, setNgayKetThucMoi] = useState(() => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return oneYearLater.toISOString().split("T")[0];
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Lấy mã sinh viên từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const maSV = user?.maSV || user?.MaSV;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!maSV) {
      setMessage("Không tìm thấy mã sinh viên. Vui lòng đăng nhập lại.");
      setIsSuccess(false);
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://localhost:5181/api/HopDongNoiTru/GiaHanHopDong", {
        maSV: maSV,
        ngayKetThucMoi: ngayKetThucMoi,
      });

      setMessage(response.data.message);
      setIsSuccess(response.data.message.includes("thành công"));
      setIsModalOpen(true);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Lỗi khi gửi yêu cầu gia hạn.";
      setMessage(errMsg);
      setIsSuccess(false);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage("");
    if (isSuccess) {
      // Reset ngày kết thúc mới về 1 năm sau
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      setNgayKetThucMoi(oneYearLater.toISOString().split("T")[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Gia hạn hợp đồng</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc mới</label>
          <input
            type="date"
            value={ngayKetThucMoi}
            onChange={(e) => setNgayKetThucMoi(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py- Mohanad2 px-4 text-white font-semibold rounded-md ${
            loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu gia hạn"}
        </button>
      </form>

      {/* Modal thông báo */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isSuccess ? "Gia hạn thành công" : "Lỗi gia hạn"}
        showConfirm={false}
      >
        <p className={isSuccess ? "text-green-600" : "text-red-500"}>{message}</p>
      </Modal>
    </div>
  );
}
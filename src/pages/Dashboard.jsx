import React, { useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function Dashboard({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [sdt, setSdt] = useState(user.sdt || "");
  const [email, setEmail] = useState(user.email || "");
  const [sdtGiaDinh, setSdtGiaDinh] = useState(user.sdtGiaDinh || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const res = await api.updateStudentInfo({
        maSV: user.maSV,
        sdt,
        email,
        sdtGiaDinh,
      });

      if (res.status === "success") {
        setMessage({ type: "success", text: "Cập nhật thành công" });
        setEditMode(false);
      } else {
        setMessage({ type: "error", text: res.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Lỗi máy chủ khi cập nhật thông tin" });
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  return (
    <div className="bg-gray-200 p-6 mt-3 max-w-3xl mx-auto rounded-lg shadow">
      <h2 className="text-2xl mb-4 font-semibold text-blue-600">Thông tin cá nhân</h2>
      <div className="flex items-center gap-6 mb-6">
        <img
          src={`${user.anhDaiDien ? `/uploads/${user.anhDaiDien}` : "src/assets/images/user.png"}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-medium">{user.hoTen}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
        <li><strong>Vai trò:</strong> {user.vaiTro}</li>
        <li><strong>Mã SV:</strong> {user.maSV}</li>
        <li><strong>Giới tính:</strong> {user.gioiTinh}</li>
        <li><strong>Ngày sinh:</strong> {user.ngaySinh}</li>
        <li><strong>Lớp:</strong> {user.lop}</li>
        <li>
          <strong>SĐT:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="border px-2 py-1 rounded-lg w-full"
            />
          ) : (
            sdt
          )}
        </li>
        <li>
          <strong>Email:</strong>{" "}
          {editMode ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 rounded-lg w-full"
            />
          ) : (
            email
          )}
        </li>
        <li>
          <strong>SĐT Gia Đình:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              value={sdtGiaDinh}
              onChange={(e) => setSdtGiaDinh(e.target.value)}
              className="border px-2 py-1 rounded-lg w-full"
            />
          ) : (
            sdtGiaDinh || "Chưa có"
          )}
        </li>
        <li><strong>Trạng thái:</strong> {user.trangThai}</li>
        <li>
          <strong>Khoa:</strong> {user.tenKhoa} ({user.maKhoa})
        </li>
      </ul>

      <div className="mb-4 space-x-4">
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
        >
          {editMode ? "Huỷ chỉnh sửa" : "Chỉnh sửa thông tin"}
        </button>
        {editMode && (
          <button
            onClick={handleUpdateInfo}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        )}
      </div>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={message?.type === "error" ? "Lỗi" : "Thành công"}
      >
        <p className="text-base">{message?.text}</p>
      </Modal>
    </div>
  );
}
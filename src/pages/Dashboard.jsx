import React, { useState } from 'react';
import api from '../services/api';
import Modal from '../components/Modal'; // 🆕 Import Modal component

export default function Dashboard({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sdt, setSdt] = useState(user.sdt || '');
  const [email, setEmail] = useState(user.email || '');
  const [sdtGiaDinh, setSdtGiaDinh] = useState(user.sdtGiaDinh || '');
  const [message, setMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp' });
      setShowMessageModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await api.changePassword({
        maSV: user.maSV,
        oldPassword,
        newPassword,
      });

      if (res.status === 'success') {
        setMessage({ type: 'success', text: res.message });
        setShowForm(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const res = await api.updateStudentInfo({
        maSV: user.maSV,
        sdt,
        email,
        sdtGiaDinh,
      });

      if (res.status === 'success') {
        setMessage({ type: 'success', text: 'Cập nhật thành công' });
        setEditMode(false);
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Lỗi máy chủ khi cập nhật thông tin' });
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold text-blue-600">Thông tin cá nhân</h2>
      <div className="flex items-center gap-6 mb-6">
        <img
          src={`/uploads/${user.anhDaiDien}`}
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
          <strong>SĐT:</strong>{' '}
          {editMode ? (
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            sdt
          )}
        </li>

        <li>
          <strong>Email:</strong>{' '}
          {editMode ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            email
          )}
        </li>

        <li>
          <strong>SĐT Gia Đình:</strong>{' '}
          {editMode ? (
            <input
              type="text"
              value={sdtGiaDinh}
              onChange={(e) => setSdtGiaDinh(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            sdtGiaDinh || 'Chưa có'
          )}
        </li>

        <li><strong>Trạng thái:</strong> {user.trangThai}</li>
        <li><strong>Khoa:</strong> {user.tenKhoa} ({user.maKhoa})</li>
      </ul>

      <div className="mb-4 space-x-4">
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          {editMode ? "Huỷ chỉnh sửa" : "Chỉnh sửa thông tin"}
        </button>

        {editMode && (
          <button
            onClick={handleUpdateInfo}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Huỷ" : "Đổi mật khẩu"}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 border p-4 rounded shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium">Mật khẩu cũ</label>
            <input
              type="password"
              className="mt-1 w-full border rounded px-3 py-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mật khẩu mới</label>
            <input
              type="password"
              className="mt-1 w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="mt-1 w-full border rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
          </button>
        </div>
      )}

      {/* ✅ Modal hiển thị thông báo */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={message?.type === 'error' ? 'Lỗi' : 'Thành công'}
      >
        <p className="text-base">{message?.text}</p>
      </Modal>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Modal from "../components/Modal"; // Import Modal
import api from "../services/api"; // Import API service

const sidebarMenu = [
  {
    title: "Nội trú",
    children: [
      { title: "Đăng ký nội trú", to: "/dangkynoitru" },
      { title: "Gia hạn đăng ký", to: "/sinhvien/giahan" },
    ],
  },
  {
    title: "Phòng ở",
    children: [
      { title: "Nhận phòng", to: "/sinhvien/nhanphong" },
      { title: "Trả phòng", to: "/sinhvien/traphong" },
    ],
  },
  {
    title: "Thanh toán",
    children: [
      { title: "Hóa đơn & Điện Nước", to: "/sinhvien/hoadon" },
      { title: "Thanh toán", to: "/sinhvien/thanhtoan" },
    ],
  },
  {
    title: "Tiện ích",
    children: [
      { title: "Gửi yêu cầu sửa chữa", to: "/sinhvien/suachua" },
      { title: "Nội Quy", to: "/noiquy" },
      { title: "Đặt chỗ trước", to: "/sinhvien/datcho" },
      { title: "Danh sách vi phạm", to: "/vipham" },
      { title: "Danh sách điểm danh", to: "/diemdanh" },
    ],
  },
];

export default function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State for password modal
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const menuRef = useRef(null);

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp" });
      setShowMessageModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/Auth/change-password", {
        maSV: user.maSV,
        oldPassword,
        newPassword,
      });

      if (res.data.status === "success") {
        setMessage({ type: "success", text: res.data.message });
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: res.data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Lỗi kết nối máy chủ" });
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      <header className="bg-blue-500 text-white p-4 relative z-50">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="flex items-center">
            <img
              src="src/assets/images/sv_logo_navbarhome.png"
              alt="Ký túc xá Logo"
              className="h-12 w-auto"
            />
          </Link>
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-lg text-yellow-500 font-bold text-center flex-1">
              ỨNG DỤNG QUẢN LÝ KÝ TÚC XÁ <br />
              TRƯỜNG ĐẠI HỌC CÔNG THƯƠNG TP HỒ CHÍ MINH
            </h1>
          </Link>
          <div className="w-48 flex justify-end relative" ref={menuRef}>
            {user ? (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleUserMenu}
              >
                <img
                  src={
                    user?.anhDaiDien
                      ? `/uploads/${user.anhDaiDien}`
                      : "src/assets/images/user.png"
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-sm">{user.hoTen}</span>
                {showUserMenu && (
                  <ul className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-md w-48 z-50">
                    <li>
                      <Link
                        to="/thong-tin-ca-nhan"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleMenuItemClick}
                      >
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setShowPasswordModal(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Đổi mật khẩu
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <span className="text-sm">Vui lòng đăng nhập</span>
            )}
          </div>
        </div>

        {user && (
          <nav className="flex space-x-6">
            {sidebarMenu.map((item, idx) => (
              <div key={idx} className="relative group">
                <button className="flex items-center gap-1 font-semibold hover:text-yellow-300">
                  {item.title}
                  <FaAngleDown className="ml-1" />
                </button>
                <ul className="absolute left-0 mt-2 bg-white text-black rounded-lg shadow-lg min-w-[200px] z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  {item.children.map((child, cIdx) => {
                    const active = location.pathname === child.to;
                    return (
                      <li key={cIdx}>
                        <Link
                          to={child.to}
                          className={`block px-4 py-2 hover:bg-yellow-100 transition ${
                            active ? "bg-yellow-300 font-bold" : ""
                          }`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </header>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Đổi mật khẩu"
        showConfirm
        onConfirm={handleChangePassword}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Mật khẩu cũ</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mật khẩu mới</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={message?.type === "error" ? "Lỗi" : "Thành công"}
      >
        <p className="text-base">{message?.text}</p>
      </Modal>
    </>
  );
}
import React, { useState, useEffect } from "react";
import api from "../Service/api_KyTucXac";
import RoleDashboard from "./RoleDashboard";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const LoginForm = () => {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [thongTin, setThongTin] = useState(null);
  const [loi, setLoi] = useState("");
  const [dangDangNhap, setDangDangNhap] = useState(false);

  // ✅ Load thông tin từ localStorage khi component được mount
  useEffect(() => {
    const storedThongTin = localStorage.getItem("thongTin");
    const storedVaiTro = localStorage.getItem("vaitro");

    if (storedThongTin && storedVaiTro) {
      setThongTin({
        vaitro: storedVaiTro,
        thongTin: JSON.parse(storedThongTin),
      });
    }
  }, []);

  // ✅ Hàm xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoi("");
    setDangDangNhap(true);
    try {
      const data = await api.login(tenDangNhap, matKhau);
      alert("Đăng nhập thành công!");

      // ✅ Lưu vào localStorage
      localStorage.setItem("vaitro", data.vaitro);
      localStorage.setItem("thongTin", JSON.stringify(data.thongTin));

      setThongTin(data);
    } catch (err) {
      setLoi("Tên đăng nhập hoặc mật khẩu không chính xác.");
    } finally {
      setDangDangNhap(false);
    }
  };

  // ✅ Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa vai trò và thông tin người dùng khỏi localStorage
    localStorage.removeItem("vaitro");
    localStorage.removeItem("thongTin");

    // Đặt lại trạng thái thongTin thành null để hiển thị giao diện đăng nhập
    setThongTin(null);
  };

  // ✅ Nếu đã đăng nhập thì hiển thị giao diện dashboard + nút đăng xuất
  if (thongTin) {
    return (
      <div>
        <RoleDashboard
          vaitro={thongTin.vaitro}
          thongTin={thongTin.thongTin}
        />
        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  // ✅ Giao diện đăng nhập
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-200 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 tracking-wide">
          Đăng nhập hệ thống Ký túc xá
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tên đăng nhập
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaUserAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Ví dụ: sv00123"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mật khẩu
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Nhập mật khẩu bảo mật"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition duration-300 flex items-center justify-center"
            disabled={dangDangNhap}
          >
            {dangDangNhap && <ImSpinner2 className="animate-spin mr-2" />}
            {dangDangNhap ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        {loi && <div className="text-red-600 mt-4 text-sm text-center">{loi}</div>}

        <p className="mt-6 text-center text-sm text-gray-500">
          📌 Liên hệ quản trị viên nếu bạn quên mật khẩu.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

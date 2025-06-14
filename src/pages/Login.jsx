// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useState } from "react";
import BackgroundSlideshow from "../components/BackgroundSlideshow";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Login({ setUser }) {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await login({ TenDangNhap: tenDangNhap, MatKhau: matKhau });

      if (data.message) {
        setMessage(data.message);
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi kết nối server");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white dark:text-black">
      <BackgroundSlideshow />
      <DarkModeToggle />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-lg space-y-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 flex items-center justify-center">
            <img src="src\assets\images\huit-logo.png" alt="HUIT Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="text-2xl font-bold">Đăng nhập bằng mã sinh viên</div>

        <div className="text-left">
          <label htmlFor="email" className="text-sm font-medium">
            MSSV
          </label>
          <input
            id="email"
            type="text"
            value={tenDangNhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            required
            className="mt-1 w-full rounded-md px-4 py-2 bg-transparent border border-white/40 dark:border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-left">
          <label htmlFor="password" className="text-sm font-medium">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
            className="mt-1 w-full rounded-md px-4 py-2 bg-transparent border border-white/40 dark:border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Duy trì đăng nhập
          </label>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-blue-300 hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

       

        {message && (
          <p
            className={`mt-2 ${
              message === "Đăng nhập thành công"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

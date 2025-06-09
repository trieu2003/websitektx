import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useState } from "react";

export default function Login({ setUser }) {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Thêm dòng này

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const data = await login({ TenDangNhap: tenDangNhap, MatKhau: matKhau });

    if (data.message) {
      // API trả về lỗi như "Invalid password"
      setMessage(data.message);
    } else {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500); // đợi một chút cho user thấy message thành công
    }
  } catch (error) {
    if (error.response?.data?.message) {
      setMessage(error.response.data.message);
    } else {
      setMessage("Lỗi kết nối server");
    }
  }

  setLoading(false);
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Đăng nhập</h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Tên đăng nhập
          </label>
          <input
            id="username"
            type="text"
            placeholder="Nhập tên đăng nhập"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={tenDangNhap}
            onChange={e => setTenDangNhap(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={matKhau}
            onChange={e => setMatKhau(e.target.value)}
            required
          />
        </div>
        <p className="text-sm text-right">
            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Quên mật khẩu?
            </button>
          </p>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } transition`}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

       {message && (
  <p
    className={`mt-4 text-center ${
      message === "Đăng nhập thành công" ? "text-green-600" : "text-red-600"
    } font-medium`}
  >
    {message}
  </p>
)}

      </form>
    </div>
  );
}

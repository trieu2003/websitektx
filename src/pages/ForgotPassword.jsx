import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      await axios.post("https://localhost:5181/api/Auth/request-otp", {
        tenDangNhap,
      });
      setStep(2);
    } catch (error) {
      setMessage("Không thể gửi OTP. Vui lòng kiểm tra lại.");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("https://localhost:5181/api/Auth/verify-otp", {
        tenDangNhap,
        otp,
        newPassword,
      });
      setMessage("Đặt lại mật khẩu thành công. Chuyển hướng...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Xác minh OTP thất bại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {step === 1 ? "Quên mật khẩu" : "Xác minh OTP"}
        </h2>

        {step === 1 && (
          <>
            <label className="block">
              Tên đăng nhập:
              <input
                className="w-full mt-1 p-2 border rounded-md"
                type="text"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                required
              />
            </label>
            <button
              onClick={requestOtp}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Gửi mã OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block">
              Mã OTP:
              <input
                className="w-full mt-1 p-2 border rounded-md"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>

            <label className="block">
              Mật khẩu mới:
              <input
                className="w-full mt-1 p-2 border rounded-md"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>

            <button
              onClick={verifyOtp}
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Đặt lại mật khẩu
            </button>
          </>
        )}

        {message && <p className="text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

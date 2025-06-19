import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundSlideshow from "../components/BackgroundSlideshow";


export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const requestOtp = async () => {
    if (!tenDangNhap.trim()) {
      setMessage("Vui lòng nhập tên đăng nhập.");
      return;
    }
    try {
      await axios.post("https://localhost:5181/api/Auth/request-otp", {
        tenDangNhap,
      });
      setStep(2);
      setMessage("Mã OTP đã được gửi.");
    } catch (error) {
      setMessage("Không thể gửi OTP. Vui lòng kiểm tra lại.");
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setMessage("Mã OTP phải gồm 6 chữ số.");
      return;
    }

    try {
      const res = await axios.post("https://localhost:5181/api/Auth/verify-otp", {
        tenDangNhap,
        otp,
      });

      if (res.data.success !== false) {
        setStep(3);
        setMessage("");
      } else {
        setMessage("Mã OTP không hợp lệ.");
      }
    } catch (error) {
      setMessage("Xác minh OTP thất bại.");
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) {
      setMessage(
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ, số, 1 chữ in hoa và 1 ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      await axios.post("https://localhost:5181/api/Auth/verify-otp", {
        tenDangNhap,
        otp,
        newPassword,
      });
      setMessage("Đặt lại mật khẩu thành công. Chuyển hướng...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Không thể đặt lại mật khẩu.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white dark:text-black">
      <BackgroundSlideshow />

      <div className="relative z-10 w-full max-w-md bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-lg space-y-6 text-center">
        <h2 className="text-2xl font-bold">
          {step === 1
            ? "Quên mật khẩu"
            : step === 2
            ? "Nhập mã OTP"
            : "Đặt lại mật khẩu"}
        </h2>

        {step === 1 && (
          <>
            <label htmlFor="username" className="block text-left text-sm font-medium">
              Tên đăng nhập
            </label>
            <input
              id="username"
              className="w-full mt-1 p-2 rounded-md bg-transparent border border-white/40 dark:border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              onBlur={requestOtp}
              required
            />
          </>
        )}

        {step === 2 && (
  <>
    <label className="block text-left text-sm font-medium">
      Nhập mã OTP (6 chữ số)
    </label>
    <div className="flex justify-between gap-2 mt-2">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-10 h-12 text-center text-black text-xl rounded-md bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={otp[index] || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/, "");
              if (!val) return;
              const newOtp = otp.split("");
              newOtp[index] = val;
              setOtp(newOtp.join(""));
              // Move focus
              if (e.target.nextSibling) {
                e.target.nextSibling.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                const newOtp = otp.split("");
                newOtp[index] = "";
                setOtp(newOtp.join(""));
                if (e.target.previousSibling) {
                  e.target.previousSibling.focus();
                }
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasteData = e.clipboardData
                .getData("text")
                .slice(0, 6)
                .replace(/\D/g, "")
                .split("");
              if (pasteData.length === 6) {
                setOtp(pasteData.join(""));
              }
            }}
          />
        ))}
    </div>

    <button
      onClick={verifyOtp}
      className="w-full mt-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition text-white"
    >
      Xác minh OTP
    </button>
  </>
)}

        {step === 3 && (
          <>
            <label className="block text-left text-sm font-medium">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-md bg-transparent border border-white/40 dark:border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block text-left text-sm font-medium mt-4">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded-md bg-transparent border border-white/40 dark:border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Đặt lại mật khẩu
            </button>
          </>
        )}

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.includes("thành công") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          className="text-blue-300 hover:underline text-sm mt-2"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}

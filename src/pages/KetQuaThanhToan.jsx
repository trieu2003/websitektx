import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function KetQuaThanhToan() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get("status");          // PAID hoặc CANCELLED
  const maPhieuThu = queryParams.get("maPhieuThu");   // Dùng làm mã phiếu thu
  const code = queryParams.get("code");
  const transactionId = queryParams.get("id");

  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (status === "PAID" && maPhieuThu) {
        setLoading(true);
        try {
          const response = await fetch("https://localhost:5181/api/PhieuThu/xac-nhan-thanh-toan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(parseInt(maPhieuThu))  // Gửi mã phiếu thu kiểu số
          });

          const data = await response.json();
          if (response.ok) {
            setUpdateStatus("✅ " + data.message);
          } else {
            setUpdateStatus("❌ " + (data.message || "Cập nhật thất bại."));
          }
        } catch (err) {
          console.error("Lỗi khi gọi API xác nhận thanh toán:", err);
          setUpdateStatus("❌ Đã xảy ra lỗi trong quá trình xác nhận thanh toán.");
        } finally {
          setLoading(false);
        }
      }
    };

    confirmPayment();
  }, [status, maPhieuThu]);

  const isPaid = status === "PAID";

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h1 style={{ color: isPaid ? "green" : "red", marginBottom: "20px" }}>
          {isPaid ? "🎉 Thanh toán thành công!" : "❌ Thanh toán bị hủy!"}
        </h1>

        <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <p><strong>Mã giao dịch:</strong> {transactionId || "Không có"}</p>
          <p><strong>Mã phiếu thu:</strong> {maPhieuThu || "Không có"}</p>
          <p><strong>Trạng thái thanh toán:</strong> {status || "Không xác định"}</p>
          <p><strong>Mã trả về:</strong> {code || "Không có"}</p>
        </div>

        <hr style={{ margin: "20px 0" }} />

        {isPaid && (
          <p style={{ fontWeight: "bold", color: updateStatus.startsWith("✅") ? "green" : "red" }}>
            {loading ? "⏳ Đang cập nhật trạng thái phiếu thu..." : updateStatus}
          </p>
        )}
      </div>
    </div>
  );
}

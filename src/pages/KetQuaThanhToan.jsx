// import React from "react";
// import { useLocation } from "react-router-dom";

// export default function KetQuaThanhToan() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const status = queryParams.get("status");
//   const orderCode = queryParams.get("orderCode");
//   const code = queryParams.get("code");
//   const transactionId = queryParams.get("id");

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h1 style={{ color: "green" }}>🎉 Thanh toán thành công!</h1>
//       <p><strong>Mã giao dịch:</strong> {transactionId}</p>
//       <p><strong>Mã đơn hàng:</strong> {orderCode}</p>
//       <p><strong>Trạng thái:</strong> {status}</p>
//       <p><strong>Mã trả về:</strong> {code}</p>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function KetQuaThanhToan() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get("status");          // PAID hoặc CANCELLED
  const orderCode = queryParams.get("orderCode");    // Mã đơn hàng
  const code = queryParams.get("code");
  const transactionId = queryParams.get("id");

  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    // Gửi yêu cầu cập nhật trạng thái cho backend
    if (orderCode && status) {
      fetch(`http://localhost:5000/api/phieuthu/cap-nhat/${orderCode}?status=${status}`, {
        method: "PUT"
      })
        .then((res) => res.json())
        .then((data) => {
          setUpdateStatus("✅ Trạng thái phiếu thu đã được cập nhật!");
        })
        .catch((err) => {
          console.error("Lỗi cập nhật:", err);
          setUpdateStatus("❌ Lỗi cập nhật trạng thái!");
        });
    }
  }, [orderCode, status]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      {status === "PAID" ? (
        <h1 style={{ color: "green" }}>🎉 Thanh toán thành công!</h1>
      ) : (
        <h1 style={{ color: "red" }}>❌ Thanh toán bị hủy!</h1>
      )}
      <p><strong>Mã giao dịch:</strong> {transactionId}</p>
      <p><strong>Mã đơn hàng:</strong> {orderCode}</p>
      <p><strong>Trạng thái thanh toán:</strong> {status}</p>
      <p><strong>Mã trả về:</strong> {code}</p>

      <hr />
      <p>{updateStatus}</p>
    </div>
  );
}

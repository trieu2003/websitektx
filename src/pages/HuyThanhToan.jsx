import React from "react";
import { useLocation } from "react-router-dom";

export default function HuyThanhToan() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get("status");
  const orderCode = queryParams.get("orderCode");

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "red" }}>❌ Bạn đã hủy thanh toán</h1>
      <p><strong>Mã đơn hàng:</strong> {orderCode}</p>
      <p><strong>Trạng thái:</strong> {status}</p>
      <p>Vui lòng quay lại để thực hiện lại quá trình thanh toán.</p>
    </div>
  );
}

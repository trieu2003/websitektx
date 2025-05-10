import React from "react";
import SinhVienInfo from "./SinhVienInfo";
import InfoTable from "./InfoTable";
import { sinhVienFields, nhanVienFields, adminFields } from "./utils";

const RoleDashboard = ({ vaitro, thongTin }) => {
  switch (vaitro) {
    case "Sinh viên":
      return <SinhVienInfo thongTin={thongTin} />;
    case "Nhân viên":
      return <InfoTable title="Thông tin Nhân viên" data={nhanVienFields(thongTin)} />;
    case "Admin":
      return <InfoTable title="Thông tin Quản trị viên" data={adminFields(thongTin)} />;
    default:
      return (
        <div className="text-red-600 text-center mt-6 font-semibold text-lg">
          Vai trò không xác định
        </div>
      );
  }
};

export default RoleDashboard;

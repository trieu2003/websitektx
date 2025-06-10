import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

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
      { title: "Hóa đơn", to: "/sinhvien/hoadon" },
      { title: "Thanh toán", to: "/sinhvien/thanhtoan" },
    ],
  },
  {
    title: "Tiện ích",
    children: [
      { title: "Gửi yêu cầu sửa chữa", to: "/sinhvien/suachua" },
      { title: "Đặt chỗ trước", to: "/sinhvien/datcho" },
      { title: "Tra cứu thông tin", to: "/sinhvien/tracuu" },
    ],
  },
];

export default function Header({ user }) {
  const location = useLocation();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <img
          src="src/assets/images/sv_logo_navbarhome.png"
          alt="Ký túc xá Logo"
          className="h-12 w-auto"
        />
        <h1 className="text-lg font-bold text-center flex-1">
          ỨNG DỤNG QUẢN LÝ KÝ TÚC XÁ <br />
          TRƯỜNG ĐẠI HỌC CÔNG THƯƠNG TP HỒ CHÍ MINH
        </h1>
        <div className="w-48 flex justify-end">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={`/uploads/${user.anhDaiDien}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm">Xin chào, {user.hoTen}</span>
            </div>
          ) : (
            <span className="text-sm">Vui lòng đăng nhập</span>
          )}
        </div>
      </div>

      {user && (
        <nav className="flex space-x-6">
          {sidebarMenu.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
            >
              <button
                className="flex items-center gap-1 font-semibold hover:text-yellow-300"
              >
                {item.title}
                <FaAngleDown className="ml-1" />
              </button>

              <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg min-w-[200px] z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
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
  );
}

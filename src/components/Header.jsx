import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa";

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
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  const toggleMenu = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

 // ... phần trên giữ nguyên

return (
  <header className="bg-blue-600 text-white p-4">
    <div className="flex items-center justify-between mb-3">
   
        <img 
          src="src\assets\images\sv_logo_navbarhome.png" 
          alt="Ký túc xá Logo" 
          className="h-12 w-auto"
        />
      <h1 className="text-xl font-bold">Ứng dụng Ký túc xá</h1>
      {user ? (
        <div className="flex items-center gap-3">
          <img
            src={`/uploads/${user.anhDaiDien}`}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>Xin chào, {user.hoTen}</span>
        </div>
      ) : (
        <span>Vui lòng đăng nhập</span>
      )}
    </div>

    {/* Chỉ hiện menu khi đã đăng nhập */}
    {user && (
      <nav className="flex space-x-6">
        {sidebarMenu.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="relative">
              <button
                onClick={() => toggleMenu(idx)}
                className="flex items-center gap-1 font-semibold hover:text-yellow-300 focus:outline-none"
              >
                {item.title}
                {isOpen ? (
                  <FaAngleDown className="inline-block" />
                ) : (
                  <FaAngleLeft className="inline-block" />
                )}
              </button>

              {isOpen && (
                <ul className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg min-w-[180px] z-10">
                  {item.children.map((child, cIdx) => {
                    const active = location.pathname === child.to;
                    return (
                      <li key={cIdx}>
                        <Link
                          to={child.to}
                          className={`block px-4 py-2 hover:bg-yellow-100 ${
                            active ? "bg-yellow-300 font-bold" : ""
                          }`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    )}
  </header>
);

}

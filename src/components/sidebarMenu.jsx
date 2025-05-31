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
      { title: "TThanh toán", to: "/sinhvien/thanhtoan" },
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

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  const toggleMenu = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-full">
      <nav className="p-4">
        {sidebarMenu.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="mb-4">
              <button
                onClick={() => toggleMenu(idx)}
                className="flex justify-between items-center w-full font-semibold text-gray-700 hover:text-yellow-500 focus:outline-none"
              >
                <span>{item.title}</span>
                {isOpen ? (
                  <FaAngleDown className="text-sm" />
                ) : (
                  <FaAngleLeft className="text-sm" />
                )}
              </button>

              {isOpen && (
                <ul className="mt-2 pl-4 space-y-1">
                  {item.children.map((child, cIdx) => {
                    const active = location.pathname === child.to;
                    return (
                      <li key={cIdx}>
                        <Link
                          to={child.to}
                          className={`block px-2 py-1 rounded hover:bg-yellow-100 ${
                            active ? "bg-yellow-300 font-bold" : "text-gray-600"
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
    </aside>
  );
}

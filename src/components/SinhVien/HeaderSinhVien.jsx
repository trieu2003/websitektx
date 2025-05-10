import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const menu = [
  {
    title: "Nội trú",
    children: [
      { title: "Đăng ký nội trú", href: "/sinhvien/noitru" },
      { title: "Gia hạn đăng ký", href: "/sinhvien/giahan" },
    ],
  },
  {
    title: "Phòng ở",
    children: [
      { title: "Nhận phòng", href: "/sinhvien/nhanphong" },
      { title: "Trả phòng", href: "/sinhvien/traphong" },
    ],
  },
  {
    title: "Thanh toán",
    children: [
      { title: "Hóa đơn & thanh toán", href: "/sinhvien/thanhtoan" },
    ],
  },
  {
    title: "Tiện ích",
    children: [
      { title: "Gửi yêu cầu sửa chữa", href: "/sinhvien/suachua" },
      { title: "Đặt chỗ trước", href: "/sinhvien/datcho" },
      { title: "Tra cứu thông tin", href: "/sinhvien/tracuu" },
    ],
  },
];

const HeaderSinhVien = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎓 Ký túc xá</h1>
        <nav ref={menuRef}>
          <ul className="flex space-x-6">
            {menu.map((item, idx) => (
              <li key={idx} className="relative">
                <button
                  onClick={() => toggleMenu(idx)}
                  className="flex items-center space-x-1 hover:text-yellow-300 font-medium focus:outline-none"
                >
                  <span>{item.title}</span>
                  <FaAngleDown className="text-sm mt-1" />
                </button>
                {openIndex === idx && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                    {item.children.map((child, cIdx) => (
                      <li key={cIdx}>
                        <a
                          href={child.href}
                          className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-xl font-semibold transition">
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSinhVien;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const menu = [
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
      { title: "Hóa đơn & thanh toán", to: "/sinhvien/thanhtoan" },
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

const HeaderSinhVien = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const menuRef = useRef(null);

  const handleMouseEnter = (idx) => {
    setOpenIndex(idx);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
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
    <header className="bg-white text-black shadow-md">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">KÝ TÚC XÁ HUIT</div>
        <div className="flex justify-center flex-1">
          <img
            src="src/assets/images/sv_logo_navbarhome.png"
            alt="Ký túc xá Logo"
            className="h-20 w-auto"
          />
        </div>
        <nav ref={menuRef}>
          <ul className="flex space-x-6">
            {menu.map((item, idx) => (
              <li
                key={idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center space-x-1 hover:text-yellow-300 font-medium focus:outline-none transition-colors duration-300"
                >
                  <span>{item.title}</span>
                  <FaAngleDown
                    className={`text-sm mt-1 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                    className={`absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 transform transition-all duration-300 ease-in-out origin-top ${
                      openIndex === idx
                        ? "opacity-100 scale-100 visible translate-y-0"
                        : "opacity-0 scale-95 invisible -translate-y-2"
                    }`}
                  >
                  {item.children.map((child, cIdx) => (
                    <li
                        key={cIdx}
                        className={`transition-all duration-300 ease-out ${
                          openIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        }`}
                        style={{
                          transitionDelay: `${cIdx * 60}ms`,
                        }}
                      >
                        <Link
                          to={child.to}
                          className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200"
                          onClick={() => setOpenIndex(null)}
                        >
                          {child.title}
                        </Link>
                      </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-xl font-semibold transition-colors duration-300">
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSinhVien;
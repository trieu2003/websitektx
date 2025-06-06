import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, showConfirm = false, onConfirm }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [animationState, setAnimationState] = useState("hidden");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        setAnimationState("fade-in");
      });
    } else {
      setAnimationState("fade-out");
      setTimeout(() => setIsVisible(false), 300); // delay to match animation
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
        animationState === "fade-in" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 transform transition-all duration-300 ease-in-out ${
          animationState === "fade-in"
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="mb-4 max-h-[60vh] overflow-auto">{children}</div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Đóng
          </button>
          {showConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

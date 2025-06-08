import React, { useState, useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showConfirm = false,
  onConfirm,
}) => {
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
      setTimeout(() => setIsVisible(false), 250);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
        animationState === "fade-in" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 mx-4 sm:mx-6 w-full max-w-3xl transition-all duration-300 transform ${
          animationState === "fade-in"
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
        style={{ maxHeight: "90vh", overflow: "hidden" }}
      >
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {children}
        </div>

        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition font-medium"
          >
            Đóng
          </button>
          {showConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium"
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

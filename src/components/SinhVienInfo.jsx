import React from "react";
import { sinhVienFields } from "./utils";
import HeaderSinhVien from "./SinhVien/HeaderSinhVien";

const SinhVienInfo = ({ thongTin }) => {
  return (
    <div>
    <div className="max-w-6xl ml-20 mx-auto mt-10 p-8 bg-white shadow-2xl rounded-3xl">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-orange-400">
            <img
              src={`src/assets/imagessinhvien/${thongTin.anhDaiDien}`}
              alt="Ảnh đại diện"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-xl md:text-2xl font-bold text-orange-700 text-center md:text-left">
            {thongTin.hoTen || "Tên sinh viên"}
          </h1>
          <span className="text-sm text-gray-500">Sinh viên</span>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-orange-300 pb-2">
            Thông tin chi tiết
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {sinhVienFields(thongTin).map((item, idx) => (
              <div key={idx}>
                <label className="text-sm text-gray-500 font-medium">{item.label}</label>
                <div className="text-base text-gray-800 font-semibold mt-1">
                  {item.value || "—"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {thongTin.trangThai && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full shadow-sm">
                Trạng thái: {thongTin.trangThai}
              </span>
            )}
            {thongTin.lop && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full shadow-sm">
                Lớp: {thongTin.lop}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SinhVienInfo;

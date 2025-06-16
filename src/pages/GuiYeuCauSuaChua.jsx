import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function GuiYeuCauSuaChua() {
  const [maSV, setMaSV] = useState("");
  const [moTa, setMoTa] = useState("");
  const [chiTietSuaChua, setChiTietSuaChua] = useState([{ maThietBi: "", moTaLoi: "" }]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsYeuCau, setDsYeuCau] = useState([]);
  const [dsThietBi, setDsThietBi] = useState([]);
  const [pendingCancelId, setPendingCancelId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const ma = user?.maSV || user?.MaSV || "";
    setMaSV(ma);

    if (ma) {
      fetchDsYeuCau(ma);
      fetchDsThietBi(ma);
    }
  }, []);

  const fetchDsThietBi = async (ma) => {
    try {
      const res = await axios.get(`https://localhost:5181/api/TrangThietBi/thietbi-phong-sinhvien/${ma}`);
      setDsThietBi(res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách thiết bị:", err);
    }
  };

  const fetchDsYeuCau = async (ma) => {
    try {
      const res = await axios.get(`https://localhost:5181/api/YeuCauSuaChua/list/${ma}`);
      setDsYeuCau(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách yêu cầu:", err);
    }
  };

  const handleCancelRequest = async (maYCSC) => {
    try {
      const res = await axios.post(`https://localhost:5181/api/YeuCauSuaChua/cancel`, {
        maSV,
        maYCSC,
      });

      const { success, message } = res.data;
      setMessage(message);
      setIsSuccess(success);

      if (success) {
        // Huỷ thành công: đóng modal sau 1s và reset
        fetchDsYeuCau(maSV);
        setTimeout(() => {
          handleCloseModal(); // Đóng modal và reset pendingCancelId
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Không thể hủy yêu cầu.");
      setIsSuccess(false);
    }
  };

  const handleChangeChiTiet = (index, field, value) => {
    const updated = [...chiTietSuaChua];
    updated[index][field] = value;
    setChiTietSuaChua(updated);
  };

  const addChiTiet = () => {
    setChiTietSuaChua([...chiTietSuaChua, { maThietBi: "", moTaLoi: "" }]);
  };

  const removeChiTiet = (index) => {
    const updated = [...chiTietSuaChua];
    updated.splice(index, 1);
    setChiTietSuaChua(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!maSV || chiTietSuaChua.length === 0 || chiTietSuaChua.some(item => !item.maThietBi || !item.moTaLoi)) {
      setMessage("Vui lòng nhập đầy đủ mã sinh viên, mã thiết bị và mô tả lỗi.");
      setIsSuccess(false);
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    const payload = { maSV, moTa, chiTietSuaChua };

    try {
      const res = await axios.post(`https://localhost:5181/api/YeuCauSuaChua/submit`, payload);
      setMessage(res.data.message);
      setIsSuccess(res.data.message.includes("thành công"));
      setIsModalOpen(true);
      setMoTa("");
      setChiTietSuaChua([{ maThietBi: "", moTaLoi: "" }]);
      fetchDsYeuCau(maSV);
    } catch (err) {
      setMessage(err.response?.data?.message || "Đã xảy ra lỗi.");
      setIsSuccess(false);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setPendingCancelId(null);
    setIsSuccess(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form gửi yêu cầu */}
        <div className="bg-gray-200 p-6 shadow rounded">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Gửi Yêu Cầu Sửa Chữa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Mã sinh viên *</label>
              <input
                type="text"
                className="w-full border p-2 rounded bg-gray-100"
                value={maSV}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Mô tả chung (tuỳ chọn)</label>
              <textarea
                className="w-full border p-2 rounded"
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                placeholder="Nhập mô tả chung về sự cố..."
              />
            </div>

            <div className="space-y-3">
              <label className="block font-medium">Chi tiết thiết bị cần sửa *</label>
              {chiTietSuaChua.map((item, index) => (
                <div key={index} className="border p-3 rounded bg-gray-50 space-y-2 relative">
                  <div>
                    <label className="block text-sm mb-1">Mã thiết bị *</label>
                    <select
                      className="w-full border p-2 rounded"
                      value={item.maThietBi}
                      onChange={(e) => handleChangeChiTiet(index, "maThietBi", e.target.value)}
                      required
                    >
                      <option value="">-- Chọn thiết bị --</option>
                      {dsThietBi.map((tb) => (
                        <option key={tb.maThietBi} value={tb.maThietBi}>
                          {tb.tenThietBi} ({tb.maThietBi})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Mô tả lỗi *</label>
                    <textarea
                      className="w-full border p-2 rounded"
                      value={item.moTaLoi}
                      onChange={(e) =>
                        handleChangeChiTiet(index, "moTaLoi", e.target.value)
                      }
                      required
                    />
                  </div>
                  {chiTietSuaChua.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChiTiet(index)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addChiTiet}
                className="text-blue-600 hover:underline"
              >
                + Thêm thiết bị
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded ${
                loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </form>
        </div>

        {/* Danh sách yêu cầu sử dụng bảng */}
        <div className="max-h-[600px] overflow-y-auto bg-gray-200 p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Yêu cầu đã gửi</h3>
          {dsYeuCau.length > 0 ? (
            <div className="overflow-x-auto rounded-md shadow-md border border-gray-300">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Mã yêu cầu</th>
                    <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Ngày gửi</th>
                    <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Trạng thái</th>
                    <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dsYeuCau.map((yc) => (
                    <tr key={yc.maYCSC}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">#{yc.maYCSC}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{new Date(yc.ngayGui).toLocaleDateString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{yc.trangThai}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => {
                            setPendingCancelId(yc.maYCSC);
                            setIsModalOpen(true);
                            setMessage("Bạn có chắc muốn hủy yêu cầu này?");
                            setIsSuccess(null);
                          }}
                          disabled={yc.trangThai === "Đã hủy"}
                          className={`px-3 py-1 rounded text-white ${
                            yc.trangThai === "Đã hủy"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {yc.trangThai === "Đã hủy" ? "Đã hủy" : "Hủy"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Bạn chưa gửi yêu cầu nào.</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          pendingCancelId !== null
            ? "Xác nhận hủy"
            : isSuccess
            ? "Thành công"
            : "Lỗi"
        }
        showConfirm={pendingCancelId !== null}
        onConfirm={() => {
          if (pendingCancelId !== null) {
            handleCancelRequest(pendingCancelId);
          }
        }}
      >
        <p
          className={`${
            pendingCancelId !== null
              ? "text-gray-700"
              : isSuccess
              ? "text-green-600"
              : "text-red-500 shake"
          }`}
        >
          {message}
        </p>
      </Modal>
    </div>
  );
}

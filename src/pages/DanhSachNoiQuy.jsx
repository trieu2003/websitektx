import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DanhSachNoiQuy() {
  const [noiQuyList, setNoiQuyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [groupedRules, setGroupedRules] = useState({});

  const fetchNoiQuy = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://localhost:5181/api/NoiQuy/search", {
        params: { keyword: keyword.trim() }
      });
      if (res.data?.status === "success") {
        setNoiQuyList(res.data.data || []);
      } else {
        toast.error("Không thể lấy dữ liệu nội quy.");
      }
    } catch (err) {
      toast.error("Lỗi khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoiQuy();
  }, []);

  useEffect(() => {
    // Phân nhóm theo từ khóa chính
    const groups = {
      "Vệ sinh": [],
      "Giờ giấc": [],
      "An ninh": [],
      "Khác": []
    };

    noiQuyList.forEach(item => {
      const nd = item.noiDung.toLowerCase();
      if (nd.includes("vệ sinh")) groups["Vệ sinh"].push(item);
      else if (nd.includes("giờ") || nd.includes("giấc")) groups["Giờ giấc"].push(item);
      else if (nd.includes("an ninh") || nd.includes("bảo vệ")) groups["An ninh"].push(item);
      else groups["Khác"].push(item);
    });

    setGroupedRules(groups);
  }, [noiQuyList]);

  const handleSearch = () => {
    fetchNoiQuy();
  };

  const handleClear = () => {
    setKeyword("");
    fetchNoiQuy();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Danh sách nội quy</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Tìm theo nội dung..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={handleSearch} className="bg-indigo-600 text-white px-4 py-2 rounded">Tìm</button>
        <button onClick={handleClear} className="text-indigo-600 underline">Xóa lọc</button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">⏳ Đang tải nội quy...</div>
      ) : (
        Object.entries(groupedRules).map(([groupName, items]) => (
          <div key={groupName} className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{groupName} ({items.length})</h3>
            <ul className="divide-y bg-white border rounded shadow">
              {items.length === 0 ? (
                <li className="p-4 text-gray-500">Không có nội quy nào.</li>
              ) : (
                items.map((item, index) => (
                  <li key={item.maNoiQuy} className="p-4 hover:bg-gray-50">
                    <span className="font-semibold text-indigo-500">#{item.maNoiQuy}</span>: {item.noiDung}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

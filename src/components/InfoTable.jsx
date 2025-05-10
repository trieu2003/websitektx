import React from "react";

const InfoTable = ({ title, data }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 border-b border-orange-400 pb-2">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-md">
          <thead className="bg-orange-50 text-orange-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">STT</th>
              <th className="px-4 py-3 border">Thông tin</th>
              <th className="px-4 py-3 border">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{row.label}</td>
                <td className="px-4 py-2 border">{row.value || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoTable;

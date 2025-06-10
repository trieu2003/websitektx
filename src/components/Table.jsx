import React from "react";
import "/src/assets/style/Table.css"; // Nếu cần giữ style riêng, vẫn có thể để lại

const Table = ({ columns, data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`hover:bg-blue-50 transition-colors duration-200 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((column, colIndex) => {
                const rawValue = row[column.field];
                let displayValue = rawValue;

                // Tự động format ngày nếu là kiểu date
                if (
                  rawValue &&
                  column.isDate &&
                  !isNaN(Date.parse(rawValue))
                ) {
                  displayValue = new Date(rawValue).toLocaleDateString("vi-VN");
                }

                return (
                  <td
                    key={colIndex}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                  >
                    {displayValue ?? ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

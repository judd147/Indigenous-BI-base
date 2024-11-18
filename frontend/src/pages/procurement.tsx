import React from "react";

const ProcurementPage = () => {
  const data = [
    { vendor: "GENOME QUEBEC", date: "2023-01-18", description: "Scientific services", value: "$40,137.60" },
    { vendor: "HARTLAND AGROMART LTD", date: "2023-03-13", description: "Salt, sulphur, ores", value: "$13,000.00" },
  ];

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold mb-4">Procurement Page</h1>

      {/* 筛选输入框 */}
      <input
        type="text"
        placeholder="Filter vendors or descriptions..."
        className="w-full p-2 mb-4 border rounded"
      />

      {/* 数据表格 */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Vendor</th>
            <th className="border border-gray-300 p-2 text-left">Date</th>
            <th className="border border-gray-300 p-2 text-left">Description</th>
            <th className="border border-gray-300 p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.vendor}</td>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">{item.description}</td>
              <td className="border border-gray-300 p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementPage;
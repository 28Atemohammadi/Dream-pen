import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
}

interface LogItem {
  timestamp: string;
  action: string;
  product?: Product;
}

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogs = JSON.parse(
      localStorage.getItem("actionLogs") || "[]"
    ) as LogItem[];
    setLogs(storedLogs);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#7cb1a3ff]">Admin Logs</h2>
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded bg-teal-700 text-white hover:bg-teal-800"
        >
          Back to Admin
        </button>
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500 text-center">No logs recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#7cb1a3ff] text-white">
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Product Title</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 font-medium text-teal-700">
                    {log.action}
                  </td>
                  <td className="px-4 py-2">
                    {log.product?.id || "-"}
                  </td>
                  <td className="px-4 py-2">
                    {log.product?.title || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLogs;

import React, { useState } from "react";

export default function CommissionTracker() {
  const [view, setView] = useState("daily");
  const [commissions, setCommissions] = useState([
    { name: "John Doe", date: "2024-11-11", amount: 500 },
    { name: "Jane Smith", date: "2024-11-11", amount: 300 },
    { name: "Alice Johnson", date: "2024-11-10", amount: 200 },
    { name: "Mark Evans", date: "2024-10-11", amount: 600 },
  ]);

  const toggleView = (type) => setView(type);

  const filteredCommissions = commissions.filter((commission) => {
    const today = new Date();
    const commissionDate = new Date(commission.date);
    if (view === "daily") {
      return today.toISOString().slice(0, 10) === commission.date;
    } else if (view === "monthly") {
      return (
        today.getMonth() === commissionDate.getMonth() &&
        today.getFullYear() === commissionDate.getFullYear()
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Commission Tracker
        </h2>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-lg mx-2 font-medium ${
              view === "daily"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleView("daily")}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 rounded-lg mx-2 font-medium ${
              view === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleView("monthly")}
          >
            Monthly
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommissions.map((commission, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{commission.name}</td>
                  <td className="py-3 px-4">
                    {new Date(commission.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    ${commission.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center font-medium text-gray-600">
          Showing {view} commissions
        </div>
      </div>
    </div>
  );
}

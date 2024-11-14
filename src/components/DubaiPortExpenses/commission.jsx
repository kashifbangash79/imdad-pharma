import React, { useState } from "react";

export default function CommissionTracker() {
  const [view, setView] = useState("daily");
  const [commissions, setCommissions] = useState([
    { name: "Ali Khan", date: "2024-11-11", amount: 700 },
    { name: "Sara Ahmed", date: "2024-11-11", amount: 450 },
    { name: "Usman Iqbal", date: "2024-11-10", amount: 350 },
    { name: "Ayesha Farooq", date: "2024-10-11", amount: 550 },
  ]);

  const [newCommission, setNewCommission] = useState({
    name: "",
    date: "",
    amount: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommission((prev) => ({ ...prev, [name]: value }));
  };

  const addCommission = () => {
    if (newCommission.name && newCommission.date && newCommission.amount) {
      setCommissions((prev) => [...prev, newCommission]);
      setNewCommission({ name: "", date: "", amount: "" });
    }
  };

  const monthlyTotal = filteredCommissions.reduce((total, commission) => {
    return total + (view === "monthly" ? commission.amount : 0);
  }, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
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

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCommission.name}
            onChange={handleInputChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="date"
            name="date"
            value={newCommission.date}
            onChange={handleInputChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newCommission.amount}
            onChange={handleInputChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={addCommission}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Commission
          </button>
        </div>

        {/* Table Section */}
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
                    Rs{commission.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Total */}
        {view === "monthly" && (
          <div className="mt-4 text-center font-medium text-gray-700">
            Monthly Total Commission: <span className="text-green-600">${monthlyTotal}</span>
          </div>
        )}
        <div className="mt-4 text-center font-medium text-gray-600">
          Showing {view} commissions
        </div>
      </div>
    </div>
  );
}

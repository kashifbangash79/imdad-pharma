import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgentPayment({ onSubmit }) {
  const [shipmentDetails, setShipmentDetails] = useState({
    shipmentNumber: "",
    arrivalDate: "",
    agentName: "",
    paymentAmount: "",
    paymentDate: "",
    paymentStatus: "Pending",
  });

  const [history, setHistory] = useState([]);
  const [deletedHistory, setDeletedHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agent-payments');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentDetails({ ...shipmentDetails, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(shipmentDetails); // Call the parent component's onSubmit function with the details
    }

    if (editingIndex !== null) {
      // Update existing entry
      try {
        const response = await axios.put(`http://localhost:5000/update/${history[editingIndex]._id}`, shipmentDetails);
        const updatedHistory = [...history];
        updatedHistory[editingIndex] = response.data;
        setHistory(updatedHistory);
        setEditingIndex(null);
      } catch (error) {
        console.error('Error updating payment details:', error);
      }
    } else {
      // Add new entry
      try {
        const response = await axios.post('http://localhost:5000/api/agent-payments/save', shipmentDetails);
        setHistory([...history, response.data]);
      } catch (error) {
        console.error('Error submitting payment details:', error);
      }
    }

    // Clear form after submission
    setShipmentDetails({
      shipmentNumber: "",
      arrivalDate: "",
      agentName: "",
      paymentAmount: "",
      paymentDate: "",
      paymentStatus: "Pending",
    });
  };

  const handleEdit = (index) => {
    setShipmentDetails(history[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newHistory = [...history];
    const [deletedEntry] = newHistory.splice(index, 1);
    setDeletedHistory([...deletedHistory, deletedEntry]);
    setHistory(newHistory);
  };

  const handleRecover = (index) => {
    const newDeletedHistory = [...deletedHistory];
    const [recoveredEntry] = newDeletedHistory.splice(index, 1);
    setHistory([...history, recoveredEntry]);
    setDeletedHistory(newDeletedHistory);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const filteredHistory = history.filter((entry) =>
    entry.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.arrivalDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.paymentAmount.toString().includes(searchQuery.toLowerCase()) ||
    entry.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Clearing Agent Payment Details
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter the details of the clearing agent payment for the shipment from
          Dubai to Karachi.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                htmlFor="shipmentNumber"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Shipment Number:
              </label>
              <input
                id="shipmentNumber"
                name="shipmentNumber"
                type="text"
                value={shipmentDetails.shipmentNumber}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="arrivalDate"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Arrival Date:
              </label>
              <input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                value={shipmentDetails.arrivalDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="agentName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Clearing Agent Name:
              </label>
              <input
                id="agentName"
                name="agentName"
                type="text"
                value={shipmentDetails.agentName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentAmount"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Amount (PKR):
              </label>
              <input
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                value={shipmentDetails.paymentAmount}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentDate"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Date:
              </label>
              <input
                id="paymentDate"
                name="paymentDate"
                type="date"
                value={shipmentDetails.paymentDate}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentStatus"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Payment Status:
              </label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                value={shipmentDetails.paymentStatus}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-4 px-6 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {editingIndex !== null ? 'Update Payment' : 'Submit Payment'}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Payment History
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search payment history"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          onClick={toggleHistory}
          className="py-4 px-6 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        {showHistory && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 border border-gray-300">Shipment Number</th>
                  <th className="py-3 px-4 border border-gray-300">Arrival Date</th>
                  <th className="py-3 px-4 border border-gray-300">Clearing Agent Name</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Amount (PKR)</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Date</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Status</th>
                  <th className="py-3 px-4 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry, index) => (
                  <tr key={index} className="bg-white border-b border-gray-300">
                    <td className="py-3 px-4">{entry.shipmentNumber}</td>
                    <td className="py-3 px-4">{entry.arrivalDate}</td>
                    <td className="py-3 px-4">{entry.agentName}</td>
                    <td className="py-3 px-4">{entry.paymentAmount}</td>
                    <td className="py-3 px-4">{entry.paymentDate}</td>
                    <td className="py-3 px-4">{entry.paymentStatus}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Deleted Payment History
        </h2>
        {deletedHistory.length > 0 ? (
          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 border border-gray-300">Shipment Number</th>
                  <th className="py-3 px-4 border border-gray-300">Arrival Date</th>
                  <th className="py-3 px-4 border border-gray-300">Clearing Agent Name</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Amount (PKR)</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Date</th>
                  <th className="py-3 px-4 border border-gray-300">Payment Status</th>
                  <th className="py-3 px-4 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedHistory.map((entry, index) => (
                  <tr key={index} className="bg-white border-b border-gray-300">
                    <td className="py-3 px-4">{entry.shipmentNumber}</td>
                    <td className="py-3 px-4">{entry.arrivalDate}</td>
                    <td className="py-3 px-4">{entry.agentName}</td>
                    <td className="py-3 px-4">{entry.paymentAmount}</td>
                    <td className="py-3 px-4">{entry.paymentDate}</td>
                    <td className="py-3 px-4">{entry.paymentStatus}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRecover(index)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Recover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg text-gray-600">No deleted payment history.</p>
        )}
      </section>
    </div>
  );
}

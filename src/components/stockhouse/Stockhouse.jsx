import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stockhouse = () => {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    quantity: '',
    unit: '',
    date: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await axios.get('https://imdad-pharma-api.vercel.app/api/stocks');
      setStock(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      try {
        await axios.put(`https://imdad-pharma-api.vercel.app/api/stocks/${form.id}`, form);
        fetchStock();
      } catch (error) {
        console.error('Error updating stock entry:', error);
      }
    } else {
      try {
        await axios.post('https://imdad-pharma-api.vercel.app/api/stocks', form);
        fetchStock();
      } catch (error) {
        console.error('Error adding stock entry:', error);
      }
    }

    setForm({ id: null, name: '', quantity: '', unit: '', date: '' });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStock = stock.filter(entry => entry.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleEdit = (entry) => {
    setForm({ ...entry });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
          Imdad Pharma - Stock in Warehouse
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Here you can add new stock entries and view the current stock.
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            {form.id ? 'Edit Stock Entry' : 'Add New Stock Entry'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Product Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Quantity:
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="unit" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Unit:
              </label>
              <input
                id="unit"
                name="unit"
                type="text"
                value={form.unit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
                Entry Date:
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {form.id ? 'Update Stock' : 'Add Stock'}
          </button>
        </form>
      </section>

      {/* Current Stock Table */}
      <section className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4">Current Stock in Warehouse</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search by product name"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">#</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Product Name</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Quantity</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Unit</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Date</th>
                <th className="py-3 px-2 sm:px-6 bg-gray-100 text-left text-base sm:text-lg font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((entry, index) => (
                <tr key={entry._id} className="border-b">
                  <td className="py-2 px-2 sm:px-6">{index + 1}</td>
                  <td className="py-2 px-2 sm:px-6">{entry.name}</td>
                  <td className="py-2 px-2 sm:px-6">{entry.quantity}</td>
                  <td className="py-2 px-2 sm:px-6">{entry.unit}</td>
                  <td className="py-2 px-2 sm:px-6">{entry.date}</td>
                  <td className="py-2 px-2 sm:px-6">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await axios.delete(`http://localhost:3000/api/stocks/${entry._id}`);
                          fetchStock();
                        } catch (error) {
                          console.error('Error deleting stock entry:', error);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Stockhouse;

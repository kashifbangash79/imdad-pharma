import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FreightDetail() {
  const [details, setDetails] = useState({
    shipmentNumber: '',
    originCity: '',
    destinationCity: '',
    departureDate: '',
    arrivalDate: '',
    carrierName: '',
    freightCostPKR: '',
    customsFeePKR: '',
    status: 'In Transit',
    containerNumber: '',
    contactNumber: '',
    atoms: '',
    journey: '',
    driverPaymentPKR: '',
  });
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFreightHistory();
  }, []);

  const fetchFreightHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/freight');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching freight history:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/freight', details);
      fetchFreightHistory();
      setDetails({
        shipmentNumber: '',
        originCity: '',
        destinationCity: '',
        departureDate: '',
        arrivalDate: '',
        carrierName: '',
        freightCostPKR: '',
        customsFeePKR: '',
        status: 'In Transit',
        containerNumber: '',
        contactNumber: '',
        atoms: '',
        journey: '',
        driverPaymentPKR: '',
      });
    } catch (error) {
      console.error('Error submitting freight details:', error);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterHistory = () => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(history);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = history.filter(entry =>
        Object.values(entry).some(value =>
          value.toString().toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredHistory(filtered);
    }
  };

  useEffect(() => {
    filterHistory();
  }, [searchQuery, history]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Domestic Freight Details
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter the details of the domestic freight shipment from Karachi to Lahore.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(details).map((key) => (
              <div key={key} className="mb-4">
                <label htmlFor={key} className="block text-lg font-medium text-gray-700 mb-2">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </label>
                {key === 'status' ? (
                  <select
                    id={key}
                    name={key}
                    value={details[key]}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                ) : (
                  <input
                    id={key}
                    name={key}
                    type={key.includes('Date') ? 'date' : key.includes('Cost') || key.includes('Fee') || key.includes('Payment') ? 'number' : 'text'}
                    value={details[key]}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-orange-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Submit Details
            </button>
          </div>
        </form>
      </section>
      <section className="max-w-4xl mx-auto mb-8">
        <button
          onClick={toggleHistory}
          className="w-full py-4 px-6 mb-4 bg-gray-800 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        {showHistory && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
              Freight Details History
            </h3>
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
            />
            <ul className="space-y-6">
              {filteredHistory.map((entry) => (
                <li
                  key={entry._id}
                  className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(entry).map((key) => (
                      <div key={key} className="bg-blue-100 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-blue-800 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </p>
                        <p className="text-md text-gray-700">
                          {entry[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

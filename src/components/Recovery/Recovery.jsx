import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recovery = () => {
  const [form, setForm] = useState({
    customerName: '',
    amountRecovered: '',
    recoveryDate: '',
    loanAmount: ''
  });
  const [recoveries, setRecoveries] = useState([]);
  const [filteredRecoveries, setFilteredRecoveries] = useState([]);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (showHistory) {
      axios.get('http://localhost:5000/recoveries')
        .then(response => {
          setRecoveries(response.data);
          setFilteredRecoveries(response.data); // Initialize filteredRecoveries
        })
        .catch(error => {
          console.error('There was an error fetching the recoveries!', error);
        });
    }
  }, [showHistory]);

  useEffect(() => {
    filterRecoveries(searchTerm);
  }, [recoveries, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.customerName || !form.amountRecovered || !form.recoveryDate || !form.loanAmount) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    axios.post('http://localhost:5000/recoveries/add', form)
      .then(response => {
        const newRecovery = response.data;
        setRecoveries([...recoveries, newRecovery]);
        setFilteredRecoveries([...filteredRecoveries, newRecovery]); // Add to filteredRecoveries
        setForm({ customerName: '', amountRecovered: '', recoveryDate: '', loanAmount: '' });
      })
      .catch(error => {
        console.error('There was an error adding the recovery!', error);
      });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const filterRecoveries = (term) => {
    if (!term) {
      setFilteredRecoveries(recoveries);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = recoveries.filter(recovery => {
        const customerName = recovery.customerName || '';
        const amountRecovered = recovery.amountRecovered || '';
        const recoveryDate = new Date(recovery.recoveryDate).toLocaleDateString() || '';
        const loanAmount = recovery.loanAmount || '';
  
        return customerName.toLowerCase().includes(lowercasedTerm) ||
               amountRecovered.toString().includes(lowercasedTerm) ||
               recoveryDate.includes(lowercasedTerm) ||
               loanAmount.toString().includes(lowercasedTerm);
      });
      setFilteredRecoveries(filtered);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-4 md:p-8 mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">Recovery Management</h2>
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Record New Recovery</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Customer Name:</label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                value={form.customerName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amountRecovered" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Amount Recovered (₨):</label>
              <input
                id="amountRecovered"
                name="amountRecovered"
                type="number"
                value={form.amountRecovered}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recoveryDate" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Recovery Date:</label>
              <input
                id="recoveryDate"
                name="recoveryDate"
                type="date"
                value={form.recoveryDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loanAmount" className="block text-base md:text-lg font-medium text-gray-700 mb-2">Loan Amount (₨):</label>
              <input
                id="loanAmount"
                name="loanAmount"
                type="number"
                value={form.loanAmount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Record Recovery
          </button>
        </form>

        <div className="text-center mb-6">
          <button
            onClick={toggleHistory}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>

        {showHistory && (
          <>
            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search recoveries..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <section className="bg-white shadow-lg rounded-lg p-4 md:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-4">Recoveries List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr>
                      <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">#</th>
                      <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Customer Name</th>
                      <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Amount Recovered (₨)</th>
                      <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Recovery Date</th>
                      <th className="py-3 px-2 md:px-6 bg-gray-100 text-left text-base md:text-lg font-semibold text-gray-700 border-b">Loan Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecoveries.map((recovery, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2 md:px-6">{index + 1}</td>
                        <td className="py-3 px-2 md:px-6">{recovery.customerName}</td>
                        <td className="py-3 px-2 md:px-6">{recovery.amountRecovered}</td>
                        <td className="py-3 px-2 md:px-6">{new Date(recovery.recoveryDate).toLocaleDateString()}</td>
                        <td className="py-3 px-2 md:px-6">{recovery.loanAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default Recovery;




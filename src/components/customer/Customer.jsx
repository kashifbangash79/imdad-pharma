import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    sales: 0,
    purchases: 0
  });
  const [expandedCustomerId, setExpandedCustomerId] = useState(null); // New state for toggling details
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers(searchTerm);
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const filterCustomers = (term) => {
    if (!term) {
      setFilteredCustomers(customers);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(lowercasedTerm) ||
        customer.email.toLowerCase().includes(lowercasedTerm) ||
        customer.phone.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`http://localhost:3000/api/customers/${form.id}`, form);
      } else {
        await axios.post('http://localhost:3000/api/customers', form);
      }
      fetchCustomers();
    } catch (err) {
      console.error('Error saving customer:', err);
    }
    setForm({ id: null, name: '', email: '', phone: '', address: '', sales: 0, purchases: 0 });
  };

  const handleEdit = (customer) => {
    setForm({ ...customer });
  };

  const handleViewDetails = (customerId) => {
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Customer Management</h2>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-bold mb-4">{form.id ? 'Edit Customer' : 'Add New Customer'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Phone:</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address:</label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sales" className="block text-lg font-medium text-gray-700 mb-2">Sales:</label>
              <input
                id="sales"
                name="sales"
                type="number"
                value={form.sales}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="purchases" className="block text-lg font-medium text-gray-700 mb-2">Purchases:</label>
              <input
                id="purchases"
                name="purchases"
                type="number"
                value={form.purchases}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {form.id ? 'Update Customer' : 'Add Customer'}
          </button>
        </form>
 
        {/* Customer List */}
        <h3 className="text-2xl font-bold mb-4">Customer List</h3>
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <ul className="bg-gray-50 p-6 rounded-lg shadow-md">
          {filteredCustomers.map((customer) => (
            <li key={customer._id} className="mb-4 p-4 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{customer.name}</h4>
                  <p className="text-gray-600">Email: {customer.email}</p>
                  <p className="text-gray-600">Phone: {customer.phone}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewDetails(customer._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                  >
                    {expandedCustomerId === customer._id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
              {expandedCustomerId === customer._id && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                  <p><strong className="font-bold text-gray-700">Address:</strong> {customer.address}</p>
                  <p><strong className="font-bold text-gray-700">Sales:</strong> {customer.sales}</p>
                  <p><strong className="font-bold text-gray-700">Purchases:</strong> {customer.purchases}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Customer;

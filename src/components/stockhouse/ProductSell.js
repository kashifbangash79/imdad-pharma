import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransaction = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState(0);
  const [loan, setLoan] = useState(0);

  // Fetch customers and products from the database
  useEffect(() => {
    const fetchData = async () => {
      const customersResponse = await axios.get('http://localhost:5000/api/customers');
      const productsResponse = await axios.get('http://localhost:5000/api/stocks');
      setCustomers(customersResponse.data);
      setProducts(productsResponse.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total price
    setTotalPrice(quantity * productPrice);
  }, [quantity, productPrice]);

  useEffect(() => {
    // Calculate loan amount
    setLoan(totalPrice - payment);
  }, [totalPrice, payment]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find(p => p._id === productId);
    setSelectedProduct(productId);
    setProductPrice(product ? product.price : 0);
  };

  const handleSave = async () => {
    try {
      // Check if new customer is added
      let customerId = selectedCustomer;
      if (newCustomer) {
        const customerResponse = await axios.post('http://localhost:5000/api/customers', {
          name: newCustomer
        });
        customerId = customerResponse.data._id; // Use the newly created customer ID
      }

      // Update product quantity in the database
      await axios.put(`http://localhost:5000/api/stocks/${selectedProduct}`, {
        quantity: quantity // This reduces the quantity of the product
      });

      // Save transaction record in the database
      await axios.post('http://localhost:5000/api/transactions', {
        customer: customerId,
        product: selectedProduct,
        quantity,
        payment,
      });
      

      // Reset form fields
      setSelectedCustomer('');
      setNewCustomer('');
      setSelectedProduct('');
      setQuantity(0);
      setProductPrice(0);
      setTotalPrice(0);
      setPayment(0);
      setLoan(0);

      alert('Transaction saved successfully!');
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Customer Name</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Add New Customer"
          value={newCustomer}
          onChange={(e) => setNewCustomer(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Product Name</label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Product Price (Per Item)</label>
        <input
          type="number"
          value={productPrice}
          
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Total Price</label>
        <input
          type="number"
          value={totalPrice}
          
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Payment</label>
        <input
          type="number"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Loan</label>
        <input
          type="number"
          value={loan}
          
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 bg-gray-100"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Save Record
      </button>
    </div>
  );
};

export default AddTransaction;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockHouse = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', salePrice: '', purchasePrice: '', quantity: '' });
  const [totalProfit, setTotalProfit] = useState(0);

  // Fetch products from the backend on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stocks');
      const data = response.data;
      setProducts(data);
      calculateTotalProfit(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to calculate total profit
  const calculateTotalProfit = (data) => {
    const profit = data.reduce((acc, product) => {
      return acc + (product.salePrice - product.purchasePrice) * product.soldQuantity;
    }, 0);
    setTotalProfit(profit);
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    const productToAdd = {
      name: newProduct.name,
      salePrice: parseFloat(newProduct.salePrice),
      purchasePrice: parseFloat(newProduct.purchasePrice),
      quantity: parseInt(newProduct.quantity, 10),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/stocks', productToAdd);
      const addedProduct = response.data;

      // Add the new product to the state and recalculate profit
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', salePrice: '', purchasePrice: '', quantity: '' });
      calculateTotalProfit([...products, addedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Stockhouse Inventory</h1>

      {/* Add New Product Form */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            className="border rounded p-2 w-full"
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            className="border rounded p-2 w-full"
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={newProduct.purchasePrice}
            onChange={handleInputChange}
          />
          <input
            className="border rounded p-2 w-full"
            type="number"
            name="salePrice"
            placeholder="Sale Price"
            value={newProduct.salePrice}
            onChange={handleInputChange}
          />
          <input
            className="border rounded p-2 w-full"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
          <button
            className="col-span-1 sm:col-span-2 lg:col-span-4 bg-green-500 text-white rounded p-2 hover:bg-green-600"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Purchase Price</th>
              <th className="px-4 py-2">Sale Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Profit per Item</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.purchasePrice}</td>
                <td className="px-4 py-2">{product.salePrice}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.salePrice - product.purchasePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Profit */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold">Total Profit Today: {totalProfit}</h2>
      </div>
    </div>
  );
};

export default StockHouse;




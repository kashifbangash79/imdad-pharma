import React, { useState, useEffect } from "react";
import axios from "axios";

const StockHouse = () => {
  const [products, setProducts] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [newProduct, setNewProduct] = useState({
    name: "",
    salePrice: "",
    purchasePrice: "",
    quantity: "",
  });
  const [totalProfit, setTotalProfit] = useState(0);

  // Fetch products from the backend on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/stocks");
      const data = response.data;
      setProducts(data);
      calculateTotalProfit(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to calculate total profit
  const calculateTotalProfit = (data) => {
    const profit = data.reduce((acc, product) => {
      return (
        acc + (product.salePrice - product.purchasePrice) * product.soldQuantity
      );
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
      const response = await axios.post(
        "http://localhost:5000/api/stocks",
        productToAdd
      );
      const addedProduct = response.data;

      // Add the new product to the state and recalculate profit
      setProducts([...products, addedProduct]);
      setNewProduct({
        name: "",
        salePrice: "",
        purchasePrice: "",
        quantity: "",
      });
      calculateTotalProfit([...products, addedProduct]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Inventory Manager</h1>

      {/* Add New Product Form */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Product
        </h2>
        <div className=" flex flex-col   gap-2">
          <input
            className="border rounded p-2 w-full "
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
          {/* <input
            className="border rounded p-2 w-full"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          /> */}
          <div className="flex flex-col mt-1">
            {/* <p>Payment Amount:</p> */}
            <div className="flex gap-1 h-[35px] ">
              <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full h-full p-1 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
              >
                <option value="Kg">Weight</option>
                <option value="size">Size</option>
                <option value="quantity">Quantity</option>
              </select>
              <input
                id="conversionRate"
                type="text"
                // value={conversionRate}
                // onChange={(e) => setConversionRate(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <button
            className="col-span-1 sm:col-span-2 lg:col-span-4  text-white rounded p-2 bg-orange-600 hover:bg-orange-500"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="lg:p-3 p-1 text-[14px]  ">Name</th>
              <th className="lg:p-3 p-1 text-[14px] ">Purchase Price</th>
              <th className="lg:p-3 p-1 text-[14px] ">Sale Price</th>
              <th className="lg:p-3 p-1 text-[14px] ">qty/size/kg</th>
              <th className="lg:p-3 p-1 text-[14px] ">Profit per Item</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="lg:p-3 p-1 text-[14px]">{product.name}</td>
                <td className="lg:p-3 p-1 text-[14px]">
                  {product.purchasePrice}
                </td>
                <td className="lg:p-3 p-1 text-[14px]">{product.salePrice}</td>
                <td className="lg:p-3 p-1 text-[14px]">{product.quantity}</td>
                <td className="lg:p-3 p-1 text-[14px]">
                  {product.salePrice - product.purchasePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Profit */}
      {/* <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold">
          Total Profit Today: {totalProfit}
        </h2>
      </div> */}
    </div>
  );
};

export default StockHouse;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const transactionHistory = [
  {
    id: 1,
    customer: "Alice",
    product: "Product A",
    quantity: 10,
    price: 50,
    payment: 40,
    loan: 10,
  },
  {
    id: 2,
    customer: "Bob",
    product: "Product B",
    quantity: 5,
    price: 100,
    payment: 60,
    loan: 40,
  },
  {
    id: 3,
    customer: "Charlie",
    product: "Product C",
    quantity: 20,
    price: 20,
    payment: 400,
    loan: 0,
  },
];
const AddTransaction = () => {
  const [selectedQuantity, setSelectedQuantity] = useState("quantity");
  const [showHistory, setShowHistory] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [payment, setPayment] = useState();
  const [loan, setLoan] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const customersResponse = await axios.get(
        "http://localhost:5000/api/customers"
      );
      const productsResponse = await axios.get(
        "http://localhost:5000/api/stocks"
      );
      setCustomers(customersResponse.data);
      setProducts(productsResponse.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = Number(totalQuantity) * Number(productPrice);
    setTotalPrice(result);
  }, [totalQuantity, productPrice]);

  useEffect(() => {
    setLoan(Number(totalPrice) - Number(payment));
  }, [totalPrice, payment]);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(productId);
    setProductPrice(product ? product.price : 0);
  };

  const handleSave = async () => {
    try {
      let customerId = selectedCustomer;
      if (newCustomer) {
        const customerResponse = await axios.post(
          "http://localhost:5000/api/customers",
          {
            name: newCustomer,
          }
        );
        customerId = customerResponse.data._id;
      }

      await axios.put(`http://localhost:5000/api/stocks/${selectedProduct}`, {
        quantity: totalQuantity,
      });

      await axios.post("http://localhost:5000/api/transactions", {
        customer: customerId,
        product: selectedProduct,
        quantity: totalQuantity,
        payment,
      });

      // Reset form
      setSelectedCustomer("");
      setNewCustomer("");
      setSelectedProduct("");
      setTotalQuantity(0);
      setProductPrice(0);
      setTotalPrice(0);
      setPayment(0);
      setLoan(0);

      alert("Transaction saved successfully!");
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("Failed to save transaction");
    }
  };

  return (
    <div className="py-8 px-2 lg:px-24">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
        Add Transaction
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-[14px] font-semibold text-gray-700">
            Customer Name
          </label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
          <Link to="/customer">
            <button className="bg-orange-600 rounded-md p-1 mt-3 text-white hover:bg-orange-500">
              Add New Customer
            </button>
          </Link>
        </div>

        <div>
          <label className="block text-[14px] font-semibold text-gray-700">
            Product Name
          </label>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="flex flex-col mt-1">
            {/* <p>Payment Amount:</p> */}
            <div className="flex gap-1 sm:flex-row flex-col ">
              {/* <select
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full h-full p-1 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
              >
                <option value="Kg">Weight</option>
                <option value="size">Size</option>
                <option value="quantity">Quantity</option>
              </select> */}

              <input
                id="conversionRate"
                type="text"
                placeholder="Enter size..."
                // value={conversionRate}
                // onChange={(e) => setConversionRate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                id="conversionRate"
                type="text"
                placeholder="Enter weight..."
                // value={conversionRate}
                // onChange={(e) => setConversionRate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                id="conversionRate"
                type="text"
                placeholder="Enter quantity..."
                // value={conversionRate}
                // onChange={(e) => setConversionRate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
       

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-semibold text-gray-700">
              Price(Per Item)
            </label>
            <input
              type="number"
              value={productPrice}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-[14px] font-semibold text-gray-700">
              Total Price
            </label>
            <input
              type="number"
              value={totalPrice}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white"
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-semibold text-gray-700">
              Payment
            </label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(Number(e.target.value))}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[14px] font-semibold text-gray-700">
              Loan
            </label>
            <input
              type="number"
              value={loan}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none"
              readOnly
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 mt-6 text-white font-semibold bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Save Transaction
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="mt-6 py-2 px-4 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>

        {/* Transaction History Table */}
        {showHistory && (
          <div className="mt-6  overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Transaction History
            </h3>
            <table className="min-w-full bg-white  border-gray-200  border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Customer</th>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Payment</th>
                  <th className="py-2 px-4 border-b">Loan</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b ">
                      {transaction.customer}
                    </td>
                    <td className="py-2 px-4 border-b ">
                      {transaction.product}
                    </td>
                    <td className="py-2 px-4 border-b ">
                      {transaction.quantity}
                    </td>
                    <td className="py-2 px-4 border-b ">{transaction.price}</td>
                    <td className="py-2 px-4 border-b ">
                      {transaction.payment}
                    </td>
                    <td className="py-2 px-4 border-b ">{transaction.loan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTransaction;

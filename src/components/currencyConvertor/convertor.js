import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function Convertor() {
  const [countries, setCountries] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const apiKey = 'd4d6ce64e69f539ebefd8bab';

  // Fetch countries on component mount
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryList = response.data.map(country => ({
          name: country.name.common,
          code: country.currencies ? Object.keys(country.currencies)[0] : null,
        }));
        setCountries(countryList);
      })
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  const handleFromChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConvert = () => {
    if (fromCurrency && toCurrency && amount) {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

      axios.get(url)
        .then(response => {
          if (response.data.result === 'success') {
            const rate = response.data.conversion_rate;
            setConvertedAmount(amount * rate);
          } else {
            console.error('Error fetching exchange rate:', response.data.error);
          }
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
        <div className="mb-4">
          <label className="block text-gray-700">From:</label>
          <select
            onChange={handleFromChange}
            value={fromCurrency}
            className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded py-2 px-3"
          >
            <option value="" disabled>Select a country</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">To:</label>
          <select
            onChange={handleToChange}
            value={toCurrency}
            className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded py-2 px-3"
          >
            <option value="" disabled>Select a country</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded py-2 px-3"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Convert
        </button>

        {convertedAmount !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Converted Amount:</h2>
            <p className="text-lg">{convertedAmount.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Convertor;

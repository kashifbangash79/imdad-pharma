import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Purchase() {
    const [amountInPKR, setAmountInPKR] = useState(100000);
    const [conversionRate, setConversionRate] = useState(283);
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const amountInUSD = (amountInPKR / conversionRate).toFixed(2);

    const handlePKRChange = (event) => {
        setAmountInPKR(event.target.value);
    };

    const handleReset = () => {
        setAmountInPKR(100000);
    };

    const handleSave = async () => {
        const newEntry = {
            pkr: amountInPKR,
            usd: amountInUSD,
            date: new Date().toLocaleDateString()
        };
        try {
            await axios.post('https://imdad-pharma-api.vercel.app/api/purchase-history/save', newEntry);
            setHistory([...history, newEntry]);
            setFilteredHistory([...history, newEntry]);
        } catch (error) {
            console.error('Error saving purchase history:', error);
        }
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('https://imdad-pharma-api.vercel.app/api/purchase-history');
                setHistory(response.data);
                setFilteredHistory(response.data);
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            }
        };

        fetchHistory();
    }, []);

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = history.filter(entry =>
            entry.date.includes(value) ||
            entry.pkr.toString().includes(value) ||
            entry.usd.toString().includes(value)
        );
        setFilteredHistory(filtered);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <section className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Purchasing in China</h2>
                <p className="text-lg text-gray-600 mb-6">
                    For Imdad Pharma, understanding the currency conversion rates between Pakistani Rupee (PKR) and US Dollar (USD) is crucial for accurate budgeting and financial planning.
                </p>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Conversion Details</h3>
                    <p className="text-lg text-gray-600 mb-4">
                        <strong>Current Conversion Rate:</strong> 1 USD = {conversionRate} PKR
                    </p>
                    <div className="mb-6">
                        <label htmlFor="conversionRate" className="block text-lg font-medium text-gray-700 mb-2">
                            Enter Conversion Rate (PKR to USD):
                        </label>
                        <input
                            id="conversionRate"
                            type="number"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="pkrAmount" className="block text-lg font-medium text-gray-700 mb-2">
                            Enter Amount in PKR:
                        </label>
                        <input
                            id="pkrAmount"
                            type="number"
                            value={amountInPKR}
                            onChange={handlePKRChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <p className="text-lg text-gray-600 mb-4">
                        <strong>Equivalent Amount:</strong>
                        <br />
                        <strong>{amountInPKR.toLocaleString()} PKR</strong> is approximately <strong>${amountInUSD}</strong> USD.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
                        >
                            Reset Amount
                        </button>
                    </div>
                </div>

                <section className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Purchasing Strategy</h3>
                    <p className="text-lg text-gray-600 mb-4">
                        When making purchases, ensure to regularly check for the most up-to-date exchange rates to optimize financial outcomes. Consider working with a financial advisor or using real-time currency conversion tools to make informed decisions.
                    </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Purchase History</h3>
                    <button
                        onClick={toggleHistory}
                        className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 mb-4"
                    >
                        {showHistory ? "Hide History" : "Show History"}
                    </button>
                    {showHistory && (
                        <>
                            <input
                                type="text"
                                placeholder="Search by date or amount"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {filteredHistory.length === 0 ? (
                                <p className="text-lg text-gray-600">No purchase history available.</p>
                            ) : (
                                <div className="bg-white shadow-md rounded-lg p-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="p-2 border-b text-sm sm:text-base">Entry Number</th>
                                                    <th className="p-2 border-b text-sm sm:text-base">Date</th>
                                                    <th className="p-2 border-b text-sm sm:text-base">Amount (PKR)</th>
                                                    <th className="p-2 border-b text-sm sm:text-base">Amount (USD)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredHistory.map((entry, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border-b text-sm sm:text-base">{index + 1}</td>
                                                        <td className="p-2 border-b text-sm sm:text-base">{entry.date}</td>
                                                        <td className="p-2 border-b text-sm sm:text-base">{entry.pkr.toLocaleString()}</td>
                                                        <td className="p-2 border-b text-sm sm:text-base">${entry.usd}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </section>
        </div>
    );
}
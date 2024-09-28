import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SendPayment = () => {
    const [paymentType, setPaymentType] = useState('');
    const [details, setDetails] = useState({
        amount: '',
        recipient: '',
        payer: '',
        bankName: '',
        date: '',
    });

    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const banks = [
        'Habib Bank Limited (HBL)',
        'United Bank Limited (UBL)',
        'National Bank of Pakistan (NBP)',
        'Standard Chartered Bank',
        'Faysal Bank',
        'Bank Alfalah',
        'MCB Bank Limited',
        'Bank Islami',
        'Dubai Islamic Bank',
        'Samba Bank',
        'JS Bank',
        'Pak Oman Investment Company',
        'Al Baraka Bank',
        'First Women Bank',
        'The Bank of Punjab',
        'Summit Bank',
        'Bank of Khyber',
        'Bank of Azad Jammu & Kashmir',
        'Pakistan Industrial Credit and Investment Corporation (PICIC)',
        'Pak Brunei Investment Company',
        'Meezan Bank',
        'Askari Bank',
        'Soneri Bank',
        'Silk Bank',
        'Allied Bank Limited (ABL)',
        'NIB Bank',
        'CitiBank',
        'Deutsche Bank',
        'Habib Metropolitan Bank',
        'Apna Microfinance Bank',
        'Khushhali Microfinance Bank',
        'Mobilink Microfinance Bank',
        'FINCA Microfinance Bank',
        'U Microfinance Bank',
        'First Microfinance Bank',
        'Advans Pakistan Microfinance Bank',
        'Waseela Microfinance Bank',
        'Sindh Bank',
        'KASB Bank',
        'Zarai Taraqiati Bank Limited (ZTBL)',
        'House Building Finance Corporation (HBFC)',
        'Industrial Development Bank of Pakistan (IDBP)',
        'Pak-Libya Holding Company',
        'Pak-Iran Investment Company',
        'Pak-Kuwait Investment Company',
        'Pak-Oman Investment Company',
        'Pak-China Investment Company',
        'Pak Qatar General Takaful',
        'Pak Qatar Family Takaful',
        'EFU Life Assurance',
        'Jubilee Life Insurance',
        'State Life Insurance Corporation of Pakistan'
    ];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/sendPayment', {
                ...details, paymentType
            });
            setHistory([...history, response.data]);
            setDetails({
                amount: '',
                recipient: '',
                payer: '',
                bankName: '',
                date: '',
            });
            setPaymentType('');
        } catch (error) {
            console.error('Failed to submit transaction:', error);
        }
    };

    // Fetch transaction history on mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sendPayment');
                setHistory(response.data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };
        fetchHistory();
    }, []);

    // Filter transactions based on search query
    const filteredHistory = history.filter((transaction) =>
        transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.payer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.paymentType === 'bank' && transaction.bankName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Select Payment Method:</label>
                <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                    <option value="">Select Payment Type</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                </select>
            </div>

            {paymentType && (
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 capitalize">{paymentType} Transaction</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Amount (in Lakh):</label>
                        <input
                            type="number"
                            value={details.amount}
                            onChange={(e) => setDetails({ ...details, amount: e.target.value })}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Recipient Name:</label>
                        <input
                            type="text"
                            value={details.recipient}
                            onChange={(e) => setDetails({ ...details, recipient: e.target.value })}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter recipient name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            {paymentType === 'cash' ? 'Payment Made By:' : 'Sender Name:'}
                        </label>
                        <input
                            type="text"
                            value={details.payer}
                            onChange={(e) => setDetails({ ...details, payer: e.target.value })}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={paymentType === 'cash' ? 'Enter payer name' : 'Enter sender name'}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Date:</label>
                        <input
                            type="date"
                            value={details.date}
                            onChange={(e) => setDetails({ ...details, date: e.target.value })}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {paymentType === 'bank' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Bank Name:</label>
                            <select
                                value={details.bankName}
                                onChange={(e) => setDetails({ ...details, bankName: e.target.value })}
                                className="border border-gray-300 p-3 w-full rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Bank</option>
                                {banks.map((bank, index) => (
                                    <option key={index} value={bank}>{bank}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                        Submit {paymentType === 'bank' ? 'Bank' : 'Cash'} Payment
                    </button>
                </form>
            )}

            <div className="w-full max-w-2xl mt-10">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in transaction history..."
                    className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Transaction History</h3>

                {filteredHistory.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredHistory.map((transaction, index) => (
                            <li key={index} className="border p-4 rounded-lg shadow-sm bg-white">
                                <strong>Payment Type:</strong> {transaction.paymentType}<br />
                                <strong>Amount:</strong> {transaction.amount}<br />
                                <strong>Recipient:</strong> {transaction.recipient}<br />
                                <strong>Payer:</strong> {transaction.payer}<br />
                                {transaction.paymentType === 'bank' && (
                                    <>
                                        <strong>Bank:</strong> {transaction.bankName}<br />
                                    </>
                                )}
                                <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default SendPayment;

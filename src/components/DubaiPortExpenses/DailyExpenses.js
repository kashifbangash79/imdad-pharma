import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailyExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/dailyexpenses`)
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, []);

  const addExpense = () => {
    if (expenseName && expensePrice) {
      const newExpense = { 
        name: expenseName, 
        price: parseFloat(expensePrice) || 0, 
        date: expenseDate 
      };
      axios.post(`http://localhost:5000/api/dailyexpenses`, newExpense)
        .then(response => {
          setExpenses([...expenses, response.data]);
          setExpenseName('');
          setExpensePrice('');
        })
        .catch(error => {
          console.error("There was an error adding the expense!", error);
        });
    }
  };

  const calculateDailyTotal = (date) => {
     const dailyExpenses = expenses.filter(expense => expense.date && expense.date.split('T')[0] === date);
    return dailyExpenses.reduce((total, expense) => {
      return total + (typeof expense.price === 'number' && !isNaN(expense.price) ? expense.price : 0);
    }, 0).toFixed(2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  const uniqueDates = [...new Set(expenses.map(expense => expense.date.split('T')[0]))];

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Daily Expense Tracker</h2>

      <div className="mb-4">
        <input
          type="date"
          className="border border-gray-300 p-2 rounded w-full"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Expense Price"
          value={expensePrice}
          onChange={(e) => setExpensePrice(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={addExpense}
      >
        Add Expense
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Daily Expenses</h3>
        {uniqueDates.map((date, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">{formatDate(date)}</h4>
            <ul className="list-disc list-inside mt-2">
              {expenses.filter(expense => expense.date.split('T')[0] === date).map((expense, index) => (
                <li key={index} className="mt-1">
                  {expense.name}: ${typeof expense.price === 'number' && !isNaN(expense.price) ? expense.price.toFixed(2) : '0.00'}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-lg font-bold">
              Total for {formatDate(date)}: ${calculateDailyTotal(date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyExpense;

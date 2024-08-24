// import React, { useState } from 'react';

// const banks = [
//     'HBL (Habib Bank Limited)',
//     'UBL (United Bank Limited)',
//     'MCB Bank Limited',
//     'Standard Chartered Bank (Pakistan)',
//     'National Bank of Pakistan (NBP)',
//     'Bank Alfalah',
//     'Faysal Bank',
//     'Dubai Islamic Bank Pakistan',
//     'Bank Islami',
//     'Al Baraka Bank (Pakistan)',
//     'Pak Oman Investment Company',
//     'Bank of Punjab',
//     'First Habib Modaraba',
//     'United Bank Limited (UBL)',
//     'JS Bank',
//     'Citi Bank Pakistan',
//     'Exim Bank of Pakistan',
//     'Summit Bank',
//     'Pak Brunei Investment Company',
//     'Pak Libya Holding Company',
//     'Bank of Khyber',
//     'Bank Islami Pakistan Limited',
//     'Meezan Bank',
//     'KASB Bank',
//     'Pak Oman Investment Company',
//     'Pak Oman Investment Company',
//     // Add more banks if needed
//   ];
  
// const Payment = () => {
//   const [cashPayers, setCashPayers] = useState([]);
//   const [bankTransactions, setBankTransactions] = useState([]);
//   const [payerName, setPayerName] = useState('');
//   const [cashAmount, setCashAmount] = useState('');
//   const [selectedBank, setSelectedBank] = useState('');
//   const [bankAmount, setBankAmount] = useState('');
//   const [recipientName, setRecipientName] = useState('');
//   const [nextRecipient, setNextRecipient] = useState('');
//   const [transactionDate, setTransactionDate] = useState('');
//   const [senderName, setSenderName] = useState('');
//   const [cashSearchQuery, setCashSearchQuery] = useState('');
//   const [bankSearchQuery, setBankSearchQuery] = useState('');

//   const [editCashIndex, setEditCashIndex] = useState(null);
//   const [editBankId, setEditBankId] = useState(null);

//   const handleCashSubmit = (e) => {
//     e.preventDefault();
//     if (editCashIndex !== null) {
//       // Edit existing entry
//       const updatedCashPayers = [...cashPayers];
//       updatedCashPayers[editCashIndex] = { payerName, cashAmount, recipientName, nextRecipient, transactionDate };
//       setCashPayers(updatedCashPayers);
//       setEditCashIndex(null);
//     } else {
//       // Add new entry
//       setCashPayers([...cashPayers, { payerName, cashAmount, recipientName, nextRecipient, transactionDate }]);
//     }
//     // Clear form
//     setPayerName('');
//     setCashAmount('');
//     setRecipientName('');
//     setNextRecipient('');
//     setTransactionDate('');
//   };

//   const handleBankSubmit = (e) => {
//     e.preventDefault();
//     if (editBankId !== null) {
//       // Edit existing entry
//       const updatedBankTransactions = bankTransactions.map(transaction =>
//         transaction.id === editBankId
//           ? { id: editBankId, selectedBank, bankAmount, recipientName, nextRecipient, transactionDate, senderName }
//           : transaction
//       );
//       setBankTransactions(updatedBankTransactions);
//       setEditBankId(null);
//     } else {
//       // Add new entry
//       const newTransaction = {
//         id: bankTransactions.length + 1,
//         selectedBank,
//         bankAmount,
//         recipientName,
//         nextRecipient,
//         transactionDate,
//         senderName
//       };
//       setBankTransactions([...bankTransactions, newTransaction]);
//     }
//     // Clear form
//     setSelectedBank('');
//     setBankAmount('');
//     setRecipientName('');
//     setNextRecipient('');
//     setTransactionDate('');
//     setSenderName('');
//   };

//   const handleEditCash = (index) => {
//     const cashToEdit = cashPayers[index];
//     setPayerName(cashToEdit.payerName);
//     setCashAmount(cashToEdit.cashAmount);
//     setRecipientName(cashToEdit.recipientName);
//     setNextRecipient(cashToEdit.nextRecipient);
//     setTransactionDate(cashToEdit.transactionDate);
//     setEditCashIndex(index);
//   };

//   const handleEditBank = (id) => {
//     const bankToEdit = bankTransactions.find(transaction => transaction.id === id);
//     setSelectedBank(bankToEdit.selectedBank);
//     setBankAmount(bankToEdit.bankAmount);
//     setRecipientName(bankToEdit.recipientName);
//     setNextRecipient(bankToEdit.nextRecipient);
//     setTransactionDate(bankToEdit.transactionDate);
//     setSenderName(bankToEdit.senderName);
//     setEditBankId(id);
//   };

//   const filteredCashPayers = cashPayers.filter(payment =>
//     (payment.payerName.toLowerCase().includes(cashSearchQuery.toLowerCase()) ||
//     payment.cashAmount.toString().includes(cashSearchQuery))
//   );

//   const filteredBankTransactions = bankTransactions.filter(transaction =>
//     transaction.selectedBank.toLowerCase().includes(bankSearchQuery.toLowerCase()) ||
//     transaction.senderName.toLowerCase().includes(bankSearchQuery.toLowerCase()) ||
//     transaction.recipientName.toLowerCase().includes(bankSearchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Payment System</h1>

//       <form onSubmit={handleCashSubmit} className="mb-8 bg-gray-100 p-4 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">{editCashIndex !== null ? 'Edit Cash Payment' : 'Cash Payment'}</h2>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Payer Name</label>
//           <input
//             type="text"
//             value={payerName}
//             onChange={(e) => setPayerName(e.target.value)}
//             placeholder="Enter Payer Name"
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Amount</label>
//           <input
//             type="number"
//             value={cashAmount}
//             onChange={(e) => setCashAmount(e.target.value)}
//             placeholder="Enter Amount"
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Recipient Name</label>
//           <input
//             type="text"
//             value={recipientName}
//             onChange={(e) => setRecipientName(e.target.value)}
//             placeholder="Enter Recipient Name"
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Next Recipient</label>
//           <input
//             type="text"
//             value={nextRecipient}
//             onChange={(e) => setNextRecipient(e.target.value)}
//             placeholder="Enter Next Recipient Name"
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Transaction Date</label>
//           <input
//             type="date"
//             value={transactionDate}
//             onChange={(e) => setTransactionDate(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//           {editCashIndex !== null ? 'Update Cash Payment' : 'Add Cash Payment'}
//         </button>
//       </form>

//       <form onSubmit={handleBankSubmit} className="mb-8 bg-gray-100 p-4 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">{editBankId !== null ? 'Edit Bank Payment' : 'Bank Payment'}</h2>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Bank Name</label>
//           <select
//             value={selectedBank}
//             onChange={(e) => setSelectedBank(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           >
//             <option value="">Select Bank</option>
//             {banks.map((bank, index) => (
//               <option key={index} value={bank}>{bank}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Amount</label>
//           <input
//             type="number"
//             value={bankAmount}
//             onChange={(e) => setBankAmount(e.target.value)}
//             placeholder="Enter Amount"
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Recipient Name</label>
//           <input
//             type="text"
//             value={recipientName}
//             onChange={(e) => setRecipientName(e.target.value)}
//             placeholder="Enter Recipient Name"
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Next Recipient</label>
//           <input
//             type="text"
//             value={nextRecipient}
//             onChange={(e) => setNextRecipient(e.target.value)}
//             placeholder="Enter Next Recipient Name"
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Transaction Date</label>
//           <input
//             type="date"
//             value={transactionDate}
//             onChange={(e) => setTransactionDate(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Sender Name</label>
//           <input
//             type="text"
//             value={senderName}
//             onChange={(e) => setSenderName(e.target.value)}
//             placeholder="Enter Sender Name"
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//           {editBankId !== null ? 'Update Bank Payment' : 'Add Bank Payment'}
//         </button>
//       </form>

//       <div className="mb-8">
//   <h2 className="text-xl font-semibold mb-4">Search Cash Payments</h2>
//   <input
//     type="text"
//     value={cashSearchQuery}
//     onChange={(e) => setCashSearchQuery(e.target.value)}
//     placeholder="Search by Payer Name or Amount"
//     className="border p-2 w-full rounded"
//   />
//   <div className="overflow-x-auto">
//     <table className="w-full mt-4 border-collapse border border-gray-300">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 p-2">Entry No.</th>
//           <th className="border border-gray-300 p-2">Payer Name</th>
//           <th className="border border-gray-300 p-2">Amount</th>
//           <th className="border border-gray-300 p-2">Recipient Name</th>
//           <th className="border border-gray-300 p-2">Next Recipient</th>
//           <th className="border border-gray-300 p-2">Transaction Date</th>
//           <th className="border border-gray-300 p-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredCashPayers.map((payment, index) => (
//           <tr key={index}>
//             <td className="border border-gray-300 p-2">{index + 1}</td>
//             <td className="border border-gray-300 p-2">{payment.payerName}</td>
//             <td className="border border-gray-300 p-2">{payment.cashAmount}</td>
//             <td className="border border-gray-300 p-2">{payment.recipientName}</td>
//             <td className="border border-gray-300 p-2">{payment.nextRecipient}</td>
//             <td className="border border-gray-300 p-2">{payment.transactionDate}</td>
//             <td className="border border-gray-300 p-2">
//               <button onClick={() => handleEditCash(index)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600">
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

// <div className="mb-8">
//   <h2 className="text-xl font-semibold mb-4">Search Bank Payments</h2>
//   <input
//     type="text"
//     value={bankSearchQuery}
//     onChange={(e) => setBankSearchQuery(e.target.value)}
//     placeholder="Search by Bank Name, Sender Name, or Recipient Name"
//     className="border p-2 w-full rounded"
//   />
//   <div className="overflow-x-auto">
//     <table className="w-full mt-4 border-collapse border border-gray-300">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 p-2">Entry No.</th>
//           <th className="border border-gray-300 p-2">Bank Name</th>
//           <th className="border border-gray-300 p-2">Amount</th>
//           <th className="border border-gray-300 p-2">Recipient Name</th>
//           <th className="border border-gray-300 p-2">Next Recipient</th>
//           <th className="border border-gray-300 p-2">Transaction Date</th>
//           <th className="border border-gray-300 p-2">Sender Name</th>
//           <th className="border border-gray-300 p-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredBankTransactions.map((transaction, index) => (
//           <tr key={transaction.id}>
//             <td className="border border-gray-300 p-2">{index + 1}</td>
//             <td className="border border-gray-300 p-2">{transaction.selectedBank}</td>
//             <td className="border border-gray-300 p-2">{transaction.bankAmount}</td>
//             <td className="border border-gray-300 p-2">{transaction.recipientName}</td>
//             <td className="border border-gray-300 p-2">{transaction.nextRecipient}</td>
//             <td className="border border-gray-300 p-2">{transaction.transactionDate}</td>
//             <td className="border border-gray-300 p-2">{transaction.senderName}</td>
//             <td className="border border-gray-300 p-2">
//               <button onClick={() => handleEditBank(transaction.id)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600">
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
// </div>

//   );
// };

// export default Payment;
import React, { useState } from 'react';

const Payment = () => {
  const [paymentType, setPaymentType] = useState('cash');
  const [payerName, setPayerName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [nextRecipient, setNextRecipient] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankAmount, setBankAmount] = useState('');
  const [senderName, setSenderName] = useState('');
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]); // List of payments

  const banks = ['Bank A', 'Bank B', 'Bank C'];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      paymentType,
      payerName,
      recipientName,
      nextRecipient,
      transactionDate,
      amount: paymentType === 'cash' ? cashAmount : bankAmount,
      bankName: selectedBank,
      senderName,
    };

    if (editPaymentId !== null) {
      // Update existing payment
      const updatedPayments = payments.map((payment) =>
        payment.id === editPaymentId ? { ...payment, ...paymentData } : payment
      );
      setPayments(updatedPayments);
    } else {
      // Add new payment
      setPayments([...payments, { id: Date.now(), ...paymentData }]);
    }

    // Reset the form
    setPayerName('');
    setRecipientName('');
    setNextRecipient('');
    setTransactionDate('');
    setCashAmount('');
    setSelectedBank('');
    setBankAmount('');
    setSenderName('');
    setEditPaymentId(null);
  };

  const handleEdit = (id) => {
    const paymentToEdit = payments.find((payment) => payment.id === id);
    if (paymentToEdit) {
      setPaymentType(paymentToEdit.paymentType);
      setPayerName(paymentToEdit.payerName);
      setRecipientName(paymentToEdit.recipientName);
      setNextRecipient(paymentToEdit.nextRecipient);
      setTransactionDate(paymentToEdit.transactionDate);
      setCashAmount(paymentToEdit.amount);
      setSelectedBank(paymentToEdit.bankName);
      setBankAmount(paymentToEdit.amount);
      setSenderName(paymentToEdit.senderName);
      setEditPaymentId(id);
    }
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const filteredPayments = payments.filter((payment) =>
    payment.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment System</h1>

      <form onSubmit={handlePaymentSubmit} className="mb-8 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{editPaymentId !== null ? 'Edit Payment' : 'New Payment'}</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Payment Type</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="border p-2 w-full rounded"
            required
          >
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        {paymentType === 'cash' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Payer Name</label>
              <input
                type="text"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Enter Payer Name"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="Enter Amount"
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </>
        )}

        {paymentType === 'bank' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Bank Name</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Select Bank</option>
                {banks.map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={bankAmount}
                onChange={(e) => setBankAmount(e.target.value)}
                placeholder="Enter Amount"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Sender Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter Sender Name"
                className="border p-2 w-full rounded"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter Recipient Name"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Next Recipient</label>
          <input
            type="text"
            value={nextRecipient}
            onChange={(e) => setNextRecipient(e.target.value)}
            placeholder="Enter Next Recipient Name"
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Transaction Date</label>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editPaymentId !== null ? 'Update Payment' : 'Add Payment'}
        </button>
      </form>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Search Payments by Recipient</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Recipient Name"
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Payment List */}
      <div className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">Payment List</h2>
  {filteredPayments.length === 0 ? (
    <p className="text-gray-600">No payments found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 text-left">Payer / Sender</th>
            <th className="py-3 px-4 text-left">Payment Type</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Recipient Name</th>
            <th className="py-3 px-4 text-left">Next Recipient</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr
              key={payment.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="py-3 px-4 border-b border-gray-200">
                {payment.payerName || payment.senderName}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {payment.paymentType.charAt(0).toUpperCase() +
                  payment.paymentType.slice(1)}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {payment.amount}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {payment.recipientName}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {payment.nextRecipient || 'N/A'}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                {new Date(payment.transactionDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleEdit(payment.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </td>
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

export default Payment;

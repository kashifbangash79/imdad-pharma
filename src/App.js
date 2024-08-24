import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home/Home.jsx'
import FreightDetail from './components/Frieghtdetail/Frieghtdetail.jsx';
import Stockhouse from './components/stockhouse/Stockhouse.jsx';
import AgentPayment from './components/AgentPayment/Agentpayment.jsx';
import Customer from './components/customer/Customer.jsx';
import Purchase from './components/PurchaseInChina/PurchaseInChina.jsx';
import Recovery from './components/Recovery/Recovery.jsx';
import Logout from './components/Logout/Logout.jsx';
import Register from './components/Login/Register.jsx';
import Login from './components/Login/Login.jsx';
import DubaiPortExpenses from './components/DubaiPortExpenses/DubaiPortExpenses.jsx';
import Payment from './components/Payment/Payment.js';
import Convertor from './components/currencyConvertor/convertor.js';

import './index.css';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/frieghtdetail" element={<FreightDetail />} />
          <Route path="/stockhouse" element={<Stockhouse />} />
          <Route path="/agentpayment" element={<AgentPayment />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/DubaiPortExpenses' element={<DubaiPortExpenses/>}/>
          <Route path='/payment' element= {<Payment />}/>
          <Route path='/convertor' element = {<Convertor />}/>
          </Route>
        </Routes>
      
    </Router>
  );
}

export default App;

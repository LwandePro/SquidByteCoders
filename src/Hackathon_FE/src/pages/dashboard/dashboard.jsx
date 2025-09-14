// FinanceDashboard.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Upload, FileText, TrendingUp, TrendingDown, DollarSign, CreditCard, Target, Send, MessageCircle, X } from 'lucide-react';
import Sidetag from '../common/sidetag'; // Import the new Sidebar component
import HeaderNav from '../common/headernav'; // Import the new HeaderNav component

const FinanceDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! How can I help you with your finances today?' }
  ]);

  // Sample data (keep this in the main component as it's part of the dashboard content)
  const salaryData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 47000 },
    { month: 'Mar', amount: 45000 },
    { month: 'Apr', amount: 48000 },
    { month: 'May', amount: 45000 },
    { month: 'Jun', amount: 50000 },
  ];

  const expensesData = [
    { category: 'Housing', amount: 15000, color: '#0d6efd' },
    { category: 'Food', amount: 8000, color: '#198754' },
    { category: 'Transport', amount: 5000, color: '#ffc107' },
    { category: 'Utilities', amount: 3000, color: '#dc3545' },
    { category: 'Entertainment', amount: 2500, color: '#6f42c1' },
    { category: 'Other', amount: 1500, color: '#6c757d' },
  ];

  const cashflowData = [
    { month: 'Jan', income: 45000, expenses: 35000, net: 10000 },
    { month: 'Feb', income: 47000, expenses: 36000, net: 11000 },
    { month: 'Mar', income: 45000, expenses: 38000, net: 7000 },
    { month: 'Apr', income: 48000, expenses: 34000, net: 14000 },
    { month: 'May', income: 45000, expenses: 35000, net: 10000 },
    { month: 'Jun', income: 50000, expenses: 37000, net: 13000 },
  ];

  const debtData = [
    { type: 'Home Loan', balance: 850000, payment: 12500 },
    { type: 'Car Loan', balance: 180000, payment: 4200 },
    { type: 'Credit Card', balance: 25000, payment: 1800 },
    { type: 'Personal Loan', balance: 45000, payment: 2100 },
  ];

  const savingsGoal = {
    target: 100000,
    current: 67500,
    percentage: 67.5
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, 
        { type: 'user', message: chatMessage },
        { type: 'bot', message: 'Thanks for your question! This is a demo response. In a real app, this would connect to a financial AI assistant.' }
      ]);
      setChatMessage('');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="d-flex" style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh'}}>
        
        {/* Sidebar */}
        <Sidetag 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed} 
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />

        {/* Main Content Area */}
        <div 
          className="flex-grow-1"
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '250px',
            transition: 'margin-left 0.3s ease'
          }}
        >
          {/* Top Navbar */}
          <HeaderNav />

          {/* Dashboard Content */}
          <div className="bg-light min-vh-100">
            {/* Hero Section */}
            {/* <section className="bg-white border-bottom">
              <div className="container-fluid py-4">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
                      <div>
                        <h2 className="h3 fw-bold text-dark mb-2">Financial Dashboard</h2>
                        <p className="text-muted mb-0">Get a comprehensive overview of your financial health</p>
                      </div>
                      
                      <div className="d-flex gap-2 mt-3 mt-md-0">
                        <button className="btn btn-primary d-flex align-items-center gap-2">
                          <Upload size={18} />
                          <span className="d-none d-sm-inline">Upload Data</span>
                        </button>
                        <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                          <FileText size={18} />
                          <span className="d-none d-sm-inline">Sample Data</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            {/* Main Dashboard Content */}
            <div className="container-fluid py-4">
              {/* Key Metrics */}
              <div className="row g-3 mb-4">
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted small fw-medium mb-1">Monthly Income</p>
                          <h3 className="h4 fw-bold mb-0">{formatCurrency(50000)}</h3>
                        </div>
                        <div className="bg-success bg-opacity-10 p-3 rounded">
                          <TrendingUp className="text-success" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted small fw-medium mb-1">Monthly Expenses</p>
                          <h3 className="h4 fw-bold mb-0">{formatCurrency(37000)}</h3>
                        </div>
                        <div className="bg-danger bg-opacity-10 p-3 rounded">
                          <TrendingDown className="text-danger" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted small fw-medium mb-1">Net Cashflow</p>
                          <h3 className="h4 fw-bold mb-0 text-success">{formatCurrency(13000)}</h3>
                        </div>
                        <div className="bg-primary bg-opacity-10 p-3 rounded">
                          <DollarSign className="text-primary" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted small fw-medium mb-1">Total Debt</p>
                          <h3 className="h4 fw-bold mb-0">{formatCurrency(1100000)}</h3>
                        </div>
                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                          <CreditCard className="text-warning" size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="row g-4 mb-4">
                {/* Salary Chart */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pb-0">
                      <h5 className="card-title fw-semibold mb-0">Monthly Salary Trends</h5>
                    </div>
                    <div className="card-body">
                      <div style={{height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salaryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                            <XAxis dataKey="month" stroke="#6c757d" />
                            <YAxis stroke="#6c757d" tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => [formatCurrency(value), 'Salary']} />
                            <Bar dataKey="amount" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expenses Chart */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pb-0">
                      <h5 className="card-title fw-semibold mb-0">Expense Breakdown</h5>
                    </div>
                    <div className="card-body">
                      <div style={{height: '250px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expensesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="amount"
                            >
                              {expensesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [formatCurrency(value), 'Amount']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="row g-2 mt-2">
                        {expensesData.map((entry, index) => (
                          <div key={index} className="col-6">
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle me-2" 
                                style={{
                                  width: '12px', 
                                  height: '12px', 
                                  backgroundColor: entry.color
                                }}
                              ></div>
                              <small className="text-muted">{entry.category}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cashflow Chart */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pb-0">
                      <h5 className="card-title fw-semibold mb-0">Cashflow Analysis</h5>
                    </div>
                    <div className="card-body">
                      <div style={{height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={cashflowData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                            <XAxis dataKey="month" stroke="#6c757d" />
                            <YAxis stroke="#6c757d" tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`} />
                            <Tooltip formatter={(value) => [formatCurrency(value)]} />
                            <Line type="monotone" dataKey="income" stroke="#198754" strokeWidth={2} />
                            <Line type="monotone" dataKey="expenses" stroke="#dc3545" strokeWidth={2} />
                            <Line type="monotone" dataKey="net" stroke="#0d6efd" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Debt Chart */}
                <div className="col-lg-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pb-0">
                      <h5 className="card-title fw-semibold mb-0">Debt Overview</h5>
                    </div>
                    <div className="card-body">
                      <div className="space-y-3">
                        {debtData.map((debt, index) => (
                          <div key={index} className={`${index < debtData.length - 1 ? 'border-bottom' : ''} pb-3 mb-3`}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-medium">{debt.type}</span>
                              <small className="text-muted">Monthly: {formatCurrency(debt.payment)}</small>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="h6 fw-bold mb-0">{formatCurrency(debt.balance)}</span>
                              <div className="progress" style={{width: '120px', height: '8px'}}>
                                <div 
                                  className="progress-bar bg-danger" 
                                  style={{width: `${Math.min((debt.balance / 1000000) * 100, 100)}%`}}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="card-title fw-semibold mb-0 d-flex align-items-center gap-2">
                          <Target size={20} />
                          Savings Goal Progress
                        </h5>
                        <span className="badge bg-primary">{savingsGoal.percentage.toFixed(1)}% Complete</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between small text-muted mb-2">
                          <span>Current: {formatCurrency(savingsGoal.current)}</span>
                          <span>Target: {formatCurrency(savingsGoal.target)}</span>
                        </div>
                        <div className="progress" style={{height: '16px'}}>
                          <div 
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            style={{
                              width: `${savingsGoal.percentage}%`,
                              background: 'linear-gradient(90deg, #0d6efd, #198754)'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-muted small mb-0">
                        You need {formatCurrency(savingsGoal.target - savingsGoal.current)} more to reach your goal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface (remains in the main component as it's a floating element, not part of the main layout) */}
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn btn-primary rounded-circle position-fixed shadow"
            style={{
              bottom: '24px',
              right: '24px',
              width: '60px',
              height: '60px',
              zIndex: 1050
            }}
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div 
            className="position-fixed bg-white shadow rounded border"
            style={{
              bottom: '24px',
              right: '24px',
              width: '320px',
              height: '400px',
              zIndex: 1050
            }}
          >
            {/* Chat Header */}
            <div className="bg-primary text-white p-3 rounded-top d-flex align-items-center justify-content-between">
              <h6 className="mb-0 fw-medium">Financial Assistant</h6>
              <button
                onClick={() => setIsChatOpen(false)}
                className="btn btn-link text-white p-0 border-0"
                style={{textDecoration: 'none'}}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              className="p-3 overflow-auto"
              style={{height: 'calc(100% - 120px)'}}
            >
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-3 d-flex ${chat.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <div 
                    className={`rounded px-3 py-2 small ${
                      chat.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-light text-dark'
                    }`}
                    style={{maxWidth: '80%'}}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-top">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask about your finances..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="btn btn-primary"
                  type="button"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinanceDashboard;
// AdviceInsightsPage.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  Calculator, 
  DollarSign, 
  CreditCard, 
  PiggyBank, 
  Target,
  Menu,
  Home,
  BarChart2,
  Settings,
  FileText,
  Bell,
  Search,
  User,
  Play,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Sidetag from '../common/sidetag'
import HeaderNav from '../common/headernav';

const AdviceInsightsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('analytics');
  const [whatIfScenario, setWhatIfScenario] = useState('');
  const [whatIfAmount, setWhatIfAmount] = useState('');
  const [whatIfResult, setWhatIfResult] = useState('');

  // Sample data for problem areas
  const problemAreas = [
    {
      title: 'High Monthly Expenses',
      severity: 'high',
      icon: TrendingUp,
      items: [
        'Housing costs are 45% of income (recommended: 30%)',
        'Entertainment spending increased by 23% last month',
        'Utility bills are R500 above average for your area',
        'Consider reviewing subscription services'
      ]
    },
    {
      title: 'Debt Management',
      severity: 'medium',
      icon: CreditCard,
      items: [
        'Credit card utilization at 78% (recommended: below 30%)',
        'Only making minimum payments on R25,000 balance',
        'Personal loan interest rate is 2% above market average',
        'Consider debt consolidation options'
      ]
    },
    {
      title: 'Emergency Fund Gap',
      severity: 'medium',
      icon: PiggyBank,
      items: [
        'Current emergency fund covers 1.8 months of expenses',
        'Recommended: 3-6 months of expenses',
        'Consider automatic transfers to savings',
        'Current savings rate: 12% (good progress!)'
      ]
    },
    {
      title: 'Investment Opportunities',
      severity: 'low',
      icon: Target,
      items: [
        'No current investment portfolio',
        'Missing out on compound growth potential',
        'Consider low-cost index funds',
        'Tax-free savings account underutilized'
      ]
    }
  ];

  // Forecast data
  const forecastData = [
    { month: 'Jan', income: 50000, expenses: 37000, savings: 13000, projected: 13000 },
    { month: 'Feb', income: 50000, expenses: 35500, savings: 14500, projected: 14500 },
    { month: 'Mar', income: 52000, expenses: 35000, savings: 17000, projected: 16800 },
    { month: 'Apr', income: 52000, expenses: 34500, savings: 17500, projected: 17200 },
    { month: 'May', income: 52000, expenses: 34000, savings: 18000, projected: 17800 },
    { month: 'Jun', income: 55000, expenses: 36000, savings: 19000, projected: 18500 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high': 
        return { 
          borderClass: 'border-danger', 
          textClass: 'text-danger', 
          bgClass: 'bg-danger',
          icon: XCircle,
          label: 'High Priority'
        };
      case 'medium': 
        return { 
          borderClass: 'border-warning', 
          textClass: 'text-warning', 
          bgClass: 'bg-warning',
          icon: Clock,
          label: 'Medium Priority'
        };
      case 'low': 
        return { 
          borderClass: 'border-success', 
          textClass: 'text-success', 
          bgClass: 'bg-success',
          icon: CheckCircle,
          label: 'Low Priority'
        };
      default: 
        return { 
          borderClass: 'border-secondary', 
          textClass: 'text-secondary', 
          bgClass: 'bg-secondary',
          icon: Clock,
          label: 'Normal'
        };
    }
  };

  const handleWhatIfSimulation = () => {
    if (whatIfScenario && whatIfAmount) {
      const amount = parseFloat(whatIfAmount);
      let result = '';
      
      switch (whatIfScenario) {
        case 'reduce-expenses':
          const newSavings = 13000 + amount;
          const monthsToGoal = Math.ceil((100000 - 67500) / newSavings);
          result = `💡 Impact Analysis\n\n• Your monthly savings would increase to ${formatCurrency(newSavings)}\n• Annual savings boost: ${formatCurrency(amount * 12)}\n• Emergency fund goal reached ${Math.max(0, Math.ceil((37000 * 3 - 67500) / 13000) - monthsToGoal)} months faster\n• Total time to R100k goal: ${monthsToGoal} months\n\nRecommendation: Focus on the largest expense categories first for maximum impact.`;
          break;
        case 'increase-income':
          const netIncrease = amount * 0.75; // Assuming 25% goes to taxes
          const totalSavings = 13000 + netIncrease;
          result = `💰 Income Boost Analysis\n\n• Net monthly increase (after tax): ${formatCurrency(netIncrease)}\n• New monthly savings potential: ${formatCurrency(totalSavings)}\n• Annual additional income: ${formatCurrency(amount * 12)}\n• Emergency fund target reached in ${Math.ceil((37000 * 3 - 67500) / totalSavings)} months\n\nGrowth Opportunity: Consider investing the extra income for compound growth.`;
          break;
        case 'debt-payment':
          const monthsToPay = Math.ceil(25000 / (1800 + amount));
          const interestSaved = (25000 * 0.18 * 0.3);
          result = `💳 Debt Freedom Plan\n\n• Credit card paid off in ${monthsToPay} months (vs ${Math.ceil(25000/1800)} months currently)\n• Interest savings: ${formatCurrency(interestSaved)}\n• Monthly cashflow improvement after payoff: ${formatCurrency(1800 + amount)}\n• Total debt-free timeline reduced by ${Math.ceil(25000/1800) - monthsToPay} months\n\nNext Step: Apply freed-up payments to emergency fund after debt clearance.`;
          break;
        case 'invest':
          const monthlyGrowth = amount * 0.08 / 12; // 8% annual return
          const yearValue = amount * 12 + (monthlyGrowth * 12 * 6.5); // Approximate compound growth
          result = `📊 Investment Projection\n\n• Monthly investment: ${formatCurrency(amount)}\n• Projected annual return: 8%\n• Estimated value after 1 year: ${formatCurrency(yearValue)}\n• 10-year projection: ${formatCurrency(amount * 12 * 10 * 1.8)}\n\nCompound Power: Starting early amplifies long-term wealth building significantly.`;
          break;
        default:
          result = 'Please select a scenario and enter an amount to see projections.';
      }
      
      setWhatIfResult(result);
    }
  };

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="d-flex" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidetag
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />

        {/* Main Content Area */}
        <div className="flex-grow-1" style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', transition: 'margin-left 0.3s ease' }}>
          {/* Top Navbar */}
          <HeaderNav />

          {/* Page Content */}
          <div className="bg-light min-vh-100">
            {/* Page Header */}
            <section className="bg-white border-bottom">
              <div className="container-fluid py-4">
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                  <div>
                    <h2 className="h3 fw-bold text-dark mb-2">Advice & Insights</h2>
                    <p className="text-muted mb-0">Personalized recommendations to optimize your financial health</p>
                  </div>
                  <div className="d-flex gap-2 mt-3 mt-md-0">
                    <button className="btn btn-primary d-flex align-items-center gap-2">
                      <Lightbulb size={18} />
                      Get More Tips
                    </button>
                    <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                      <FileText size={18} />
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-fluid py-4">
              {/* Problem Areas Section */}
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                    <AlertTriangle className="text-warning" size={20} />
                    Areas Needing Attention
                  </h4>
                </div>
                {problemAreas.map((area, index) => {
                  const config = getSeverityConfig(area.severity);
                  const AreaIcon = area.icon;
                  return (
                    <div key={index} className="col-lg-6 mb-3">
                      <div className={`card border-2 ${config.borderClass} shadow-sm`}>
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <AreaIcon size={20} className={`me-2 ${config.textClass}`} />
                            <h5 className="card-title mb-0">{area.title}</h5>
                          </div>
                          <ul className="list-unstyled mb-0 mt-2">
                            {area.items.map((item, idx) => (
                              <li key={idx} className="mb-1">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Forecast Chart Section */}
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                    <BarChart2 className="text-primary" size={20} />
                    Financial Forecast
                  </h4>
                  <div className="card shadow-sm p-3" style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                        <XAxis dataKey="month" stroke="#6c757d" style={{ fontSize: '12px' }} />
                        <YAxis stroke="#6c757d" tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`} style={{ fontSize: '12px' }} />
                        <Tooltip formatter={(value) => [formatCurrency(value)]} />
                        <Area type="monotone" dataKey="savings" stackId="1" stroke="#198754" fill="#198754" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="projected" stackId="2" stroke="#0d6efd" fill="#0d6efd" fillOpacity={0.1} strokeDasharray="5,5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* What-If Scenario Simulation */}
              <div className="row mb-4">
                <div className="col-12">
                  <h4 className="fw-semibold mb-3 d-flex align-items-center gap-2">
                    <Calculator className="text-success" size={20} />
                    What-If Scenario Simulation
                  </h4>
                  <div className="card shadow-sm p-3">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <select className="form-select" value={whatIfScenario} onChange={(e) => setWhatIfScenario(e.target.value)}>
                          <option value="">Select Scenario</option>
                          <option value="reduce-expenses">Reduce Expenses</option>
                          <option value="increase-income">Increase Income</option>
                          <option value="debt-payment">Pay off Debt Faster</option>
                          <option value="invest">Invest Extra Funds</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Amount"
                          value={whatIfAmount}
                          onChange={(e) => setWhatIfAmount(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <button className="btn btn-primary w-100" onClick={handleWhatIfSimulation}>
                          Simulate
                        </button>
                      </div>
                    </div>
                    {whatIfResult && (
                      <div className="mt-3 p-3 bg-light border rounded" style={{ whiteSpace: 'pre-line', fontSize: '14px' }}>
                        {whatIfResult}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdviceInsightsPage;

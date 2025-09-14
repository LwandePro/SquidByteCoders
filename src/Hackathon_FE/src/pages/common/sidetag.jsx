// Sidebar.js
import React from 'react';
import { Menu, Home, PieChart as PieChartIcon, CreditCard, Target, FileText, Settings, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Sidetag = ({ sidebarCollapsed, setSidebarCollapsed, activeMenuItem, setActiveMenuItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: PieChartIcon, path: '/user/insights' },
    // { id: 'accounts', label: 'Accounts', icon: CreditCard, path: '/accounts' },
    { id: 'goals', label: 'Goals', icon: Target, path: '/user/goals' },
    // { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
    // { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div 
      className={`bg-dark text-white ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
      style={{
        width: sidebarCollapsed ? '80px' : '250px',
        minHeight: '100vh',
        transition: 'width 0.3s ease',
        position: 'fixed',
        zIndex: 1040,
        top: 0,
        left: 0
      }}
    >
      {/* Sidebar Header */}
      <div className="p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-between">
          {!sidebarCollapsed && (
            <div>
              <h5 className="mb-0 fw-bold">FinanceApp</h5>
              <small className="text-light opacity-75">Personal Finance</small>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="btn btn-link text-white p-1"
            style={{textDecoration: 'none'}}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-3">
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id} className="nav-item mb-1">
                <button
                  onClick={() => {
                    setActiveMenuItem(item.id);
                    navigate(item.path); // Navigate to the route
                  }}
                  className={`nav-link text-white d-flex align-items-center w-100 border-0 rounded-0 px-3 py-2 ${
                    activeMenuItem === item.id ? 'bg-primary' : 'bg-transparent'
                  }`}
                  style={{
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <IconComponent size={18} className="me-3" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      {!sidebarCollapsed && (
        <div className="position-absolute bottom-0 w-100 p-3 border-top border-secondary">
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
              <User size={20} />
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium">John Doe</div>
              <small className="text-light opacity-75">Premium Plan</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidetag;

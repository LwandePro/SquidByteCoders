// HeaderNav.js
import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const HeaderNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        <div className="d-flex align-items-center flex-grow-1">
          {/* Search Bar */}
          <div className="me-auto" style={{maxWidth: '400px', width: '100%'}}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search transactions, accounts..."
              />
            </div>
          </div>

          {/* Right Side Items */}
          <div className="d-flex align-items-center gap-3">
            {/* Notifications */}
            <div className="position-relative">
              <button className="btn btn-link text-muted p-2">
                <Bell size={20} />
              </button>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.7rem'}}>
                3
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-link text-muted dropdown-toggle p-0 border-0"
                type="button"
                data-bs-toggle="dropdown"
              >
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                    <User size={16} className="text-white" />
                  </div>
                  <div className="text-start d-none d-md-block">
                    <div className="fw-medium text-dark" style={{fontSize: '14px'}}>John Doe</div>
                    <small className="text-muted">john@example.com</small>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <NavLink to="/dashboard" onClick={toggleSidebar}>
                  <i className="fas fa-chart-line"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              
              <li className="nav-section">
                <h4>Market Data</h4>
              </li>
              <li>
                <NavLink to="/stocks" onClick={toggleSidebar}>
                  <i className="fas fa-chart-bar"></i>
                  <span>Stocks</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/etfs" onClick={toggleSidebar}>
                  <i className="fas fa-layer-group"></i>
                  <span>ETFs</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/market-overview" onClick={toggleSidebar}>
                  <i className="fas fa-globe"></i>
                  <span>Market Overview</span>
                </NavLink>
              </li>
              
              <li className="nav-section">
                <h4>Analysis</h4>
              </li>
              <li>
                <NavLink to="/compare" onClick={toggleSidebar}>
                  <i className="fas fa-balance-scale"></i>
                  <span>Compare Securities</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/screener" onClick={toggleSidebar}>
                  <i className="fas fa-filter"></i>
                  <span>Screener</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/ai-insights" onClick={toggleSidebar}>
                  <i className="fas fa-robot"></i>
                  <span>AI Insights</span>
                </NavLink>
              </li>
              
              {user && (
                <>
                  <li className="nav-section">
                    <h4>Personal</h4>
                  </li>
                  <li>
                    <NavLink to="/watchlists" onClick={toggleSidebar}>
                      <i className="fas fa-star"></i>
                      <span>Watchlists</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/alerts" onClick={toggleSidebar}>
                      <i className="fas fa-bell"></i>
                      <span>Alerts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/notes" onClick={toggleSidebar}>
                      <i className="fas fa-sticky-note"></i>
                      <span>Notes</span>
                    </NavLink>
                  </li>
                </>
              )}
              
              <li className="nav-section">
                <h4>Resources</h4>
              </li>
              <li>
                <NavLink to="/news" onClick={toggleSidebar}>
                  <i className="fas fa-newspaper"></i>
                  <span>News</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/education" onClick={toggleSidebar}>
                  <i className="fas fa-graduation-cap"></i>
                  <span>Education</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" onClick={toggleSidebar}>
                  <i className="fas fa-question-circle"></i>
                  <span>Help & Support</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        
        {user && (
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <p className="user-name">{user.name || 'User'}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

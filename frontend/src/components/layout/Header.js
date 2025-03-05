import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = ({ isAuthenticated, user, logout: propLogout, toggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext) || {};
  const authUser = user || authContext.user;
  const authLogout = propLogout || authContext.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (authLogout) {
      authLogout();
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Global Stock Analyzer</h1>
          </Link>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </li>
            <li>
              <Link to="/stocks" onClick={() => setIsMenuOpen(false)}>Stocks</Link>
            </li>
            <li>
              <Link to="/etfs" onClick={() => setIsMenuOpen(false)}>ETFs</Link>
            </li>
            <li>
              <Link to="/watchlists" onClick={() => setIsMenuOpen(false)}>Watchlists</Link>
            </li>
            <li>
              <Link to="/compare" onClick={() => setIsMenuOpen(false)}>Compare</Link>
            </li>
            {authUser ? (
              <>
                <li className="dropdown">
                  <button className="dropdown-toggle">
                    {authUser.name || authUser.email}
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

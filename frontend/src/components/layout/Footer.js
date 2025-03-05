import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Global Stock Analyzer</h4>
          <p>A comprehensive platform for comparative analysis of global stocks and ETFs.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/stocks">Stocks</Link></li>
            <li><Link to="/etfs">ETFs</Link></li>
            <li><Link to="/compare">Compare</Link></li>
            <li><Link to="/watchlists">Watchlists</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/news">Market News</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/help">Help & Support</Link></li>
            <li><Link to="/api-docs">API Documentation</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Global Stock Analyzer. All rights reserved.</p>
        <p className="disclaimer-text">
          Financial data provided is for informational purposes only and not for trading purposes or financial advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

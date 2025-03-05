import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <i className="fas fa-chart-line"></i>
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Back to Dashboard
          </Link>
          <Link to="/stocks" className="btn btn-outline">
            Browse Stocks
          </Link>
        </div>
        <div className="not-found-help">
          <p>
            Need help? <Link to="/contact">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Mock data for the dashboard
  const mockMarketData = {
    indices: [
      { name: 'S&P 500', value: 4892.37, change: 23.15, percentChange: 0.48 },
      { name: 'Dow Jones', value: 38239.98, change: 125.69, percentChange: 0.33 },
      { name: 'NASDAQ', value: 15927.90, change: 183.04, percentChange: 1.16 },
      { name: 'Russell 2000', value: 2053.15, change: -5.93, percentChange: -0.29 }
    ],
    sectors: [
      { name: 'Technology', performance: 1.45 },
      { name: 'Healthcare', performance: 0.82 },
      { name: 'Financials', performance: 0.23 },
      { name: 'Consumer Discretionary', performance: -0.37 },
      { name: 'Industrials', performance: 0.56 },
      { name: 'Energy', performance: -1.24 },
      { name: 'Materials', performance: 0.12 }
    ],
    stats: {
      advancers: 285,
      decliners: 215,
      unchanged: 10,
      newHighs: 45,
      newLows: 12,
      volume: 4.5
    }
  };

  // User information - in a real app, this would come from context or props
  const user = JSON.parse(localStorage.getItem('user')) || null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-message">
          {user ? `Welcome back, ${user.name || 'Investor'}!` : 'Welcome to Global Stock Analyzer'}
        </p>
      </div>

      <div className="dashboard-grid">
        {/* Market Overview Section */}
        <div className="dashboard-section market-overview-section">
          <div className="section-header">
            <h2>Market Overview</h2>
            <Link to="/market-overview" className="view-all">View Details</Link>
          </div>
          <div className="market-indices">
            {mockMarketData.indices.map((index, idx) => (
              <div key={idx} className="market-index-card">
                <h3>{index.name}</h3>
                <div className="index-value">{index.value.toFixed(2)}</div>
                <div className={`index-change ${index.change >= 0 ? 'positive' : 'negative'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.percentChange.toFixed(2)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="dashboard-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/compare" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Compare Securities</h3>
              <p>Analyze and compare multiple stocks or ETFs side by side</p>
            </Link>
            <Link to="/screener" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-filter"></i>
              </div>
              <h3>Stock Screener</h3>
              <p>Find securities matching your specific criteria</p>
            </Link>
            <Link to="/ai-insights" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Insights</h3>
              <p>Get AI-powered analysis and recommendations</p>
            </Link>
            {user && (
              <Link to="/watchlists/create" className="quick-action-card">
                <div className="quick-action-icon">
                  <i className="fas fa-plus-circle"></i>
                </div>
                <h3>Create Watchlist</h3>
                <p>Build a new watchlist to track your favorite securities</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

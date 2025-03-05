import React from 'react';
import { Link } from 'react-router-dom';
import './TopPerformers.css';

const TopPerformers = ({ items, type }) => {
  // Helper function to format percentage change
  const formatChange = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Determine color based on value (positive or negative)
  const getChangeColor = (value) => {
    return value >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
  };

  // Get the route path based on item type
  const getRoutePath = (item) => {
    return `/${type === 'stock' ? 'stocks' : 'etfs'}/${item.symbol}`;
  };

  return (
    <div className="top-performers">
      {items.length === 0 ? (
        <div className="no-data">
          <p>No data available</p>
        </div>
      ) : (
        <div className="performers-list">
          {items.map((item) => (
            <Link 
              key={item._id} 
              to={getRoutePath(item)} 
              className="performer-card"
            >
              <div className="performer-symbol-container">
                <div className="performer-symbol">{item.symbol}</div>
                <div className="performer-name">{item.name}</div>
              </div>
              
              <div className="performer-metrics">
                <div className="performer-price">${item.price.toFixed(2)}</div>
                <div 
                  className="performer-change" 
                  style={{ color: getChangeColor(item.change) }}
                >
                  {formatChange(item.change)}
                  <i className={`fas fa-caret-${item.change >= 0 ? 'up' : 'down'} ml-1`}></i>
                </div>
              </div>
              
              <div className="performer-chart">
                {/* This would be replaced with a mini sparkline chart in a real implementation */}
                <div 
                  className={`sparkline ${item.change >= 0 ? 'positive' : 'negative'}`}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPerformers;

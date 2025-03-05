import React from 'react';
import { Link } from 'react-router-dom';
import './WatchlistPreview.css';

const WatchlistPreview = ({ watchlists }) => {
  // Helper function to format percentage change
  const formatChange = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Determine color based on value (positive or negative)
  const getChangeColor = (value) => {
    return value >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
  };

  // Get a preview of securities (up to 5) for each watchlist
  const getWatchlistPreview = (watchlist) => {
    const preview = watchlist.securities.slice(0, 5);
    return preview;
  };

  return (
    <div className="watchlist-preview">
      {watchlists.length === 0 ? (
        <div className="empty-watchlist">
          <p>You don't have any watchlists yet.</p>
          <Link to="/watchlists/create" className="btn btn-primary btn-sm">
            Create Watchlist
          </Link>
        </div>
      ) : (
        <div className="watchlist-tabs">
          <div className="tabs-header">
            {watchlists.map((watchlist, index) => (
              <button 
                key={watchlist._id} 
                className={`tab-button ${index === 0 ? 'active' : ''}`}
                data-tab={`watchlist-${watchlist._id}`}
              >
                {watchlist.name}
              </button>
            ))}
          </div>
          
          <div className="tabs-content">
            {watchlists.map((watchlist, index) => (
              <div 
                key={watchlist._id} 
                className={`tab-content ${index === 0 ? 'active' : ''}`}
                id={`watchlist-${watchlist._id}`}
              >
                {watchlist.securities.length === 0 ? (
                  <div className="empty-securities">
                    <p>No securities in this watchlist.</p>
                    <Link to={`/watchlists/${watchlist._id}/edit`} className="btn btn-outline btn-sm">
                      Add Securities
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="watchlist-securities">
                      <table className="securities-table">
                        <thead>
                          <tr>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getWatchlistPreview(watchlist).map((security) => (
                            <tr key={security._id}>
                              <td>
                                <Link to={`/${security.type === 'stock' ? 'stocks' : 'etfs'}/${security.symbol}`}>
                                  <div className="security-info">
                                    <span className="security-symbol">{security.symbol}</span>
                                    <span className="security-name">{security.name}</span>
                                  </div>
                                </Link>
                              </td>
                              <td>${security.price.toFixed(2)}</td>
                              <td>
                                <span 
                                  className="security-change" 
                                  style={{ color: getChangeColor(security.change) }}
                                >
                                  {formatChange(security.change)}
                                  <i className={`fas fa-caret-${security.change >= 0 ? 'up' : 'down'} ml-1`}></i>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {watchlist.securities.length > 5 && (
                      <div className="more-securities">
                        <Link to={`/watchlists/${watchlist._id}`}>
                          View all {watchlist.securities.length} securities
                        </Link>
                      </div>
                    )}
                  </>
                )}
                
                <div className="watchlist-actions">
                  <Link to={`/watchlists/${watchlist._id}`} className="btn btn-outline btn-sm">
                    View Details
                  </Link>
                  <Link to={`/watchlists/${watchlist._id}/edit`} className="btn btn-outline btn-sm">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPreview;

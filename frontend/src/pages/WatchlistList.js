import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import './WatchlistList.css';

const WatchlistList = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [newWatchlist, setNewWatchlist] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock watchlist data
        const mockWatchlists = [
          {
            id: '1',
            name: 'Tech Giants',
            description: 'Major technology companies with strong market positions',
            createdAt: '2025-02-15T10:30:00Z',
            updatedAt: '2025-03-01T14:45:00Z',
            stocks: [
              { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.45, changePercent: 0.77 },
              { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.50, change: 2.30, changePercent: 0.56 },
              { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.20, change: -0.80, changePercent: -0.45 },
              { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.35, change: 1.25, changePercent: 0.71 },
              { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.92, change: 3.45, changePercent: 0.72 }
            ],
            performance: {
              daily: 0.42,
              weekly: 1.85,
              monthly: 3.65,
              yearly: 22.40
            }
          },
          {
            id: '2',
            name: 'Dividend Champions',
            description: 'Stocks with strong dividend history and growth',
            createdAt: '2025-01-20T09:15:00Z',
            updatedAt: '2025-02-28T16:30:00Z',
            stocks: [
              { symbol: 'JNJ', name: 'Johnson & Johnson', price: 152.75, change: 0.25, changePercent: 0.16 },
              { symbol: 'PG', name: 'Procter & Gamble Co.', price: 162.30, change: 0.65, changePercent: 0.40 },
              { symbol: 'KO', name: 'Coca-Cola Company', price: 61.45, change: -0.15, changePercent: -0.24 },
              { symbol: 'PEP', name: 'PepsiCo Inc.', price: 172.80, change: 0.45, changePercent: 0.26 }
            ],
            performance: {
              daily: 0.15,
              weekly: 0.75,
              monthly: 1.85,
              yearly: 8.40
            }
          },
          {
            id: '3',
            name: 'Growth Stocks',
            description: 'High-growth companies with strong future potential',
            createdAt: '2025-02-05T11:45:00Z',
            updatedAt: '2025-03-04T13:20:00Z',
            stocks: [
              { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 825.40, change: 15.75, changePercent: 1.94 },
              { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.25, change: 2.45, changePercent: 1.39 },
              { symbol: 'TSLA', name: 'Tesla Inc.', price: 178.90, change: -2.35, changePercent: -1.30 },
              { symbol: 'CRM', name: 'Salesforce Inc.', price: 298.45, change: 3.25, changePercent: 1.10 }
            ],
            performance: {
              daily: 0.78,
              weekly: 3.25,
              monthly: 7.85,
              yearly: 35.40
            }
          }
        ];
        
        setWatchlists(mockWatchlists);
        setError(null);
      } catch (err) {
        console.error('Error fetching watchlists:', err);
        setError('Failed to load watchlists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  const handleCreateWatchlist = () => {
    // In a real application, this would make an API call to create a new watchlist
    const newWatchlistData = {
      id: `${watchlists.length + 1}`,
      name: newWatchlist.name,
      description: newWatchlist.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stocks: [],
      performance: {
        daily: 0,
        weekly: 0,
        monthly: 0,
        yearly: 0
      }
    };
    
    setWatchlists([...watchlists, newWatchlistData]);
    setNewWatchlist({ name: '', description: '' });
    setShowCreateModal(false);
  };

  const handleDeleteWatchlist = () => {
    // In a real application, this would make an API call to delete the watchlist
    setWatchlists(watchlists.filter(w => w.id !== selectedWatchlist.id));
    setSelectedWatchlist(null);
    setShowDeleteModal(false);
  };

  const openDeleteModal = (watchlist) => {
    setSelectedWatchlist(watchlist);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return <Spinner text="Loading watchlists..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="watchlist-list-page">
      <div className="watchlist-list-header">
        <h1 className="watchlist-list-title">My Watchlists</h1>
        <div className="watchlist-list-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="fas fa-plus mr-1"></i> Create New Watchlist
          </button>
        </div>
      </div>
      
      {watchlists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <i className="fas fa-list-ul"></i>
          </div>
          <h3 className="empty-state-title">No Watchlists Yet</h3>
          <p className="empty-state-text">
            Create your first watchlist to start tracking your favorite stocks and ETFs.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="fas fa-plus mr-1"></i> Create Watchlist
          </button>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlists.map((watchlist) => (
            <div className="watchlist-card" key={watchlist.id}>
              <div className="watchlist-card-header">
                <h3 className="watchlist-card-title">{watchlist.name}</h3>
                <div className="watchlist-card-actions">
                  <button 
                    className="watchlist-card-action" 
                    title="Edit Watchlist"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="watchlist-card-action" 
                    title="Delete Watchlist"
                    onClick={() => openDeleteModal(watchlist)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              
              <div className="watchlist-card-body">
                <div className="watchlist-card-stats">
                  <div className="watchlist-card-stat">
                    <div className="watchlist-card-stat-value">{watchlist.stocks.length}</div>
                    <div className="watchlist-card-stat-label">Stocks</div>
                  </div>
                  <div className="watchlist-card-stat">
                    <div 
                      className="watchlist-card-stat-value"
                      style={{ 
                        color: watchlist.performance.daily >= 0 
                          ? 'var(--success-color)' 
                          : 'var(--danger-color)' 
                      }}
                    >
                      {watchlist.performance.daily >= 0 ? '+' : ''}
                      {watchlist.performance.daily.toFixed(2)}%
                    </div>
                    <div className="watchlist-card-stat-label">Today</div>
                  </div>
                  <div className="watchlist-card-stat">
                    <div 
                      className="watchlist-card-stat-value"
                      style={{ 
                        color: watchlist.performance.monthly >= 0 
                          ? 'var(--success-color)' 
                          : 'var(--danger-color)' 
                      }}
                    >
                      {watchlist.performance.monthly >= 0 ? '+' : ''}
                      {watchlist.performance.monthly.toFixed(2)}%
                    </div>
                    <div className="watchlist-card-stat-label">1 Month</div>
                  </div>
                </div>
                
                <ul className="watchlist-card-stocks">
                  {watchlist.stocks.slice(0, 3).map((stock, index) => (
                    <li className="watchlist-card-stock" key={index}>
                      <div className="watchlist-card-stock-name">
                        <span className="watchlist-card-stock-symbol">{stock.symbol}</span>
                        <span className="watchlist-card-stock-company">{stock.name}</span>
                      </div>
                      <div className="watchlist-card-stock-price">
                        <div className="watchlist-card-stock-value">${stock.price.toFixed(2)}</div>
                        <div 
                          className={`watchlist-card-stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}
                        >
                          {stock.change >= 0 ? '+' : ''}
                          {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}
                          {stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                    </li>
                  ))}
                  
                  {watchlist.stocks.length > 3 && (
                    <li className="watchlist-card-stock" style={{ justifyContent: 'center' }}>
                      <Link to={`/watchlists/${watchlist.id}`} style={{ color: 'var(--text-secondary)' }}>
                        +{watchlist.stocks.length - 3} more stocks
                      </Link>
                    </li>
                  )}
                  
                  {watchlist.stocks.length === 0 && (
                    <li className="watchlist-card-stock" style={{ justifyContent: 'center' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>No stocks added yet</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="watchlist-card-footer">
                <div className="watchlist-card-date">
                  Updated {formatDate(watchlist.updatedAt)}
                </div>
                <Link to={`/watchlists/${watchlist.id}`} className="watchlist-card-view">
                  View Details <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          ))}
          
          <div 
            className="create-watchlist-card"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="create-watchlist-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <div className="create-watchlist-text">Create New Watchlist</div>
            <div className="create-watchlist-subtext">
              Track and analyze your favorite stocks
            </div>
          </div>
        </div>
      )}
      
      {/* Create Watchlist Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Watchlist</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Watchlist Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter watchlist name"
                  value={newWatchlist.name}
                  onChange={(e) => setNewWatchlist({...newWatchlist, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Enter a description for your watchlist"
                  value={newWatchlist.description}
                  onChange={(e) => setNewWatchlist({...newWatchlist, description: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateWatchlist}
                disabled={!newWatchlist.name.trim()}
              >
                Create Watchlist
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedWatchlist && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Delete Watchlist</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the watchlist "{selectedWatchlist.name}"?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteWatchlist}
              >
                Delete Watchlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistList;

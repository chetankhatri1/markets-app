import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';
import './Watchlist.css';

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlists, setWatchlists] = useState([]);
  const [activeWatchlist, setActiveWatchlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'symbol',
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an actual API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock watchlists data
        const mockWatchlists = [
          {
            id: '1',
            name: 'My Portfolio',
            stocks: [
              { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.45, changePercent: 0.77, sector: 'Technology', addedAt: '2025-01-15' },
              { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 2.10, changePercent: 0.51, sector: 'Technology', addedAt: '2025-01-15' },
              { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 174.13, change: 0.87, changePercent: 0.50, sector: 'Technology', addedAt: '2025-01-15' },
              { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.15, change: 1.23, changePercent: 0.70, sector: 'Consumer Cyclical', addedAt: '2025-01-15' },
            ]
          },
          {
            id: '2',
            name: 'Tech Stocks',
            stocks: [
              { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.45, changePercent: 0.77, sector: 'Technology', addedAt: '2025-01-20' },
              { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 2.10, changePercent: 0.51, sector: 'Technology', addedAt: '2025-01-20' },
              { id: '5', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 924.79, change: 3.45, changePercent: 0.37, sector: 'Technology', addedAt: '2025-01-20' },
              { id: '6', symbol: 'META', name: 'Meta Platforms Inc.', price: 474.32, change: 1.98, changePercent: 0.42, sector: 'Technology', addedAt: '2025-01-20' },
              { id: '17', symbol: 'INTC', name: 'Intel Corp.', price: 32.45, change: -2.34, changePercent: -6.73, sector: 'Technology', addedAt: '2025-01-20' },
            ]
          },
          {
            id: '3',
            name: 'Dividend Stocks',
            stocks: [
              { id: '9', symbol: 'JNJ', name: 'Johnson & Johnson', price: 147.89, change: -0.32, changePercent: -0.22, sector: 'Healthcare', addedAt: '2025-02-05' },
              { id: '11', symbol: 'PG', name: 'Procter & Gamble', price: 165.23, change: 0.54, changePercent: 0.33, sector: 'Consumer Defensive', addedAt: '2025-02-05' },
              { id: '18', symbol: 'KO', name: 'Coca-Cola Company', price: 62.45, change: 0.21, changePercent: 0.34, sector: 'Consumer Defensive', addedAt: '2025-02-05' },
              { id: '20', symbol: 'WMT', name: 'Walmart Inc.', price: 65.32, change: 0.67, changePercent: 1.04, sector: 'Consumer Defensive', addedAt: '2025-02-05' },
            ]
          }
        ];
        
        setWatchlists(mockWatchlists);
        setActiveWatchlist(mockWatchlists[0]);
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
    if (!newWatchlistName.trim()) {
      return;
    }
    
    const newWatchlist = {
      id: `${watchlists.length + 1}`,
      name: newWatchlistName,
      stocks: []
    };
    
    setWatchlists([...watchlists, newWatchlist]);
    setActiveWatchlist(newWatchlist);
    setNewWatchlistName('');
    setIsCreatingNew(false);
  };

  const handleDeleteWatchlist = (id) => {
    const updatedWatchlists = watchlists.filter(watchlist => watchlist.id !== id);
    setWatchlists(updatedWatchlists);
    
    if (activeWatchlist.id === id) {
      setActiveWatchlist(updatedWatchlists.length > 0 ? updatedWatchlists[0] : null);
    }
  };

  const handleRemoveStock = (stockId) => {
    const updatedWatchlist = {
      ...activeWatchlist,
      stocks: activeWatchlist.stocks.filter(stock => stock.id !== stockId)
    };
    
    setActiveWatchlist(updatedWatchlist);
    setWatchlists(watchlists.map(watchlist => 
      watchlist.id === activeWatchlist.id ? updatedWatchlist : watchlist
    ));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Format percentage change with + or - sign
  const formatChange = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Determine color based on value (positive or negative)
  const getChangeColor = (value) => {
    return value >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
  };

  // Filter stocks based on search term
  const filteredStocks = activeWatchlist?.stocks.filter(stock => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return stock.symbol.toLowerCase().includes(term) || 
           stock.name.toLowerCase().includes(term);
  }) || [];

  // Sort filtered stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

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
    <div className="watchlist-page">
      <div className="page-header">
        <h1>My Watchlists</h1>
        <p>Track and analyze your favorite stocks</p>
      </div>
      
      <div className="watchlist-container">
        <div className="watchlist-sidebar">
          <div className="watchlist-tabs">
            {watchlists.map(watchlist => (
              <button
                key={watchlist.id}
                className={`watchlist-tab ${activeWatchlist?.id === watchlist.id ? 'active' : ''}`}
                onClick={() => setActiveWatchlist(watchlist)}
              >
                {watchlist.name}
                <span className="stock-count">{watchlist.stocks.length}</span>
              </button>
            ))}
          </div>
          
          {isCreatingNew ? (
            <div className="new-watchlist-form">
              <input
                type="text"
                placeholder="Watchlist name"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
                className="watchlist-name-input"
                autoFocus
              />
              <div className="form-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleCreateWatchlist}
                >
                  Create
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setNewWatchlistName('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="btn btn-primary create-watchlist"
              onClick={() => setIsCreatingNew(true)}
            >
              <i className="fas fa-plus mr-1"></i> New Watchlist
            </button>
          )}
          
          {activeWatchlist && (
            <div className="watchlist-actions">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleDeleteWatchlist(activeWatchlist.id)}
              >
                <i className="fas fa-trash-alt mr-1"></i> Delete Watchlist
              </button>
            </div>
          )}
        </div>
        
        <div className="watchlist-content">
          {activeWatchlist ? (
            <>
              <div className="watchlist-header">
                <h2>{activeWatchlist.name}</h2>
                <div className="watchlist-controls">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search in this watchlist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    <i className="fas fa-search search-icon"></i>
                  </div>
                  <Link to="/stocks" className="btn btn-primary">
                    <i className="fas fa-plus mr-1"></i> Add Stocks
                  </Link>
                </div>
              </div>
              
              {activeWatchlist.stocks.length === 0 ? (
                <div className="empty-watchlist">
                  <div className="empty-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>This watchlist is empty</h3>
                  <p>Start adding stocks to track their performance</p>
                  <Link to="/stocks" className="btn btn-primary">
                    Browse Stocks
                  </Link>
                </div>
              ) : (
                <>
                  <div className="results-info">
                    <p>Showing {sortedStocks.length} of {activeWatchlist.stocks.length} stocks</p>
                  </div>
                  
                  <div className="watchlist-table-container">
                    <table className="watchlist-table">
                      <thead>
                        <tr>
                          <th onClick={() => handleSort('symbol')} className={sortConfig.key === 'symbol' ? sortConfig.direction : ''}>
                            Symbol
                            <i className="fas fa-sort"></i>
                          </th>
                          <th onClick={() => handleSort('name')} className={sortConfig.key === 'name' ? sortConfig.direction : ''}>
                            Name
                            <i className="fas fa-sort"></i>
                          </th>
                          <th onClick={() => handleSort('price')} className={sortConfig.key === 'price' ? sortConfig.direction : ''}>
                            Price
                            <i className="fas fa-sort"></i>
                          </th>
                          <th onClick={() => handleSort('change')} className={sortConfig.key === 'change' ? sortConfig.direction : ''}>
                            Change
                            <i className="fas fa-sort"></i>
                          </th>
                          <th onClick={() => handleSort('sector')} className={sortConfig.key === 'sector' ? sortConfig.direction : ''}>
                            Sector
                            <i className="fas fa-sort"></i>
                          </th>
                          <th onClick={() => handleSort('addedAt')} className={sortConfig.key === 'addedAt' ? sortConfig.direction : ''}>
                            Added On
                            <i className="fas fa-sort"></i>
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedStocks.map((stock) => (
                          <tr key={stock.id}>
                            <td className="symbol-cell">
                              <Link to={`/stocks/${stock.symbol}`} className="stock-symbol">
                                {stock.symbol}
                              </Link>
                            </td>
                            <td className="name-cell">
                              <Link to={`/stocks/${stock.symbol}`} className="stock-name">
                                {stock.name}
                              </Link>
                            </td>
                            <td className="price-cell">${stock.price.toFixed(2)}</td>
                            <td 
                              className="change-cell" 
                              style={{ color: getChangeColor(stock.change) }}
                            >
                              {formatChange(stock.changePercent)}
                              <i className={`fas fa-caret-${stock.change >= 0 ? 'up' : 'down'} ml-1`}></i>
                            </td>
                            <td className="sector-cell">{stock.sector}</td>
                            <td className="date-cell">{stock.addedAt}</td>
                            <td className="actions-cell">
                              <div className="stock-actions">
                                <button 
                                  className="btn-icon" 
                                  title="Remove from Watchlist"
                                  onClick={() => handleRemoveStock(stock.id)}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                                <Link 
                                  to={`/stocks/${stock.symbol}`} 
                                  className="btn-icon" 
                                  title="View Details"
                                >
                                  <i className="fas fa-chart-line"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="empty-watchlist">
              <div className="empty-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>No watchlists found</h3>
              <p>Create your first watchlist to start tracking stocks</p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsCreatingNew(true)}
              >
                Create Watchlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;

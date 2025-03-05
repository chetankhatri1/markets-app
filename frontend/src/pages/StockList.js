import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/common/Spinner';
import './StockList.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'symbol',
    direction: 'ascending'
  });
  const [filters, setFilters] = useState({
    sector: '',
    priceRange: '',
    marketCap: '',
    performance: ''
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an actual API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStocks = [
          { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.45, marketCap: '2.95T', sector: 'Technology', volume: '58.3M', pe: 31.2 },
          { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 2.10, marketCap: '3.08T', sector: 'Technology', volume: '22.1M', pe: 36.5 },
          { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 174.13, change: 0.87, marketCap: '2.18T', sector: 'Technology', volume: '18.7M', pe: 25.3 },
          { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.15, change: 1.23, marketCap: '1.85T', sector: 'Consumer Cyclical', volume: '32.6M', pe: 60.2 },
          { id: '5', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 924.79, change: 3.45, marketCap: '2.28T', sector: 'Technology', volume: '45.9M', pe: 68.7 },
          { id: '6', symbol: 'META', name: 'Meta Platforms Inc.', price: 474.32, change: 1.98, marketCap: '1.21T', sector: 'Technology', volume: '15.3M', pe: 32.1 },
          { id: '7', symbol: 'TSLA', name: 'Tesla Inc.', price: 175.43, change: 2.65, marketCap: '558.2B', sector: 'Consumer Cyclical', volume: '98.7M', pe: 48.6 },
          { id: '8', symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 408.76, change: 0.32, marketCap: '895.3B', sector: 'Financial Services', volume: '3.2M', pe: 8.4 },
          { id: '9', symbol: 'JNJ', name: 'Johnson & Johnson', price: 147.89, change: -0.32, marketCap: '356.1B', sector: 'Healthcare', volume: '6.5M', pe: 17.2 },
          { id: '10', symbol: 'V', name: 'Visa Inc.', price: 275.64, change: 0.75, marketCap: '560.8B', sector: 'Financial Services', volume: '5.8M', pe: 30.8 },
          { id: '11', symbol: 'PG', name: 'Procter & Gamble', price: 165.23, change: 0.54, marketCap: '389.5B', sector: 'Consumer Defensive', volume: '4.7M', pe: 27.1 },
          { id: '12', symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.47, change: 1.12, marketCap: '571.2B', sector: 'Financial Services', volume: '7.3M', pe: 12.1 },
          { id: '13', symbol: 'UNH', name: 'UnitedHealth Group Inc.', price: 527.89, change: -0.45, marketCap: '487.3B', sector: 'Healthcare', volume: '2.9M', pe: 24.3 },
          { id: '14', symbol: 'HD', name: 'Home Depot Inc.', price: 342.56, change: 0.23, marketCap: '339.8B', sector: 'Consumer Cyclical', volume: '3.1M', pe: 22.9 },
          { id: '15', symbol: 'DIS', name: 'Walt Disney Co.', price: 112.34, change: -0.87, marketCap: '205.6B', sector: 'Communication Services', volume: '12.4M', pe: 77.5 },
          { id: '16', symbol: 'PFE', name: 'Pfizer Inc.', price: 28.76, change: -1.23, marketCap: '162.7B', sector: 'Healthcare', volume: '35.2M', pe: 9.8 },
          { id: '17', symbol: 'INTC', name: 'Intel Corp.', price: 32.45, change: -2.34, marketCap: '137.2B', sector: 'Technology', volume: '42.8M', pe: 16.7 },
          { id: '18', symbol: 'KO', name: 'Coca-Cola Company', price: 62.45, change: 0.21, marketCap: '269.8B', sector: 'Consumer Defensive', volume: '11.3M', pe: 25.2 },
          { id: '19', symbol: 'MRK', name: 'Merck & Co. Inc.', price: 128.76, change: 1.54, marketCap: '326.4B', sector: 'Healthcare', volume: '8.7M', pe: 22.6 },
          { id: '20', symbol: 'WMT', name: 'Walmart Inc.', price: 65.32, change: 0.67, marketCap: '526.9B', sector: 'Consumer Defensive', volume: '14.2M', pe: 28.3 },
        ];
        
        setStocks(mockStocks);
        setFilteredStocks(mockStocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to load stocks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    // Apply search and filters
    let result = [...stocks];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(stock => 
        stock.symbol.toLowerCase().includes(term) || 
        stock.name.toLowerCase().includes(term)
      );
    }
    
    // Apply sector filter
    if (filters.sector) {
      result = result.filter(stock => stock.sector === filters.sector);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under50':
          result = result.filter(stock => stock.price < 50);
          break;
        case '50to200':
          result = result.filter(stock => stock.price >= 50 && stock.price <= 200);
          break;
        case 'over200':
          result = result.filter(stock => stock.price > 200);
          break;
        default:
          break;
      }
    }
    
    // Apply market cap filter
    if (filters.marketCap) {
      switch (filters.marketCap) {
        case 'small':
          result = result.filter(stock => parseFloat(stock.marketCap) < 10);
          break;
        case 'mid':
          result = result.filter(stock => parseFloat(stock.marketCap) >= 10 && parseFloat(stock.marketCap) < 100);
          break;
        case 'large':
          result = result.filter(stock => parseFloat(stock.marketCap) >= 100 && parseFloat(stock.marketCap) < 1000);
          break;
        case 'mega':
          result = result.filter(stock => parseFloat(stock.marketCap) >= 1000);
          break;
        default:
          break;
      }
    }
    
    // Apply performance filter
    if (filters.performance) {
      switch (filters.performance) {
        case 'positive':
          result = result.filter(stock => stock.change > 0);
          break;
        case 'negative':
          result = result.filter(stock => stock.change < 0);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredStocks(result);
  }, [stocks, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      sector: '',
      priceRange: '',
      marketCap: '',
      performance: ''
    });
    setSortConfig({
      key: 'symbol',
      direction: 'ascending'
    });
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

  if (loading) {
    return <Spinner text="Loading stocks..." />;
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

  // Get unique sectors for filter dropdown
  const sectors = [...new Set(stocks.map(stock => stock.sector))];

  return (
    <div className="stock-list-page">
      <div className="page-header">
        <h1>Stocks</h1>
        <p>Browse and analyze global stocks</p>
      </div>
      
      <div className="stock-list-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by symbol or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="sector">Sector</label>
            <select
              id="sector"
              name="sector"
              value={filters.sector}
              onChange={handleFilterChange}
            >
              <option value="">All Sectors</option>
              {sectors.map((sector, index) => (
                <option key={index} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="priceRange">Price Range</label>
            <select
              id="priceRange"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to200">$50 - $200</option>
              <option value="over200">Over $200</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="marketCap">Market Cap</label>
            <select
              id="marketCap"
              name="marketCap"
              value={filters.marketCap}
              onChange={handleFilterChange}
            >
              <option value="">All Market Caps</option>
              <option value="small">Small Cap (&lt;$10B)</option>
              <option value="mid">Mid Cap ($10B-$100B)</option>
              <option value="large">Large Cap ($100B-$1T)</option>
              <option value="mega">Mega Cap (&gt;$1T)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="performance">Performance</label>
            <select
              id="performance"
              name="performance"
              value={filters.performance}
              onChange={handleFilterChange}
            >
              <option value="">All Performance</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          
          <button 
            className="btn btn-outline btn-sm reset-filters"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      <div className="results-info">
        <p>Showing {filteredStocks.length} of {stocks.length} stocks</p>
      </div>
      
      <div className="stock-list-table-container">
        <table className="stock-list-table">
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
              <th onClick={() => handleSort('marketCap')} className={sortConfig.key === 'marketCap' ? sortConfig.direction : ''}>
                Market Cap
                <i className="fas fa-sort"></i>
              </th>
              <th onClick={() => handleSort('sector')} className={sortConfig.key === 'sector' ? sortConfig.direction : ''}>
                Sector
                <i className="fas fa-sort"></i>
              </th>
              <th onClick={() => handleSort('volume')} className={sortConfig.key === 'volume' ? sortConfig.direction : ''}>
                Volume
                <i className="fas fa-sort"></i>
              </th>
              <th onClick={() => handleSort('pe')} className={sortConfig.key === 'pe' ? sortConfig.direction : ''}>
                P/E
                <i className="fas fa-sort"></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
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
                  {formatChange(stock.change)}
                  <i className={`fas fa-caret-${stock.change >= 0 ? 'up' : 'down'} ml-1`}></i>
                </td>
                <td className="market-cap-cell">{stock.marketCap}</td>
                <td className="sector-cell">{stock.sector}</td>
                <td className="volume-cell">{stock.volume}</td>
                <td className="pe-cell">{stock.pe.toFixed(1)}</td>
                <td className="actions-cell">
                  <div className="stock-actions">
                    <button className="btn-icon" title="Add to Watchlist">
                      <i className="fas fa-plus"></i>
                    </button>
                    <button className="btn-icon" title="Compare">
                      <i className="fas fa-balance-scale"></i>
                    </button>
                    <button className="btn-icon" title="View Details">
                      <i className="fas fa-chart-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredStocks.length === 0 && (
        <div className="no-results">
          <p>No stocks match your search criteria.</p>
          <button 
            className="btn btn-primary"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StockList;

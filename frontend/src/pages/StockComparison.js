import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import './StockComparison.css';

const StockComparison = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [stockData, setStockData] = useState({});

  // Parse URL parameters for initial stocks to compare
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const symbols = params.get('symbols');
    
    if (symbols) {
      const initialSymbols = symbols.split(',');
      fetchStocksData(initialSymbols);
    } else {
      setLoading(false);
    }
  }, [location]);

  // Fetch data for selected stocks
  const fetchStocksData = async (symbols) => {
    try {
      setLoading(true);
      
      // In a real application, this would be an actual API call
      // For demo purposes, we'll use mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock stock data
      const mockStockData = {
        AAPL: {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 189.84,
          change: 1.45,
          changePercent: 0.77,
          marketCap: '2.95T',
          sector: 'Technology',
          industry: 'Consumer Electronics',
          pe: 31.2,
          eps: 6.08,
          dividend: 0.96,
          dividendYield: 0.51,
          beta: 1.28,
          fiftyTwoWeekHigh: 198.23,
          fiftyTwoWeekLow: 124.17,
          avgVolume: 62145800,
          volume: 58345600
        },
        MSFT: {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          price: 415.50,
          change: 2.10,
          changePercent: 0.51,
          marketCap: '3.08T',
          sector: 'Technology',
          industry: 'Software—Infrastructure',
          pe: 36.5,
          eps: 11.38,
          dividend: 3.00,
          dividendYield: 0.72,
          beta: 0.89,
          fiftyTwoWeekHigh: 420.82,
          fiftyTwoWeekLow: 275.37,
          avgVolume: 22100000,
          volume: 21500000
        },
        GOOGL: {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 174.13,
          change: 0.87,
          changePercent: 0.50,
          marketCap: '2.18T',
          sector: 'Technology',
          industry: 'Internet Content & Information',
          pe: 25.3,
          eps: 6.88,
          dividend: 0,
          dividendYield: 0,
          beta: 1.05,
          fiftyTwoWeekHigh: 176.42,
          fiftyTwoWeekLow: 120.21,
          avgVolume: 18700000,
          volume: 17500000
        },
        AMZN: {
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          price: 178.15,
          change: 1.23,
          changePercent: 0.70,
          marketCap: '1.85T',
          sector: 'Consumer Cyclical',
          industry: 'Internet Retail',
          pe: 60.2,
          eps: 2.96,
          dividend: 0,
          dividendYield: 0,
          beta: 1.17,
          fiftyTwoWeekHigh: 185.05,
          fiftyTwoWeekLow: 118.35,
          avgVolume: 32600000,
          volume: 30500000
        },
        NVDA: {
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 924.79,
          change: 3.45,
          changePercent: 0.37,
          marketCap: '2.28T',
          sector: 'Technology',
          industry: 'Semiconductors',
          pe: 68.7,
          eps: 13.46,
          dividend: 0.16,
          dividendYield: 0.02,
          beta: 1.72,
          fiftyTwoWeekHigh: 974.00,
          fiftyTwoWeekLow: 222.97,
          avgVolume: 45900000,
          volume: 42800000
        }
      };
      
      const data = {};
      
      symbols.forEach(symbol => {
        if (mockStockData[symbol]) {
          data[symbol] = mockStockData[symbol];
        }
      });
      
      setStockData(data);
      setSelectedStocks(Object.keys(data));
      setError(null);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to load stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle stock search
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      // In a real application, this would be an actual API call
      // For demo purposes, we'll use mock data
      
      // Mock search results
      const mockResults = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation' },
        { symbol: 'META', name: 'Meta Platforms Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' },
        { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
        { symbol: 'JNJ', name: 'Johnson & Johnson' },
        { symbol: 'V', name: 'Visa Inc.' }
      ];
      
      const filteredResults = mockResults.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(filteredResults);
    } catch (err) {
      console.error('Error searching stocks:', err);
    }
  };

  // Add stock to comparison
  const addStock = (symbol) => {
    if (selectedStocks.includes(symbol) || selectedStocks.length >= 5) {
      return;
    }
    
    const updatedStocks = [...selectedStocks, symbol];
    setSelectedStocks(updatedStocks);
    fetchStocksData(updatedStocks);
    setSearchTerm('');
    setSearchResults([]);
    
    // Update URL with selected stocks
    const searchParams = new URLSearchParams();
    searchParams.set('symbols', updatedStocks.join(','));
    window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
  };

  // Remove stock from comparison
  const removeStock = (symbol) => {
    const updatedStocks = selectedStocks.filter(s => s !== symbol);
    setSelectedStocks(updatedStocks);
    
    if (updatedStocks.length > 0) {
      // Update stock data
      const updatedData = { ...stockData };
      delete updatedData[symbol];
      setStockData(updatedData);
      
      // Update URL with selected stocks
      const searchParams = new URLSearchParams();
      searchParams.set('symbols', updatedStocks.join(','));
      window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    } else {
      // Clear URL if no stocks selected
      window.history.replaceState(null, '', location.pathname);
      setStockData({});
    }
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
    return <Spinner text="Loading comparison data..." />;
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
    <div className="comparison-page">
      <div className="page-header">
        <h1>Stock Comparison</h1>
        <p>Compare multiple stocks side by side</p>
      </div>
      
      <div className="comparison-container">
        <div className="stock-selector">
          <div className="stock-selector-header">
            <h2>Select Stocks to Compare</h2>
            <p className="text-muted">Up to 5 stocks</p>
          </div>
          
          <form onSubmit={handleSearch} className="stock-search-container">
            <div className="stock-search">
              <input
                type="text"
                placeholder="Search by symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="stock-search-input"
              />
              <i className="fas fa-search search-icon"></i>
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          
          {searchResults.length > 0 && (
            <div className="search-results">
              <ul className="search-results-list">
                {searchResults.map(stock => (
                  <li key={stock.symbol} className="search-result-item">
                    <div className="stock-info">
                      <span className="stock-symbol">{stock.symbol}</span>
                      <span className="stock-name">{stock.name}</span>
                    </div>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => addStock(stock.symbol)}
                      disabled={selectedStocks.includes(stock.symbol) || selectedStocks.length >= 5}
                    >
                      {selectedStocks.includes(stock.symbol) ? 'Added' : 'Add'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedStocks.length > 0 && (
            <div className="selected-stocks">
              {selectedStocks.map(symbol => (
                <div key={symbol} className="selected-stock">
                  <span>{symbol}</span>
                  <button 
                    className="remove-stock"
                    onClick={() => removeStock(symbol)}
                    aria-label={`Remove ${symbol}`}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedStocks.length > 0 ? (
          <div className="comparison-content">
            <div className="comparison-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveTab('performance')}
              >
                Performance
              </button>
              <button 
                className={`tab-button ${activeTab === 'fundamentals' ? 'active' : ''}`}
                onClick={() => setActiveTab('fundamentals')}
              >
                Fundamentals
              </button>
              <button 
                className={`tab-button ${activeTab === 'dividends' ? 'active' : ''}`}
                onClick={() => setActiveTab('dividends')}
              >
                Dividends
              </button>
              <button 
                className={`tab-button ${activeTab === 'technicals' ? 'active' : ''}`}
                onClick={() => setActiveTab('technicals')}
              >
                Technicals
              </button>
            </div>
            
            <div className="comparison-table-container">
              {activeTab === 'overview' && (
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      {selectedStocks.map(symbol => (
                        <th key={symbol} className="stock-column">
                          <div className="stock-header">
                            <Link to={`/stocks/${symbol}`} className="stock-symbol">{symbol}</Link>
                            <span className="stock-name">{stockData[symbol]?.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="metric-name">Price</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>
                          ${stockData[symbol]?.price.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">Change</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol} style={{ color: getChangeColor(stockData[symbol]?.change) }}>
                          {formatChange(stockData[symbol]?.changePercent)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">Market Cap</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>{stockData[symbol]?.marketCap}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">Sector</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>{stockData[symbol]?.sector}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">Industry</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>{stockData[symbol]?.industry}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">P/E Ratio</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>{stockData[symbol]?.pe.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">EPS</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>${stockData[symbol]?.eps.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">52 Week High</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>${stockData[symbol]?.fiftyTwoWeekHigh.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">52 Week Low</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>${stockData[symbol]?.fiftyTwoWeekLow.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="metric-name">Volume</th>
                      {selectedStocks.map(symbol => (
                        <td key={symbol}>{(stockData[symbol]?.volume).toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
              
              {activeTab === 'performance' && (
                <div className="chart-placeholder">
                  <p>Performance comparison chart will be implemented here</p>
                  <p>This will show historical price performance of the selected stocks</p>
                </div>
              )}
              
              {activeTab === 'fundamentals' && (
                <div className="chart-placeholder">
                  <p>Fundamental metrics comparison will be implemented here</p>
                  <p>This will include revenue growth, profit margins, debt ratios, etc.</p>
                </div>
              )}
              
              {activeTab === 'dividends' && (
                <div className="chart-placeholder">
                  <p>Dividend comparison will be implemented here</p>
                  <p>This will include dividend yield, payout ratio, dividend growth, etc.</p>
                </div>
              )}
              
              {activeTab === 'technicals' && (
                <div className="chart-placeholder">
                  <p>Technical indicators comparison will be implemented here</p>
                  <p>This will include moving averages, RSI, MACD, etc.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-comparison">
            <div className="empty-icon">
              <i className="fas fa-balance-scale"></i>
            </div>
            <h3>No stocks selected for comparison</h3>
            <p>Search and select stocks above to start comparing</p>
            <Link to="/stocks" className="btn btn-primary">
              Browse Stocks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockComparison;

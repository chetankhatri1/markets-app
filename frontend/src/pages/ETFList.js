import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import './ETFList.css';

const ETFList = () => {
  const [etfs, setEtfs] = useState([]);
  const [filteredEtfs, setFilteredEtfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [etfsPerPage] = useState(10);
  
  // Sorting state
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    issuer: '',
    minAum: '',
    maxAum: '',
    minExpense: '',
    maxExpense: ''
  });

  useEffect(() => {
    const fetchEtfs = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock ETF data
        const mockEtfs = [
          {
            symbol: 'SPY',
            name: 'SPDR S&P 500 ETF Trust',
            price: 478.65,
            change: 1.23,
            changePercent: 0.26,
            aum: 420.5,  // in billions
            expense: 0.09,
            category: 'Large Blend',
            issuer: 'State Street Global Advisors',
            volume: 58345600,
            yield: 1.34
          },
          {
            symbol: 'QQQ',
            name: 'Invesco QQQ Trust',
            price: 425.32,
            change: 2.45,
            changePercent: 0.58,
            aum: 215.8,
            expense: 0.20,
            category: 'Large Growth',
            issuer: 'Invesco',
            volume: 32145800,
            yield: 0.52
          },
          {
            symbol: 'VTI',
            name: 'Vanguard Total Stock Market ETF',
            price: 252.18,
            change: 0.87,
            changePercent: 0.35,
            aum: 325.4,
            expense: 0.03,
            category: 'Large Blend',
            issuer: 'Vanguard',
            volume: 3245600,
            yield: 1.42
          },
          {
            symbol: 'IVV',
            name: 'iShares Core S&P 500 ETF',
            price: 483.12,
            change: 1.35,
            changePercent: 0.28,
            aum: 380.2,
            expense: 0.03,
            category: 'Large Blend',
            issuer: 'iShares',
            volume: 4125600,
            yield: 1.32
          },
          {
            symbol: 'VOO',
            name: 'Vanguard S&P 500 ETF',
            price: 439.75,
            change: 1.15,
            changePercent: 0.26,
            aum: 345.8,
            expense: 0.03,
            category: 'Large Blend',
            issuer: 'Vanguard',
            volume: 3845600,
            yield: 1.35
          },
          {
            symbol: 'ARKK',
            name: 'ARK Innovation ETF',
            price: 48.25,
            change: -0.75,
            changePercent: -1.53,
            aum: 7.2,
            expense: 0.75,
            category: 'Technology',
            issuer: 'ARK Invest',
            volume: 15245600,
            yield: 0.00
          },
          {
            symbol: 'VGT',
            name: 'Vanguard Information Technology ETF',
            price: 512.35,
            change: 3.25,
            changePercent: 0.64,
            aum: 62.8,
            expense: 0.10,
            category: 'Technology',
            issuer: 'Vanguard',
            volume: 845600,
            yield: 0.58
          },
          {
            symbol: 'VYM',
            name: 'Vanguard High Dividend Yield ETF',
            price: 118.45,
            change: 0.32,
            changePercent: 0.27,
            aum: 58.2,
            expense: 0.06,
            category: 'Large Value',
            issuer: 'Vanguard',
            volume: 1245600,
            yield: 2.85
          },
          {
            symbol: 'SCHD',
            name: 'Schwab US Dividend Equity ETF',
            price: 78.92,
            change: 0.28,
            changePercent: 0.36,
            aum: 52.4,
            expense: 0.06,
            category: 'Large Value',
            issuer: 'Charles Schwab',
            volume: 2345600,
            yield: 3.12
          },
          {
            symbol: 'AGG',
            name: 'iShares Core U.S. Aggregate Bond ETF',
            price: 98.75,
            change: -0.15,
            changePercent: -0.15,
            aum: 92.5,
            expense: 0.03,
            category: 'Intermediate Core Bond',
            issuer: 'iShares',
            volume: 7845600,
            yield: 4.05
          },
          {
            symbol: 'BND',
            name: 'Vanguard Total Bond Market ETF',
            price: 72.45,
            change: -0.12,
            changePercent: -0.17,
            aum: 105.8,
            expense: 0.03,
            category: 'Intermediate Core Bond',
            issuer: 'Vanguard',
            volume: 6845600,
            yield: 4.12
          },
          {
            symbol: 'VEA',
            name: 'Vanguard FTSE Developed Markets ETF',
            price: 48.75,
            change: 0.45,
            changePercent: 0.93,
            aum: 115.2,
            expense: 0.05,
            category: 'Foreign Large Blend',
            issuer: 'Vanguard',
            volume: 12845600,
            yield: 2.95
          }
        ];
        
        setEtfs(mockEtfs);
        setFilteredEtfs(mockEtfs);
        setError(null);
      } catch (err) {
        console.error('Error fetching ETF data:', err);
        setError('Failed to load ETF data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEtfs();
  }, []);

  // Apply filters when filters state changes
  useEffect(() => {
    filterAndSortEtfs();
  }, [filters, sortField, sortDirection, etfs]);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      issuer: '',
      minAum: '',
      maxAum: '',
      minExpense: '',
      maxExpense: ''
    });
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort ETFs based on current state
  const filterAndSortEtfs = () => {
    let result = [...etfs];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(etf => 
        etf.symbol.toLowerCase().includes(searchTerm) || 
        etf.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(etf => 
        etf.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    // Apply issuer filter
    if (filters.issuer) {
      result = result.filter(etf => 
        etf.issuer.toLowerCase().includes(filters.issuer.toLowerCase())
      );
    }
    
    // Apply AUM filters
    if (filters.minAum) {
      result = result.filter(etf => etf.aum >= parseFloat(filters.minAum));
    }
    if (filters.maxAum) {
      result = result.filter(etf => etf.aum <= parseFloat(filters.maxAum));
    }
    
    // Apply expense ratio filters
    if (filters.minExpense) {
      result = result.filter(etf => etf.expense >= parseFloat(filters.minExpense));
    }
    if (filters.maxExpense) {
      result = result.filter(etf => etf.expense <= parseFloat(filters.maxExpense));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredEtfs(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get current ETFs for pagination
  const indexOfLastEtf = currentPage * etfsPerPage;
  const indexOfFirstEtf = indexOfLastEtf - etfsPerPage;
  const currentEtfs = filteredEtfs.slice(indexOfFirstEtf, indexOfLastEtf);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Format percentage with + or - sign
  const formatPercent = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Get unique categories and issuers for filter dropdowns
  const categories = [...new Set(etfs.map(etf => etf.category))];
  const issuers = [...new Set(etfs.map(etf => etf.issuer))];

  if (loading) {
    return <Spinner text="Loading ETFs..." />;
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
    <div className="etf-list-page">
      <div className="etf-list-header">
        <h1 className="etf-list-title">Exchange-Traded Funds (ETFs)</h1>
        <div className="etf-list-actions">
          <button className="btn btn-outline">
            <i className="fas fa-download mr-1"></i> Export
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-plus mr-1"></i> Add to Watchlist
          </button>
        </div>
      </div>
      
      <div className="filter-container">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Symbol or name"
              className="filter-input"
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-input"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Issuer</label>
            <select
              name="issuer"
              value={filters.issuer}
              onChange={handleFilterChange}
              className="filter-input"
            >
              <option value="">All Issuers</option>
              {issuers.map((issuer, index) => (
                <option key={index} value={issuer}>{issuer}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">AUM (Billions $)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                name="minAum"
                value={filters.minAum}
                onChange={handleFilterChange}
                placeholder="Min"
                className="filter-input"
                min="0"
                step="0.1"
              />
              <input
                type="number"
                name="maxAum"
                value={filters.maxAum}
                onChange={handleFilterChange}
                placeholder="Max"
                className="filter-input"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Expense Ratio (%)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                name="minExpense"
                value={filters.minExpense}
                onChange={handleFilterChange}
                placeholder="Min"
                className="filter-input"
                min="0"
                step="0.01"
              />
              <input
                type="number"
                name="maxExpense"
                value={filters.maxExpense}
                onChange={handleFilterChange}
                placeholder="Max"
                className="filter-input"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className="filter-buttons">
              <button 
                className="btn btn-outline" 
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="etf-table-container">
        {filteredEtfs.length === 0 ? (
          <div className="no-results">
            <p>No ETFs found matching your filters.</p>
            <button 
              className="btn btn-outline mt-2" 
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <table className="etf-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('symbol')}>
                    Symbol
                    {sortField === 'symbol' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('name')}>
                    Name
                    {sortField === 'name' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('price')}>
                    Price
                    {sortField === 'price' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('changePercent')}>
                    Change
                    {sortField === 'changePercent' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('aum')}>
                    AUM
                    {sortField === 'aum' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('expense')}>
                    Expense
                    {sortField === 'expense' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('yield')}>
                    Yield
                    {sortField === 'yield' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('category')}>
                    Category
                    {sortField === 'category' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('volume')}>
                    Volume
                    {sortField === 'volume' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEtfs.map((etf, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/etfs/${etf.symbol}`} className="etf-symbol">
                        {etf.symbol}
                      </Link>
                    </td>
                    <td>
                      <div className="etf-name">
                        <span className="etf-full-name">{etf.name}</span>
                        <span className="etf-issuer">{etf.issuer}</span>
                      </div>
                    </td>
                    <td>${etf.price.toFixed(2)}</td>
                    <td className={etf.change >= 0 ? 'etf-change-positive' : 'etf-change-negative'}>
                      {formatPercent(etf.changePercent)}
                    </td>
                    <td>${etf.aum.toFixed(1)}B</td>
                    <td>{etf.expense.toFixed(2)}%</td>
                    <td>{etf.yield.toFixed(2)}%</td>
                    <td>{etf.category}</td>
                    <td>{formatNumber(etf.volume)}</td>
                    <td className="etf-actions-cell">
                      <button className="etf-action-btn" title="Add to Watchlist">
                        <i className="fas fa-plus"></i>
                      </button>
                      <button className="etf-action-btn" title="Compare">
                        <i className="fas fa-balance-scale"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="pagination">
              <div className="pagination-info">
                Showing {indexOfFirstEtf + 1} to {Math.min(indexOfLastEtf, filteredEtfs.length)} of {filteredEtfs.length} ETFs
              </div>
              <div className="pagination-controls">
                <button 
                  className="pagination-btn" 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {Array.from({ length: Math.ceil(filteredEtfs.length / etfsPerPage) }).map((_, index) => {
                  // Show limited page numbers for better UX
                  if (
                    index === 0 || // First page
                    index === Math.ceil(filteredEtfs.length / etfsPerPage) - 1 || // Last page
                    (index >= currentPage - 2 && index <= currentPage + 2) // Pages around current
                  ) {
                    return (
                      <button
                        key={index}
                        className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    index === currentPage - 3 ||
                    index === currentPage + 3
                  ) {
                    // Show ellipsis
                    return <span key={index} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
                
                <button 
                  className="pagination-btn" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredEtfs.length / etfsPerPage)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ETFList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import './ETFDetail.css';

const ETFDetail = () => {
  const { symbol } = useParams();
  const [etf, setEtf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchEtfData = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an actual API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock ETF data
        const mockEtf = {
          symbol: symbol,
          name: symbol === 'SPY' ? 'SPDR S&P 500 ETF Trust' : 
                 symbol === 'QQQ' ? 'Invesco QQQ Trust' : 
                 symbol === 'VTI' ? 'Vanguard Total Stock Market ETF' : 
                 `${symbol} ETF`,
          price: 478.65,
          change: 1.23,
          changePercent: 0.26,
          previousClose: 477.42,
          open: 477.85,
          dayHigh: 479.12,
          dayLow: 476.98,
          volume: 58345600,
          avgVolume: 62145800,
          aum: '420.5B',
          expense: 0.09,
          category: 'Large Blend',
          issuer: 'State Street Global Advisors',
          inception: '1993-01-22',
          yield: 1.34,
          beta: 1.0,
          pe: 24.5,
          description: `This is a sample description for ${symbol}. In a real application, this would contain detailed information about the ETF, its investment strategy, objectives, and other relevant details.`,
          holdings: [
            { symbol: 'AAPL', name: 'Apple Inc.', weight: 7.12, value: 29.95, shares: 157800 },
            { symbol: 'MSFT', name: 'Microsoft Corporation', weight: 6.85, value: 28.81, shares: 69300 },
            { symbol: 'AMZN', name: 'Amazon.com Inc.', weight: 3.42, value: 14.38, shares: 80700 },
            { symbol: 'NVDA', name: 'NVIDIA Corporation', weight: 3.21, value: 13.50, shares: 14600 },
            { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', weight: 2.05, value: 8.62, shares: 49500 },
            { symbol: 'GOOG', name: 'Alphabet Inc. Class C', weight: 1.85, value: 7.78, shares: 44700 },
            { symbol: 'META', name: 'Meta Platforms Inc.', weight: 1.78, value: 7.49, shares: 15800 },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', weight: 1.65, value: 6.94, shares: 17000 },
            { symbol: 'UNH', name: 'UnitedHealth Group Inc.', weight: 1.42, value: 5.97, shares: 11300 },
            { symbol: 'JNJ', name: 'Johnson & Johnson', weight: 1.25, value: 5.26, shares: 35500 }
          ],
          sectorAllocation: [
            { sector: 'Information Technology', allocation: 28.2 },
            { sector: 'Health Care', allocation: 13.1 },
            { sector: 'Financials', allocation: 12.8 },
            { sector: 'Consumer Discretionary', allocation: 10.2 },
            { sector: 'Communication Services', allocation: 8.7 },
            { sector: 'Industrials', allocation: 8.3 },
            { sector: 'Consumer Staples', allocation: 6.5 },
            { sector: 'Energy', allocation: 4.1 },
            { sector: 'Utilities', allocation: 2.5 },
            { sector: 'Real Estate', allocation: 2.4 },
            { sector: 'Materials', allocation: 2.2 }
          ],
          countryAllocation: [
            { country: 'United States', allocation: 97.8 },
            { country: 'United Kingdom', allocation: 0.7 },
            { country: 'Switzerland', allocation: 0.5 },
            { country: 'Ireland', allocation: 0.4 },
            { country: 'Other', allocation: 0.6 }
          ],
          performance: {
            oneMonth: 2.5,
            threeMonth: 5.8,
            sixMonth: 8.7,
            ytd: 7.2,
            oneYear: 21.4,
            threeYear: 45.8,
            fiveYear: 87.2,
            tenYear: 210.5
          }
        };
        
        setEtf(mockEtf);
        setError(null);
      } catch (err) {
        console.error('Error fetching ETF data:', err);
        setError('Failed to load ETF data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEtfData();
  }, [symbol]);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    return <Spinner text={`Loading ${symbol} data...`} />;
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
    <div className="etf-detail-page">
      <div className="etf-header">
        <div className="etf-title">
          <h1>{etf.symbol}</h1>
          <h2>{etf.name}</h2>
          <span className="etf-category">{etf.category} • {etf.issuer}</span>
        </div>
        
        <div className="etf-price-container">
          <div className="etf-price">${etf.price.toFixed(2)}</div>
          <div 
            className="etf-change" 
            style={{ color: getChangeColor(etf.change) }}
          >
            {etf.change.toFixed(2)} ({formatChange(etf.changePercent)})
            <i className={`fas fa-caret-${etf.change >= 0 ? 'up' : 'down'} ml-1`}></i>
          </div>
        </div>
        
        <div className="etf-actions">
          <button className="btn btn-primary">
            <i className="fas fa-plus mr-1"></i> Add to Watchlist
          </button>
          <button className="btn btn-outline">
            <i className="fas fa-balance-scale mr-1"></i> Compare
          </button>
        </div>
      </div>
      
      <div className="etf-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'holdings' ? 'active' : ''}`}
          onClick={() => setActiveTab('holdings')}
        >
          Holdings
        </button>
        <button 
          className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button 
          className={`tab-button ${activeTab === 'allocation' ? 'active' : ''}`}
          onClick={() => setActiveTab('allocation')}
        >
          Allocation
        </button>
        <button 
          className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>
      
      <div className="etf-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="etf-metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Previous Close</div>
                <div className="metric-value">${etf.previousClose.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Open</div>
                <div className="metric-value">${etf.open.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Day's Range</div>
                <div className="metric-value">${etf.dayLow.toFixed(2)} - ${etf.dayHigh.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Volume</div>
                <div className="metric-value">{formatNumber(etf.volume)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Avg. Volume</div>
                <div className="metric-value">{formatNumber(etf.avgVolume)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">AUM</div>
                <div className="metric-value">{etf.aum}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Expense Ratio</div>
                <div className="metric-value">{etf.expense.toFixed(2)}%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Yield</div>
                <div className="metric-value">{etf.yield.toFixed(2)}%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Beta</div>
                <div className="metric-value">{etf.beta.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">P/E Ratio</div>
                <div className="metric-value">{etf.pe.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Inception Date</div>
                <div className="metric-value">{etf.inception}</div>
              </div>
            </div>
            
            <div className="etf-description">
              <h3>About {etf.name}</h3>
              <p>{etf.description}</p>
            </div>
            
            <div className="holdings-table-container">
              <h3>Top 10 Holdings</h3>
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Value</th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {etf.holdings.slice(0, 5).map((holding, index) => (
                    <tr key={index}>
                      <td>
                        <div className="holding-name">
                          <span className="holding-symbol">{holding.symbol}</span>
                          <span className="holding-company">{holding.name}</span>
                        </div>
                      </td>
                      <td>{holding.weight.toFixed(2)}%</td>
                      <td>${holding.value.toFixed(2)}B</td>
                      <td>{formatNumber(holding.shares)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'holdings' && (
          <div className="holdings-tab">
            <div className="holdings-table-container">
              <h3>All Holdings</h3>
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Value</th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {etf.holdings.map((holding, index) => (
                    <tr key={index}>
                      <td>
                        <div className="holding-name">
                          <span className="holding-symbol">{holding.symbol}</span>
                          <span className="holding-company">{holding.name}</span>
                        </div>
                      </td>
                      <td>{holding.weight.toFixed(2)}%</td>
                      <td>${holding.value.toFixed(2)}B</td>
                      <td>{formatNumber(holding.shares)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="performance-tab">
            <div className="performance-chart">
              <h3>Historical Performance</h3>
              <div className="chart-placeholder">
                <p>Performance chart will be implemented here with Chart.js</p>
                <p>Historical data for {etf.symbol} will be displayed in various timeframes</p>
              </div>
            </div>
            
            <div className="etf-metrics-grid">
              <div className="metric-card">
                <div className="metric-label">1 Month</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.oneMonth) }}>
                  {formatChange(etf.performance.oneMonth)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">3 Month</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.threeMonth) }}>
                  {formatChange(etf.performance.threeMonth)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">6 Month</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.sixMonth) }}>
                  {formatChange(etf.performance.sixMonth)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">YTD</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.ytd) }}>
                  {formatChange(etf.performance.ytd)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">1 Year</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.oneYear) }}>
                  {formatChange(etf.performance.oneYear)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">3 Year</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.threeYear) }}>
                  {formatChange(etf.performance.threeYear)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">5 Year</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.fiveYear) }}>
                  {formatChange(etf.performance.fiveYear)}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">10 Year</div>
                <div className="metric-value" style={{ color: getChangeColor(etf.performance.tenYear) }}>
                  {formatChange(etf.performance.tenYear)}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'allocation' && (
          <div className="allocation-tab">
            <div className="sector-allocation">
              <h3>Sector Allocation</h3>
              {etf.sectorAllocation.map((item, index) => (
                <div key={index} className="allocation-item">
                  <div>
                    <span className="allocation-label">{item.sector}</span>
                    <div className="allocation-bar">
                      <div className="allocation-fill" style={{ width: `${item.allocation}%` }}></div>
                    </div>
                  </div>
                  <span className="allocation-value">{item.allocation.toFixed(1)}%</span>
                </div>
              ))}
            </div>
            
            <div className="country-allocation">
              <h3>Country Allocation</h3>
              {etf.countryAllocation.map((item, index) => (
                <div key={index} className="allocation-item">
                  <div>
                    <span className="allocation-label">{item.country}</span>
                    <div className="allocation-bar">
                      <div className="allocation-fill" style={{ width: `${item.allocation}%` }}></div>
                    </div>
                  </div>
                  <span className="allocation-value">{item.allocation.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="documents-tab">
            <div className="chart-placeholder">
              <p>ETF documents will be listed here</p>
              <p>Including prospectus, fact sheets, and annual reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ETFDetail;

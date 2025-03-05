import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/common/Spinner';
import StockChart from '../components/charts/StockChart';
import StockFinancials from '../components/financials/StockFinancials';
import './StockDetail.css';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an actual API call
        // For demo purposes, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock stock data
        const mockStock = {
          symbol: symbol,
          name: symbol === 'AAPL' ? 'Apple Inc.' : 
                 symbol === 'MSFT' ? 'Microsoft Corporation' : 
                 symbol === 'GOOGL' ? 'Alphabet Inc.' : 
                 `${symbol} Corporation`,
          price: 189.84,
          change: 1.45,
          changePercent: 0.77,
          previousClose: 188.39,
          open: 188.56,
          dayHigh: 190.23,
          dayLow: 188.21,
          volume: 58345600,
          avgVolume: 62145800,
          marketCap: 2950000000000,
          pe: 31.2,
          eps: 6.08,
          dividend: 0.96,
          dividendYield: 0.51,
          beta: 1.28,
          sector: 'Technology',
          industry: 'Consumer Electronics',
          description: `This is a sample description for ${symbol}. In a real application, this would contain detailed information about the company, its business model, products, services, and recent developments.`,
          news: [
            {
              id: 1,
              title: `${symbol} Reports Strong Quarterly Earnings`,
              summary: `${symbol} exceeded analyst expectations with quarterly revenue growth of 15% year-over-year.`,
              source: 'Financial Times',
              date: '2025-03-01',
              url: '#'
            },
            {
              id: 2,
              title: `${symbol} Announces New Product Line`,
              summary: `${symbol} unveiled its latest product lineup at a special event, showcasing innovative features.`,
              source: 'Bloomberg',
              date: '2025-02-28',
              url: '#'
            },
            {
              id: 3,
              title: `${symbol} Expands Operations in Asia`,
              summary: `${symbol} is investing $2 billion to expand its manufacturing and R&D facilities in Asia.`,
              source: 'Reuters',
              date: '2025-02-25',
              url: '#'
            }
          ],
          historicalData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            values: [165, 170, 175, 180, 178, 182, 187, 185, 190, 188, 185, 189]
          },
          financials: {
            revenue: [365.82, 394.33, 365.82, 365.82],
            netIncome: [94.68, 99.8, 94.68, 94.68],
            eps: [5.89, 6.15, 5.89, 5.89],
            quarters: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
          },
          recommendations: [
            { firm: 'Goldman Sachs', rating: 'Buy', targetPrice: 210, date: '2025-02-15' },
            { firm: 'Morgan Stanley', rating: 'Overweight', targetPrice: 205, date: '2025-02-10' },
            { firm: 'JP Morgan', rating: 'Buy', targetPrice: 215, date: '2025-02-05' },
            { firm: 'Bank of America', rating: 'Buy', targetPrice: 208, date: '2025-01-28' },
            { firm: 'Wells Fargo', rating: 'Overweight', targetPrice: 200, date: '2025-01-20' }
          ]
        };
        
        setStock(mockStock);
        setError(null);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to load stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Format market cap in billions/trillions
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else {
      return `$${formatNumber(marketCap)}`;
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
    <div className="stock-detail-page">
      <div className="stock-header">
        <div className="stock-title">
          <h1>{stock.symbol}</h1>
          <h2>{stock.name}</h2>
          <span className="stock-sector">{stock.sector} • {stock.industry}</span>
        </div>
        
        <div className="stock-price-container">
          <div className="stock-price">${stock.price.toFixed(2)}</div>
          <div 
            className="stock-change" 
            style={{ color: getChangeColor(stock.change) }}
          >
            {stock.change.toFixed(2)} ({formatChange(stock.changePercent)})
            <i className={`fas fa-caret-${stock.change >= 0 ? 'up' : 'down'} ml-1`}></i>
          </div>
        </div>
        
        <div className="stock-actions">
          <button className="btn btn-primary">
            <i className="fas fa-plus mr-1"></i> Add to Watchlist
          </button>
          <button className="btn btn-outline">
            <i className="fas fa-balance-scale mr-1"></i> Compare
          </button>
        </div>
      </div>
      
      <div className="stock-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Chart
        </button>
        <button 
          className={`tab-button ${activeTab === 'financials' ? 'active' : ''}`}
          onClick={() => setActiveTab('financials')}
        >
          Financials
        </button>
        <button 
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
        <button 
          className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Analysis
        </button>
      </div>
      
      <div className="stock-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stock-metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Previous Close</div>
                <div className="metric-value">${stock.previousClose.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Open</div>
                <div className="metric-value">${stock.open.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Day's Range</div>
                <div className="metric-value">${stock.dayLow.toFixed(2)} - ${stock.dayHigh.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Volume</div>
                <div className="metric-value">{formatNumber(stock.volume)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Avg. Volume</div>
                <div className="metric-value">{formatNumber(stock.avgVolume)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Market Cap</div>
                <div className="metric-value">{formatMarketCap(stock.marketCap)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">P/E Ratio</div>
                <div className="metric-value">{stock.pe.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">EPS (TTM)</div>
                <div className="metric-value">${stock.eps.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Dividend</div>
                <div className="metric-value">${stock.dividend.toFixed(2)}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Dividend Yield</div>
                <div className="metric-value">{stock.dividendYield.toFixed(2)}%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Beta</div>
                <div className="metric-value">{stock.beta.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="company-description">
              <h3>About {stock.name}</h3>
              <p>{stock.description}</p>
            </div>
            
            <div className="recent-news">
              <h3>Recent News</h3>
              <div className="news-list">
                {stock.news.map(item => (
                  <div key={item.id} className="news-item">
                    <div className="news-meta">
                      <span className="news-source">{item.source}</span>
                      <span className="news-date">{item.date}</span>
                    </div>
                    <h4 className="news-title">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h4>
                    <p className="news-summary">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'chart' && (
          <div className="chart-tab">
            <StockChart symbol={stock.symbol} />
          </div>
        )}
        
        {activeTab === 'financials' && (
          <div className="financials-tab">
            <StockFinancials symbol={stock.symbol} />
          </div>
        )}
        
        {activeTab === 'news' && (
          <div className="news-tab">
            <div className="full-news-list">
              {stock.news.map(item => (
                <div key={item.id} className="news-item">
                  <div className="news-meta">
                    <span className="news-source">{item.source}</span>
                    <span className="news-date">{item.date}</span>
                  </div>
                  <h4 className="news-title">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h4>
                  <p className="news-summary">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'analysis' && (
          <div className="analysis-tab">
            <div className="analyst-recommendations">
              <h3>Analyst Recommendations</h3>
              <div className="recommendations-table-container">
                <table className="recommendations-table">
                  <thead>
                    <tr>
                      <th>Firm</th>
                      <th>Rating</th>
                      <th>Target Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.recommendations.map((rec, index) => (
                      <tr key={index}>
                        <td>{rec.firm}</td>
                        <td>{rec.rating}</td>
                        <td>${rec.targetPrice}</td>
                        <td>{rec.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDetail;

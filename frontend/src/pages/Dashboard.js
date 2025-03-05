import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MarketOverview from '../components/dashboard/MarketOverview';
import WatchlistPreview from '../components/dashboard/WatchlistPreview';
import TopPerformers from '../components/dashboard/TopPerformers';
import RecentNews from '../components/dashboard/RecentNews';
import Spinner from '../components/common/Spinner';
import '../components/dashboard/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState(null);
  const [watchlists, setWatchlists] = useState([]);
  const [topStocks, setTopStocks] = useState([]);
  const [topEtfs, setTopEtfs] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real application, these would be actual API calls
        
        // Mock market overview data
        const mockMarketData = {
          indices: [
            { name: 'S&P 500', region: 'US', value: 4789.63, change: 1.23 },
            { name: 'NASDAQ', region: 'US', value: 16573.44, change: 1.65 },
            { name: 'Dow Jones', region: 'US', value: 38239.98, change: 0.87 },
            { name: 'FTSE 100', region: 'UK', value: 7687.45, change: -0.32 }
          ],
          mainIndex: {
            name: 'S&P 500',
            value: 4789.63,
            change: 1.23,
            chartData: {
              labels: Array.from({ length: 30 }, (_, i) => `Day ${i+1}`),
              values: Array.from({ length: 30 }, () => 4500 + Math.random() * 400)
            }
          },
          indicators: [
            { name: 'VIX', value: '15.23', change: -5.67, icon: 'fas fa-chart-line' },
            { name: 'US 10Y', value: '3.82%', change: 2.14, icon: 'fas fa-university' },
            { name: 'Gold', value: '$2,345.60', change: 0.75, icon: 'fas fa-coins' },
            { name: 'Oil (WTI)', value: '$78.92', change: -1.24, icon: 'fas fa-oil-can' }
          ],
          summary: 'Markets are showing positive momentum with technology and healthcare sectors leading the gains. Investors are optimistic about upcoming earnings reports and potential interest rate decisions.'
        };
        setMarketData(mockMarketData);
        
        // Mock watchlists data
        if (user) {
          const mockWatchlists = [
            {
              _id: 'watchlist1',
              name: 'Tech Stocks',
              securities: [
                { _id: 'sec1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: 189.84, change: 1.45 },
                { _id: 'sec2', symbol: 'MSFT', name: 'Microsoft Corp.', type: 'stock', price: 415.50, change: 2.10 },
                { _id: 'sec3', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', price: 174.13, change: 0.87 },
                { _id: 'sec4', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', price: 178.15, change: 1.23 },
                { _id: 'sec5', symbol: 'NVDA', name: 'NVIDIA Corp.', type: 'stock', price: 924.79, change: 3.45 }
              ]
            },
            {
              _id: 'watchlist2',
              name: 'Dividend Stocks',
              securities: [
                { _id: 'sec6', symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock', price: 147.89, change: -0.32 },
                { _id: 'sec7', symbol: 'PG', name: 'Procter & Gamble', type: 'stock', price: 165.23, change: 0.54 },
                { _id: 'sec8', symbol: 'KO', name: 'Coca-Cola Company', type: 'stock', price: 62.45, change: 0.21 }
              ]
            }
          ];
          setWatchlists(mockWatchlists);
        }
        
        // Mock top stocks data
        const mockTopStocks = [
          { _id: 'stock1', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 924.79, change: 3.45 },
          { _id: 'stock2', symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.32, change: 2.87 },
          { _id: 'stock3', symbol: 'TSLA', name: 'Tesla Inc.', price: 175.43, change: 2.65 },
          { _id: 'stock4', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, change: 2.10 },
          { _id: 'stock5', symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 1.45 }
        ];
        setTopStocks(mockTopStocks);
        
        // Mock top ETFs data
        const mockTopEtfs = [
          { _id: 'etf1', symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 438.56, change: 1.98 },
          { _id: 'etf2', symbol: 'SOXX', name: 'iShares Semiconductor ETF', price: 213.45, change: 1.76 },
          { _id: 'etf3', symbol: 'XLK', name: 'Technology Select Sector SPDR', price: 198.76, change: 1.65 },
          { _id: 'etf4', symbol: 'VGT', name: 'Vanguard Information Technology ETF', price: 512.34, change: 1.54 },
          { _id: 'etf5', symbol: 'SMH', name: 'VanEck Semiconductor ETF', price: 234.56, change: 1.43 }
        ];
        setTopEtfs(mockTopEtfs);
        
        // Mock recent news data
        const mockNews = [
          {
            _id: 'news1',
            title: 'Fed Signals Potential Rate Cut in September Meeting',
            summary: 'Federal Reserve officials have indicated they may consider cutting interest rates in the upcoming September meeting, citing improving inflation data and concerns about labor market cooling.',
            source: 'Financial Times',
            publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            url: '#',
            relatedSymbols: ['SPY', 'QQQ', 'IWM'],
            sentiment: 'Positive'
          },
          {
            _id: 'news2',
            title: 'NVIDIA Reports Record Quarterly Revenue, Exceeding Expectations',
            summary: 'NVIDIA announced record quarterly revenue of $26.3 billion, up 122% from a year ago, driven by strong demand for AI chips and data center products.',
            source: 'CNBC',
            publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            url: '#',
            relatedSymbols: ['NVDA', 'AMD', 'INTC'],
            sentiment: 'Positive'
          },
          {
            _id: 'news3',
            title: 'Oil Prices Drop Amid Concerns Over Global Demand',
            summary: 'Crude oil prices fell by over 2% today as investors worry about weakening demand in China and potential oversupply from OPEC+ producers.',
            source: 'Reuters',
            publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
            url: '#',
            relatedSymbols: ['XLE', 'USO', 'XOM'],
            sentiment: 'Negative'
          },
          {
            _id: 'news4',
            title: 'Apple Unveils New AI Features for iPhone and Mac',
            summary: 'Apple announced a suite of new AI features coming to iPhone and Mac devices, including enhanced Siri capabilities and on-device generative AI tools.',
            source: 'Bloomberg',
            publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
            url: '#',
            relatedSymbols: ['AAPL', 'MSFT', 'GOOGL'],
            sentiment: 'Positive'
          }
        ];
        setRecentNews(mockNews);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <Spinner text="Loading dashboard data..." />;
  }

  if (error) {
    return (
      <div className="dashboard-error">
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
            <a href="/market" className="view-all">View Details</a>
          </div>
          {marketData && <MarketOverview data={marketData} />}
        </div>

        {/* Watchlist Preview Section - Only show if user is logged in and has watchlists */}
        {user && watchlists.length > 0 && (
          <div className="dashboard-section watchlist-section">
            <div className="section-header">
              <h2>Your Watchlists</h2>
              <a href="/watchlists" className="view-all">View All</a>
            </div>
            <WatchlistPreview watchlists={watchlists} />
          </div>
        )}

        {/* Top Performers Section */}
        <div className="dashboard-section top-performers-section">
          <div className="section-header">
            <h2>Top Performers</h2>
            <div className="section-actions">
              <a href="/stocks" className="view-all">View All Stocks</a>
              <a href="/etfs" className="view-all">View All ETFs</a>
            </div>
          </div>
          <div className="top-performers-container">
            <div className="top-performers-stocks">
              <h3>Stocks</h3>
              <TopPerformers items={topStocks} type="stock" />
            </div>
            <div className="top-performers-etfs">
              <h3>ETFs</h3>
              <TopPerformers items={topEtfs} type="etf" />
            </div>
          </div>
        </div>

        {/* Recent News Section */}
        <div className="dashboard-section news-section">
          <div className="section-header">
            <h2>Recent Market News</h2>
            <a href="/news" className="view-all">View All News</a>
          </div>
          <RecentNews news={recentNews} />
        </div>

        {/* Quick Actions Section */}
        <div className="dashboard-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <a href="/compare" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Compare Securities</h3>
              <p>Analyze and compare multiple stocks or ETFs side by side</p>
            </a>
            <a href="/screener" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-filter"></i>
              </div>
              <h3>Stock Screener</h3>
              <p>Find securities matching your specific criteria</p>
            </a>
            <a href="/ai-insights" className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Insights</h3>
              <p>Get AI-powered analysis and recommendations</p>
            </a>
            {user && (
              <a href="/watchlists/create" className="quick-action-card">
                <div className="quick-action-icon">
                  <i className="fas fa-plus-circle"></i>
                </div>
                <h3>Create Watchlist</h3>
                <p>Build a new watchlist to track your favorite securities</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './MarketOverview.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketOverview = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to get market data
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        const data = generateMockMarketData();
        setMarketData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [timeframe]);

  const generateMockMarketData = () => {
    const regions = [
      {
        name: 'North America',
        indices: [
          { name: 'S&P 500', symbol: 'SPX', country: 'USA', value: 5124.37, change: 23.15, percentChange: 0.48, chartData: generateMockChartData() },
          { name: 'Dow Jones', symbol: 'DJI', country: 'USA', value: 38996.39, change: 125.69, percentChange: 0.32, chartData: generateMockChartData() },
          { name: 'Nasdaq', symbol: 'IXIC', country: 'USA', value: 16091.92, change: 183.02, percentChange: 1.14, chartData: generateMockChartData() },
          { name: 'Russell 2000', symbol: 'RUT', country: 'USA', value: 2042.48, change: -5.69, percentChange: -0.28, chartData: generateMockChartData() },
          { name: 'TSX Composite', symbol: 'GSPTSE', country: 'Canada', value: 21970.11, change: 78.34, percentChange: 0.36, chartData: generateMockChartData() }
        ]
      },
      {
        name: 'Europe',
        indices: [
          { name: 'FTSE 100', symbol: 'FTSE', country: 'UK', value: 7682.53, change: -15.73, percentChange: -0.20, chartData: generateMockChartData() },
          { name: 'DAX', symbol: 'GDAXI', country: 'Germany', value: 17698.40, change: 42.81, percentChange: 0.24, chartData: generateMockChartData() },
          { name: 'CAC 40', symbol: 'FCHI', country: 'France', value: 7936.16, change: 5.38, percentChange: 0.07, chartData: generateMockChartData() },
          { name: 'STOXX 600', symbol: 'STOXX', country: 'Europe', value: 496.32, change: 0.92, percentChange: 0.19, chartData: generateMockChartData() },
          { name: 'IBEX 35', symbol: 'IBEX', country: 'Spain', value: 10121.80, change: -23.50, percentChange: -0.23, chartData: generateMockChartData() }
        ]
      },
      {
        name: 'Asia Pacific',
        indices: [
          { name: 'Nikkei 225', symbol: 'N225', country: 'Japan', value: 39910.75, change: 744.63, percentChange: 1.90, chartData: generateMockChartData() },
          { name: 'Shanghai Composite', symbol: 'SSEC', country: 'China', value: 3015.18, change: -12.48, percentChange: -0.41, chartData: generateMockChartData() },
          { name: 'Hang Seng', symbol: 'HSI', country: 'Hong Kong', value: 16589.44, change: 67.24, percentChange: 0.41, chartData: generateMockChartData() },
          { name: 'ASX 200', symbol: 'AXJO', country: 'Australia', value: 7745.60, change: 32.40, percentChange: 0.42, chartData: generateMockChartData() },
          { name: 'KOSPI', symbol: 'KS11', country: 'South Korea', value: 2652.20, change: 8.67, percentChange: 0.33, chartData: generateMockChartData() }
        ]
      },
      {
        name: 'Emerging Markets',
        indices: [
          { name: 'Sensex', symbol: 'BSESN', country: 'India', value: 72500.33, change: 195.84, percentChange: 0.27, chartData: generateMockChartData() },
          { name: 'Bovespa', symbol: 'BVSP', country: 'Brazil', value: 128594.97, change: -542.81, percentChange: -0.42, chartData: generateMockChartData() },
          { name: 'IPC', symbol: 'MXX', country: 'Mexico', value: 54987.35, change: 124.56, percentChange: 0.23, chartData: generateMockChartData() },
          { name: 'JSE Top 40', symbol: 'JTOPI', country: 'South Africa', value: 67892.45, change: 345.67, percentChange: 0.51, chartData: generateMockChartData() },
          { name: 'RTS Index', symbol: 'RTSI', country: 'Russia', value: 1089.23, change: -5.78, percentChange: -0.53, chartData: generateMockChartData() }
        ]
      }
    ];

    return regions;
  };

  const generateMockChartData = () => {
    const today = new Date();
    let dataPoints = [];
    let labels = [];
    
    // Generate different data points based on timeframe
    switch(timeframe) {
      case '1D':
        // Generate hourly data for 1 day
        for (let i = 0; i < 24; i++) {
          const hour = i % 12 === 0 ? 12 : i % 12;
          const amPm = i < 12 ? 'AM' : 'PM';
          labels.push(`${hour}${amPm}`);
        }
        break;
      case '1W':
        // Generate daily data for 1 week
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        }
        break;
      case '1M':
        // Generate data for 1 month (30 days)
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        }
        break;
      case '3M':
        // Generate weekly data for 3 months
        for (let i = 12; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - (i * 7));
          labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        }
        break;
      case '1Y':
        // Generate monthly data for 1 year
        for (let i = 11; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          labels.push(`${date.toLocaleString('default', { month: 'short' })}`);
        }
        break;
      default:
        // Default to 1 month
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        }
    }
    
    // Generate random price data with a trend
    let baseValue = 100 + Math.random() * 50;
    const trend = Math.random() > 0.5 ? 1 : -1; // Randomly choose upward or downward trend
    
    for (let i = 0; i < labels.length; i++) {
      // Add some randomness with a general trend
      const change = (Math.random() - 0.45) * 2;
      baseValue += change + (trend * 0.2);
      
      // Ensure value doesn't go below 50
      if (baseValue < 50) baseValue = 50 + Math.random() * 10;
      
      dataPoints.push(baseValue);
    }
    
    return {
      labels,
      datasets: [
        {
          data: dataPoints,
          borderColor: trend > 0 ? '#4caf50' : '#f44336',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          tension: 0.2
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  const formatPercentChange = (percentChange) => {
    const sign = percentChange >= 0 ? '+' : '';
    return `${sign}${percentChange.toFixed(2)}%`;
  };

  const getPercentChangeClass = (percentChange) => {
    return percentChange >= 0 ? 'positive-change' : 'negative-change';
  };

  const getFilteredIndices = () => {
    if (!marketData) return [];
    
    if (selectedRegion === 'all') {
      return marketData.flatMap(region => region.indices);
    } else {
      const selectedRegionData = marketData.find(region => region.name === selectedRegion);
      return selectedRegionData ? selectedRegionData.indices : [];
    }
  };

  const renderRegionTabs = () => {
    if (!marketData) return null;
    
    return (
      <div className="region-tabs">
        <button 
          className={`region-tab ${selectedRegion === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedRegion('all')}
        >
          All Regions
        </button>
        {marketData.map(region => (
          <button 
            key={region.name}
            className={`region-tab ${selectedRegion === region.name ? 'active' : ''}`}
            onClick={() => setSelectedRegion(region.name)}
          >
            {region.name}
          </button>
        ))}
      </div>
    );
  };

  const renderTimeframeTabs = () => {
    const timeframes = [
      { value: '1D', label: '1D' },
      { value: '1W', label: '1W' },
      { value: '1M', label: '1M' },
      { value: '3M', label: '3M' },
      { value: '1Y', label: '1Y' }
    ];
    
    return (
      <div className="timeframe-tabs">
        {timeframes.map(tf => (
          <button 
            key={tf.value}
            className={`timeframe-tab ${timeframe === tf.value ? 'active' : ''}`}
            onClick={() => setTimeframe(tf.value)}
          >
            {tf.label}
          </button>
        ))}
      </div>
    );
  };

  const renderMarketIndices = () => {
    const indices = getFilteredIndices();
    
    return (
      <div className="market-indices-grid">
        {indices.map(index => (
          <div key={index.symbol} className="market-index-card">
            <div className="index-header">
              <div className="index-name-container">
                <h3 className="index-name">{index.name}</h3>
                <span className="index-country">{index.country}</span>
              </div>
              <div className="index-value-container">
                <div className="index-value">{index.value.toFixed(2)}</div>
                <div className={`index-change ${getPercentChangeClass(index.percentChange)}`}>
                  {formatPercentChange(index.percentChange)}
                </div>
              </div>
            </div>
            <div className="index-chart">
              <Line data={index.chartData} options={chartOptions} height={80} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="market-overview-container">
      <div className="market-overview-header">
        <h1>Global Market Overview</h1>
        <div className="market-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="market-filters">
        {renderRegionTabs()}
        {renderTimeframeTabs()}
      </div>
      
      {loading ? (
        <div className="market-loading">
          <div className="spinner"></div>
          <p>Loading market data...</p>
        </div>
      ) : error ? (
        <div className="market-error">
          <p>{error}</p>
        </div>
      ) : (
        renderMarketIndices()
      )}
      
      <div className="market-disclaimer">
        <p>Disclaimer: All market data shown is simulated for demonstration purposes only. In a production environment, this would be replaced with real-time market data from financial data providers.</p>
      </div>
    </div>
  );
};

export default MarketOverview;

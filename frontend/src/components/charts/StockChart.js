import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './StockChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState('1M'); // Default to 1 month
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call to get historical price data
        // For now, we'll generate mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate mock historical data based on timeframe
        const mockData = generateMockHistoricalData(timeframe);
        setChartData(mockData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChartData();
  }, [symbol, timeframe]);
  
  // Generate mock historical price data
  const generateMockHistoricalData = (timeframe) => {
    const today = new Date();
    let days;
    let interval;
    
    switch(timeframe) {
      case '1D':
        days = 1;
        interval = 'hour';
        break;
      case '1W':
        days = 7;
        interval = 'day';
        break;
      case '1M':
        days = 30;
        interval = 'day';
        break;
      case '3M':
        days = 90;
        interval = 'day';
        break;
      case '1Y':
        days = 365;
        interval = 'week';
        break;
      case '5Y':
        days = 1825;
        interval = 'month';
        break;
      default:
        days = 30;
        interval = 'day';
    }
    
    const labels = [];
    const prices = [];
    
    // Start with a base price and add some randomness
    let basePrice = 150 + Math.random() * 50;
    
    // Generate data points
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      if (interval === 'hour' && i < 24) {
        // For 1D view, use hours
        labels.push(`${date.getHours()}:00`);
      } else if (interval === 'day') {
        // For daily view
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      } else if (interval === 'week') {
        // For weekly view
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      } else if (interval === 'month') {
        // For monthly view
        labels.push(`${date.getMonth() + 1}/${date.getFullYear()}`);
      }
      
      // Add some random movement to the price
      const change = (Math.random() - 0.48) * 5;
      basePrice += change;
      
      // Ensure price doesn't go below 50
      if (basePrice < 50) basePrice = 50 + Math.random() * 10;
      
      prices.push(basePrice);
    }
    
    return {
      labels,
      datasets: [
        {
          label: symbol,
          data: prices,
          borderColor: '#4a6cf7',
          backgroundColor: 'rgba(74, 108, 247, 0.1)',
          borderWidth: 2,
          pointRadius: timeframe === '1D' || timeframe === '1W' ? 2 : 0,
          pointHoverRadius: 5,
          tension: 0.2,
          fill: true
        }
      ]
    };
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  const timeframeOptions = [
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '1Y', label: '1Y' },
    { value: '5Y', label: '5Y' }
  ];

  return (
    <div className="stock-chart-container">
      <div className="chart-timeframe-selector">
        {timeframeOptions.map(option => (
          <button
            key={option.value}
            className={`timeframe-button ${timeframe === option.value ? 'active' : ''}`}
            onClick={() => setTimeframe(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <div className="chart-wrapper">
        {loading ? (
          <div className="chart-loading">
            <div className="spinner"></div>
            <p>Loading chart data...</p>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={chartOptions} height={400} />
        ) : (
          <div className="chart-error">
            <p>Unable to load chart data for {symbol}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockChart;

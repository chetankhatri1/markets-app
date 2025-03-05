import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

const MarketOverview = ({ data }) => {
  // Format percentage change with + or - sign
  const formatChange = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  // Determine color based on value (positive or negative)
  const getChangeColor = (value) => {
    return value >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 5,
      },
      line: {
        tension: 0.2,
      },
    },
  };

  // Prepare chart data for the main index
  const chartData = {
    labels: data?.mainIndex?.chartData?.labels || [],
    datasets: [
      {
        label: data?.mainIndex?.name || 'Index',
        data: data?.mainIndex?.chartData?.values || [],
        borderColor: 'var(--secondary-color)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="market-overview">
      {/* Main Market Indices */}
      <div className="market-indices">
        {data?.indices?.map((index, idx) => (
          <div key={idx} className="market-index-card">
            <div className="index-header">
              <h3>{index.name}</h3>
              <span className="index-region">{index.region}</span>
            </div>
            <div className="index-value">{index.value.toLocaleString()}</div>
            <div 
              className="index-change" 
              style={{ color: getChangeColor(index.change) }}
            >
              {formatChange(index.change)}
              <span className="change-icon">
                {index.change >= 0 ? 
                  <i className="fas fa-caret-up"></i> : 
                  <i className="fas fa-caret-down"></i>
                }
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Index Chart */}
      <div className="main-index-chart">
        <div className="chart-header">
          <div>
            <h3>{data?.mainIndex?.name || 'Market Index'}</h3>
            <span className="chart-period">Last 30 Days</span>
          </div>
          <div className="chart-value-container">
            <div className="chart-current-value">
              {data?.mainIndex?.value?.toLocaleString() || '0'}
            </div>
            <div 
              className="chart-change" 
              style={{ color: getChangeColor(data?.mainIndex?.change || 0) }}
            >
              {formatChange(data?.mainIndex?.change || 0)}
              <span className="change-icon">
                {(data?.mainIndex?.change || 0) >= 0 ? 
                  <i className="fas fa-caret-up"></i> : 
                  <i className="fas fa-caret-down"></i>
                }
              </span>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} height={250} />
        </div>
      </div>

      {/* Market Indicators */}
      <div className="market-indicators">
        {data?.indicators?.map((indicator, idx) => (
          <div key={idx} className="indicator-card">
            <div className="indicator-icon">
              <i className={indicator.icon}></i>
            </div>
            <div className="indicator-details">
              <h4>{indicator.name}</h4>
              <div className="indicator-value">{indicator.value}</div>
              <div 
                className="indicator-change" 
                style={{ color: getChangeColor(indicator.change) }}
              >
                {formatChange(indicator.change)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Summary */}
      {data?.summary && (
        <div className="market-summary">
          <h3>Market Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;

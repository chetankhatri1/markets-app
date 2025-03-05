import React, { useState, useEffect } from 'react';
import './StockFinancials.css';

const StockFinancials = ({ symbol }) => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStatement, setActiveStatement] = useState('income');
  const [period, setPeriod] = useState('annual');

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call to get financial data
        // For now, we'll generate mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Generate mock financial data
        const mockData = generateMockFinancialData(symbol);
        setFinancialData(mockData);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFinancialData();
  }, [symbol, period]);
  
  // Generate mock financial data
  const generateMockFinancialData = (symbol) => {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    // Generate periods based on annual or quarterly selection
    const periods = period === 'annual' 
      ? years.map(year => year.toString()) 
      : quarters.map(q => `${q} ${currentYear}`);
    
    // Income Statement
    const incomeStatement = {
      revenue: generateFinancialSeries(10000000000, 15000000000, periods.length, 0.1),
      costOfRevenue: generateFinancialSeries(6000000000, 9000000000, periods.length, 0.08),
      grossProfit: generateFinancialSeries(4000000000, 6000000000, periods.length, 0.12),
      operatingExpenses: generateFinancialSeries(2000000000, 3000000000, periods.length, 0.07),
      operatingIncome: generateFinancialSeries(2000000000, 3000000000, periods.length, 0.15),
      netIncome: generateFinancialSeries(1500000000, 2500000000, periods.length, 0.18),
      eps: generateFinancialSeries(2.5, 4.5, periods.length, 0.2),
      ebitda: generateFinancialSeries(2500000000, 3500000000, periods.length, 0.12),
    };
    
    // Balance Sheet
    const balanceSheet = {
      totalAssets: generateFinancialSeries(50000000000, 70000000000, periods.length, 0.08),
      totalLiabilities: generateFinancialSeries(30000000000, 40000000000, periods.length, 0.06),
      totalEquity: generateFinancialSeries(20000000000, 30000000000, periods.length, 0.1),
      cash: generateFinancialSeries(5000000000, 8000000000, periods.length, 0.15),
      shortTermInvestments: generateFinancialSeries(10000000000, 15000000000, periods.length, 0.12),
      accountsReceivable: generateFinancialSeries(3000000000, 4000000000, periods.length, 0.05),
      inventory: generateFinancialSeries(2000000000, 3000000000, periods.length, 0.07),
      longTermDebt: generateFinancialSeries(15000000000, 20000000000, periods.length, 0.03),
    };
    
    // Cash Flow Statement
    const cashFlow = {
      operatingCashFlow: generateFinancialSeries(3000000000, 4500000000, periods.length, 0.12),
      capitalExpenditures: generateFinancialSeries(-1500000000, -2500000000, periods.length, 0.1),
      freeCashFlow: generateFinancialSeries(1500000000, 2500000000, periods.length, 0.15),
      dividendsPaid: generateFinancialSeries(-500000000, -800000000, periods.length, 0.08),
      netBorrowings: generateFinancialSeries(-200000000, 300000000, periods.length, 0.2, true),
      cashFromFinancing: generateFinancialSeries(-700000000, -500000000, periods.length, 0.18),
      netChangeInCash: generateFinancialSeries(800000000, 1500000000, periods.length, 0.25, true),
    };
    
    return {
      symbol,
      periods,
      incomeStatement,
      balanceSheet,
      cashFlow
    };
  };
  
  // Helper to generate a series of financial data with growth
  const generateFinancialSeries = (min, max, count, volatility, allowNegative = false) => {
    const result = [];
    let current = min + Math.random() * (max - min);
    
    for (let i = 0; i < count; i++) {
      result.push(current);
      
      // Add some growth and volatility
      const growthFactor = 1 + (Math.random() * volatility);
      current = current * growthFactor;
      
      // Add some randomness that can go negative if allowed
      if (allowNegative) {
        current += (Math.random() - 0.5) * current * volatility;
      }
    }
    
    return result;
  };
  
  // Format large numbers for display
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };
  
  const formatPercentChange = (current, previous) => {
    if (!previous) return '+0.00%';
    const change = ((current - previous) / Math.abs(previous)) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };
  
  const getPercentChangeClass = (current, previous) => {
    if (!previous) return '';
    return current >= previous ? 'positive-change' : 'negative-change';
  };
  
  const renderFinancialTable = () => {
    if (!financialData) return null;
    
    const { periods } = financialData;
    let statementData;
    let statementItems;
    
    switch (activeStatement) {
      case 'income':
        statementData = financialData.incomeStatement;
        statementItems = [
          { key: 'revenue', label: 'Revenue' },
          { key: 'costOfRevenue', label: 'Cost of Revenue' },
          { key: 'grossProfit', label: 'Gross Profit' },
          { key: 'operatingExpenses', label: 'Operating Expenses' },
          { key: 'operatingIncome', label: 'Operating Income' },
          { key: 'netIncome', label: 'Net Income' },
          { key: 'eps', label: 'EPS', isRatio: true },
          { key: 'ebitda', label: 'EBITDA' }
        ];
        break;
      case 'balance':
        statementData = financialData.balanceSheet;
        statementItems = [
          { key: 'totalAssets', label: 'Total Assets' },
          { key: 'totalLiabilities', label: 'Total Liabilities' },
          { key: 'totalEquity', label: 'Total Equity' },
          { key: 'cash', label: 'Cash & Equivalents' },
          { key: 'shortTermInvestments', label: 'Short-term Investments' },
          { key: 'accountsReceivable', label: 'Accounts Receivable' },
          { key: 'inventory', label: 'Inventory' },
          { key: 'longTermDebt', label: 'Long-term Debt' }
        ];
        break;
      case 'cashflow':
        statementData = financialData.cashFlow;
        statementItems = [
          { key: 'operatingCashFlow', label: 'Operating Cash Flow' },
          { key: 'capitalExpenditures', label: 'Capital Expenditures' },
          { key: 'freeCashFlow', label: 'Free Cash Flow' },
          { key: 'dividendsPaid', label: 'Dividends Paid' },
          { key: 'netBorrowings', label: 'Net Borrowings' },
          { key: 'cashFromFinancing', label: 'Cash from Financing' },
          { key: 'netChangeInCash', label: 'Net Change in Cash' }
        ];
        break;
      default:
        return null;
    }
    
    return (
      <div className="financial-table-container">
        <table className="financial-table">
          <thead>
            <tr>
              <th className="metric-column">Metric</th>
              {periods.map((period, index) => (
                <th key={period}>{period}</th>
              ))}
              <th>YoY Change</th>
            </tr>
          </thead>
          <tbody>
            {statementItems.map(item => (
              <tr key={item.key}>
                <td className="metric-name">{item.label}</td>
                {statementData[item.key].map((value, index) => (
                  <td key={index}>
                    {item.isRatio ? `$${value.toFixed(2)}` : formatCurrency(value)}
                  </td>
                ))}
                <td className={getPercentChangeClass(
                  statementData[item.key][statementData[item.key].length - 1],
                  statementData[item.key][statementData[item.key].length - 2]
                )}>
                  {formatPercentChange(
                    statementData[item.key][statementData[item.key].length - 1],
                    statementData[item.key][statementData[item.key].length - 2]
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="stock-financials-container">
      <div className="financials-header">
        <div className="statement-selector">
          <button 
            className={`statement-button ${activeStatement === 'income' ? 'active' : ''}`}
            onClick={() => setActiveStatement('income')}
          >
            Income Statement
          </button>
          <button 
            className={`statement-button ${activeStatement === 'balance' ? 'active' : ''}`}
            onClick={() => setActiveStatement('balance')}
          >
            Balance Sheet
          </button>
          <button 
            className={`statement-button ${activeStatement === 'cashflow' ? 'active' : ''}`}
            onClick={() => setActiveStatement('cashflow')}
          >
            Cash Flow
          </button>
        </div>
        
        <div className="period-selector">
          <button 
            className={`period-button ${period === 'annual' ? 'active' : ''}`}
            onClick={() => setPeriod('annual')}
          >
            Annual
          </button>
          <button 
            className={`period-button ${period === 'quarterly' ? 'active' : ''}`}
            onClick={() => setPeriod('quarterly')}
          >
            Quarterly
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="financials-loading">
          <div className="spinner"></div>
          <p>Loading financial data...</p>
        </div>
      ) : financialData ? (
        renderFinancialTable()
      ) : (
        <div className="financials-error">
          <p>Unable to load financial data for {symbol}</p>
        </div>
      )}
    </div>
  );
};

export default StockFinancials;

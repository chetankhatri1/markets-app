const asyncHandler = require('express-async-handler');
const Stock = require('../models/stockModel');
const ETF = require('../models/etfModel');
const { generateMetricSummary } = require('../services/aiAnalysisService');

// @desc    Compare metrics for multiple securities
// @route   POST /api/metrics/compare
// @access  Private
const compareMetrics = asyncHandler(async (req, res) => {
  const { securities, metrics } = req.body;
  
  if (!securities || !Array.isArray(securities) || securities.length === 0) {
    res.status(400);
    throw new Error('Please provide an array of securities to compare');
  }
  
  if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
    res.status(400);
    throw new Error('Please provide an array of metrics to compare');
  }
  
  const results = [];
  
  // Process each security
  for (const security of securities) {
    const { type, symbol } = security;
    
    if (!type || !symbol) {
      res.status(400);
      throw new Error('Each security must have a type and symbol');
    }
    
    if (type !== 'stock' && type !== 'etf') {
      res.status(400);
      throw new Error('Security type must be either "stock" or "etf"');
    }
    
    // Find security in database
    let securityData;
    if (type === 'stock') {
      securityData = await Stock.findOne({ symbol: symbol.toUpperCase() });
    } else {
      securityData = await ETF.findOne({ symbol: symbol.toUpperCase() });
    }
    
    if (!securityData) {
      res.status(404);
      throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} with symbol ${symbol} not found`);
    }
    
    // Extract requested metrics
    const metricData = {};
    for (const metric of metrics) {
      if (type === 'stock' && securityData.financialMetrics) {
        metricData[metric] = securityData.financialMetrics[metric];
      } else if (type === 'etf' && securityData.financialMetrics) {
        metricData[metric] = securityData.financialMetrics[metric];
      } else {
        metricData[metric] = null;
      }
    }
    
    results.push({
      type,
      symbol: securityData.symbol,
      name: securityData.name,
      metrics: metricData
    });
  }
  
  res.status(200).json(results);
});

// @desc    Get available metrics for comparison
// @route   GET /api/metrics/available
// @access  Private
const getAvailableMetrics = asyncHandler(async (req, res) => {
  // Define categories and metrics
  const metricCategories = [
    {
      category: 'Profitability Ratios',
      metrics: [
        { id: 'grossMargin', name: 'Gross Margin', description: 'Gross profit divided by revenue' },
        { id: 'operatingMargin', name: 'Operating Margin', description: 'Operating income divided by revenue' },
        { id: 'netProfitMargin', name: 'Net Profit Margin', description: 'Net income divided by revenue' },
        { id: 'returnOnAssets', name: 'Return on Assets (ROA)', description: 'Net income divided by average total assets' },
        { id: 'returnOnEquity', name: 'Return on Equity (ROE)', description: 'Net income divided by average shareholder equity' },
        { id: 'returnOnInvestedCapital', name: 'Return on Invested Capital (ROIC)', description: 'Net operating profit after tax divided by invested capital' }
      ]
    },
    {
      category: 'Liquidity Ratios',
      metrics: [
        { id: 'currentRatio', name: 'Current Ratio', description: 'Current assets divided by current liabilities' },
        { id: 'quickRatio', name: 'Quick Ratio', description: 'Quick assets divided by current liabilities' },
        { id: 'cashRatio', name: 'Cash Ratio', description: 'Cash and cash equivalents divided by current liabilities' }
      ]
    },
    {
      category: 'Solvency Ratios',
      metrics: [
        { id: 'debtToEquityRatio', name: 'Debt to Equity Ratio', description: 'Total debt divided by shareholder equity' },
        { id: 'interestCoverageRatio', name: 'Interest Coverage Ratio', description: 'EBIT divided by interest expense' },
        { id: 'debtToAssetsRatio', name: 'Debt to Assets Ratio', description: 'Total debt divided by total assets' },
        { id: 'debtToEBITDA', name: 'Debt to EBITDA', description: 'Total debt divided by EBITDA' }
      ]
    },
    {
      category: 'Valuation Ratios',
      metrics: [
        { id: 'peRatio', name: 'Price-to-Earnings (P/E) Ratio', description: 'Share price divided by earnings per share' },
        { id: 'pbRatio', name: 'Price-to-Book (P/B) Ratio', description: 'Share price divided by book value per share' },
        { id: 'psRatio', name: 'Price-to-Sales (P/S) Ratio', description: 'Market cap divided by annual sales' },
        { id: 'evToEBITDA', name: 'EV to EBITDA', description: 'Enterprise value divided by EBITDA' },
        { id: 'evToSales', name: 'EV to Sales', description: 'Enterprise value divided by annual sales' },
        { id: 'priceToCashFlow', name: 'Price to Cash Flow', description: 'Share price divided by operating cash flow per share' },
        { id: 'priceToFreeCashFlow', name: 'Price to Free Cash Flow', description: 'Share price divided by free cash flow per share' }
      ]
    },
    {
      category: 'Efficiency Ratios',
      metrics: [
        { id: 'assetTurnoverRatio', name: 'Asset Turnover Ratio', description: 'Revenue divided by average total assets' },
        { id: 'inventoryTurnoverRatio', name: 'Inventory Turnover Ratio', description: 'Cost of goods sold divided by average inventory' },
        { id: 'receivablesTurnoverRatio', name: 'Receivables Turnover Ratio', description: 'Net credit sales divided by average accounts receivable' },
        { id: 'payablesTurnoverRatio', name: 'Payables Turnover Ratio', description: 'Total supplier purchases divided by average accounts payable' },
        { id: 'cashConversionCycle', name: 'Cash Conversion Cycle', description: 'Days inventory outstanding + days sales outstanding - days payables outstanding' }
      ]
    },
    {
      category: 'Growth Metrics',
      metrics: [
        { id: 'revenueGrowthYOY', name: 'Revenue Growth YoY', description: 'Year-over-year percentage change in revenue' },
        { id: 'earningsGrowthYOY', name: 'Earnings Growth YoY', description: 'Year-over-year percentage change in earnings' },
        { id: 'dividendGrowthYOY', name: 'Dividend Growth YoY', description: 'Year-over-year percentage change in dividends' },
        { id: 'bookValueGrowthYOY', name: 'Book Value Growth YoY', description: 'Year-over-year percentage change in book value' },
        { id: 'freeCashFlowGrowthYOY', name: 'Free Cash Flow Growth YoY', description: 'Year-over-year percentage change in free cash flow' }
      ]
    },
    {
      category: 'Market Performance Metrics',
      metrics: [
        { id: 'earningsPerShare', name: 'Earnings Per Share (EPS)', description: 'Net income divided by number of outstanding shares' },
        { id: 'dividendYield', name: 'Dividend Yield', description: 'Annual dividends per share divided by share price' },
        { id: 'dividendPayoutRatio', name: 'Dividend Payout Ratio', description: 'Dividends paid divided by net income' },
        { id: 'beta', name: 'Beta', description: 'Measure of volatility compared to the overall market' }
      ]
    },
    {
      category: 'Cash Flow Metrics',
      metrics: [
        { id: 'operatingCashFlowPerShare', name: 'Operating Cash Flow Per Share', description: 'Operating cash flow divided by number of outstanding shares' },
        { id: 'freeCashFlowPerShare', name: 'Free Cash Flow Per Share', description: 'Free cash flow divided by number of outstanding shares' },
        { id: 'cashFlowToDebtRatio', name: 'Cash Flow to Debt Ratio', description: 'Operating cash flow divided by total debt' }
      ]
    },
    {
      category: 'Balance Sheet Metrics',
      metrics: [
        { id: 'totalAssets', name: 'Total Assets', description: 'Sum of all assets' },
        { id: 'totalLiabilities', name: 'Total Liabilities', description: 'Sum of all liabilities' },
        { id: 'totalEquity', name: 'Total Equity', description: 'Total assets minus total liabilities' },
        { id: 'cashAndEquivalents', name: 'Cash and Equivalents', description: 'Cash and short-term investments' },
        { id: 'totalDebt', name: 'Total Debt', description: 'Short-term debt plus long-term debt' }
      ]
    },
    {
      category: 'Income Statement Metrics',
      metrics: [
        { id: 'revenue', name: 'Revenue', description: 'Total income from sales' },
        { id: 'costOfRevenue', name: 'Cost of Revenue', description: 'Direct costs attributable to the production of goods sold' },
        { id: 'grossProfit', name: 'Gross Profit', description: 'Revenue minus cost of revenue' },
        { id: 'operatingIncome', name: 'Operating Income', description: 'Profit from operations before interest and taxes' },
        { id: 'netIncome', name: 'Net Income', description: 'Total earnings after all expenses and taxes' }
      ]
    },
    {
      category: 'ETF Specific Metrics',
      metrics: [
        { id: 'expenseRatio', name: 'Expense Ratio', description: 'Annual fee charged by the ETF' },
        { id: 'trackingError', name: 'Tracking Error', description: 'Divergence between the price behavior of the ETF and its benchmark index' },
        { id: 'ytdReturn', name: 'YTD Return', description: 'Return from the beginning of the current year' },
        { id: 'oneYearReturn', name: 'One Year Return', description: 'Return over the past year' },
        { id: 'threeYearReturn', name: 'Three Year Return', description: 'Annualized return over the past three years' },
        { id: 'fiveYearReturn', name: 'Five Year Return', description: 'Annualized return over the past five years' }
      ]
    }
  ];
  
  res.status(200).json(metricCategories);
});

// @desc    Get AI-generated analysis of comparison
// @route   POST /api/metrics/analyze
// @access  Private
const analyzeMetrics = asyncHandler(async (req, res) => {
  const { comparisonData } = req.body;
  
  if (!comparisonData || !Array.isArray(comparisonData) || comparisonData.length === 0) {
    res.status(400);
    throw new Error('Please provide comparison data to analyze');
  }
  
  try {
    // Generate AI analysis of the comparison data
    const analysis = await generateMetricSummary(comparisonData);
    
    res.status(200).json({ analysis });
  } catch (error) {
    res.status(500);
    throw new Error(`Failed to generate analysis: ${error.message}`);
  }
});

module.exports = {
  compareMetrics,
  getAvailableMetrics,
  analyzeMetrics
};

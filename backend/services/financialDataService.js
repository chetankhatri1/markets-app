const axios = require('axios');
const Stock = require('../models/stockModel');
const ETF = require('../models/etfModel');

/**
 * Fetch stock data from external API
 * @param {string} symbol - Stock symbol
 * @returns {Object} Stock data object
 */
const fetchStockData = async (symbol) => {
  try {
    // In a real application, you would use a financial data API like Alpha Vantage, 
    // Yahoo Finance API, or a paid service like Financial Modeling Prep
    
    // For demonstration purposes, we'll create a placeholder implementation
    // that would be replaced with actual API calls in production
    
    // Example API call (commented out)
    // const apiKey = process.env.FINANCIAL_API_KEY;
    // const response = await axios.get(`https://financialdataapi.com/api/v1/stocks/${symbol}?apikey=${apiKey}`);
    // const data = response.data;
    
    // Placeholder implementation with mock data
    console.log(`Fetching data for stock: ${symbol}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock data
    const stockData = {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Corporation`,
      exchange: Math.random() > 0.5 ? 'NASDAQ' : 'NYSE',
      country: 'US',
      currency: 'USD',
      sector: getSampleSector(),
      industry: getSampleIndustry(),
      marketCap: Math.random() * 1000000000000,
      price: Math.random() * 1000,
      priceDate: new Date(),
      financialMetrics: generateMockFinancialMetrics('stock'),
      historicalData: generateMockHistoricalData(),
      lastUpdated: new Date()
    };
    
    return stockData;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw new Error(`Failed to fetch stock data: ${error.message}`);
  }
};

/**
 * Fetch ETF data from external API
 * @param {string} symbol - ETF symbol
 * @returns {Object} ETF data object
 */
const fetchETFData = async (symbol) => {
  try {
    // Similar to fetchStockData, this would use a financial data API in production
    
    console.log(`Fetching data for ETF: ${symbol}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock data
    const etfData = {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} ETF`,
      assetClass: getSampleAssetClass(),
      issuer: getSampleIssuer(),
      exchange: Math.random() > 0.5 ? 'NASDAQ' : 'NYSE',
      country: 'US',
      currency: 'USD',
      aum: Math.random() * 100000000000,
      nav: Math.random() * 500,
      navDate: new Date(),
      price: Math.random() * 500,
      priceDate: new Date(),
      financialMetrics: generateMockFinancialMetrics('etf'),
      sectorAllocation: generateMockSectorAllocation(),
      geographicAllocation: generateMockGeographicAllocation(),
      topHoldings: generateMockHoldings(),
      historicalData: generateMockHistoricalData(),
      lastUpdated: new Date()
    };
    
    return etfData;
  } catch (error) {
    console.error(`Error fetching ETF data for ${symbol}:`, error);
    throw new Error(`Failed to fetch ETF data: ${error.message}`);
  }
};

/**
 * Update financial data for all stocks and ETFs in the database
 */
const updateFinancialData = async () => {
  try {
    console.log('Starting financial data update...');
    
    // Update stocks
    const stocks = await Stock.find({});
    for (const stock of stocks) {
      try {
        console.log(`Updating stock: ${stock.symbol}`);
        const stockData = await fetchStockData(stock.symbol);
        await Stock.findOneAndUpdate({ symbol: stock.symbol }, stockData);
      } catch (error) {
        console.error(`Error updating stock ${stock.symbol}:`, error);
      }
    }
    
    // Update ETFs
    const etfs = await ETF.find({});
    for (const etf of etfs) {
      try {
        console.log(`Updating ETF: ${etf.symbol}`);
        const etfData = await fetchETFData(etf.symbol);
        await ETF.findOneAndUpdate({ symbol: etf.symbol }, etfData);
      } catch (error) {
        console.error(`Error updating ETF ${etf.symbol}:`, error);
      }
    }
    
    console.log('Financial data update completed successfully');
  } catch (error) {
    console.error('Error updating financial data:', error);
    throw new Error(`Failed to update financial data: ${error.message}`);
  }
};

// Helper functions for generating mock data

function getSampleSector() {
  const sectors = [
    'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical',
    'Communication Services', 'Industrials', 'Consumer Defensive', 'Energy',
    'Basic Materials', 'Real Estate', 'Utilities'
  ];
  return sectors[Math.floor(Math.random() * sectors.length)];
}

function getSampleIndustry() {
  const industries = [
    'Software', 'Semiconductors', 'Biotechnology', 'Banks', 'Insurance',
    'Retail', 'Telecommunications', 'Aerospace & Defense', 'Oil & Gas',
    'Pharmaceuticals', 'Automotive', 'Entertainment', 'Restaurants'
  ];
  return industries[Math.floor(Math.random() * industries.length)];
}

function getSampleAssetClass() {
  const assetClasses = [
    'Equity', 'Fixed Income', 'Commodity', 'Currency', 'Multi-Asset',
    'Real Estate', 'Alternative', 'Specialty'
  ];
  return assetClasses[Math.floor(Math.random() * assetClasses.length)];
}

function getSampleIssuer() {
  const issuers = [
    'Vanguard', 'BlackRock', 'State Street', 'Invesco', 'Charles Schwab',
    'Fidelity', 'JPMorgan', 'First Trust', 'VanEck', 'PIMCO'
  ];
  return issuers[Math.floor(Math.random() * issuers.length)];
}

function generateMockFinancialMetrics(type) {
  if (type === 'stock') {
    return {
      // Profitability Ratios
      grossMargin: Math.random() * 0.8,
      operatingMargin: Math.random() * 0.5,
      netProfitMargin: Math.random() * 0.3,
      returnOnAssets: Math.random() * 0.2,
      returnOnEquity: Math.random() * 0.4,
      returnOnInvestedCapital: Math.random() * 0.3,
      
      // Liquidity Ratios
      currentRatio: 1 + Math.random() * 3,
      quickRatio: 0.5 + Math.random() * 2,
      cashRatio: 0.2 + Math.random() * 1,
      
      // Solvency Ratios
      debtToEquityRatio: Math.random() * 2,
      interestCoverageRatio: 1 + Math.random() * 10,
      debtToAssetsRatio: Math.random() * 0.8,
      debtToEBITDA: 1 + Math.random() * 5,
      
      // Valuation Ratios
      peRatio: 5 + Math.random() * 45,
      pbRatio: 0.5 + Math.random() * 9.5,
      psRatio: 0.5 + Math.random() * 19.5,
      evToEBITDA: 2 + Math.random() * 18,
      evToSales: 0.5 + Math.random() * 9.5,
      priceToCashFlow: 2 + Math.random() * 18,
      priceToFreeCashFlow: 5 + Math.random() * 45,
      
      // Efficiency Ratios
      assetTurnoverRatio: 0.2 + Math.random() * 1.8,
      inventoryTurnoverRatio: 2 + Math.random() * 18,
      receivablesTurnoverRatio: 2 + Math.random() * 18,
      payablesTurnoverRatio: 2 + Math.random() * 18,
      cashConversionCycle: 10 + Math.random() * 90,
      
      // Growth Metrics
      revenueGrowthYOY: -0.2 + Math.random() * 0.6,
      earningsGrowthYOY: -0.3 + Math.random() * 0.8,
      dividendGrowthYOY: -0.1 + Math.random() * 0.3,
      bookValueGrowthYOY: -0.1 + Math.random() * 0.3,
      freeCashFlowGrowthYOY: -0.3 + Math.random() * 0.8,
      
      // Market Performance Metrics
      earningsPerShare: Math.random() * 20,
      dividendYield: Math.random() * 0.08,
      dividendPayoutRatio: Math.random() * 1,
      beta: 0.5 + Math.random() * 2,
      
      // Cash Flow Metrics
      operatingCashFlowPerShare: Math.random() * 15,
      freeCashFlowPerShare: Math.random() * 10,
      cashFlowToDebtRatio: Math.random() * 1,
      
      // Profitability Metrics
      grossProfit: Math.random() * 10000000000,
      operatingIncome: Math.random() * 5000000000,
      netIncome: Math.random() * 3000000000,
      ebitda: Math.random() * 7000000000,
      ebit: Math.random() * 6000000000,
      
      // Balance Sheet Metrics
      totalAssets: Math.random() * 100000000000,
      totalLiabilities: Math.random() * 50000000000,
      totalEquity: Math.random() * 50000000000,
      cashAndEquivalents: Math.random() * 10000000000,
      totalDebt: Math.random() * 30000000000,
      
      // Income Statement Metrics
      revenue: Math.random() * 50000000000,
      costOfRevenue: Math.random() * 30000000000,
      researchAndDevelopment: Math.random() * 5000000000,
      sellingGeneralAdmin: Math.random() * 8000000000,
      
      // Per Share Metrics
      bookValuePerShare: Math.random() * 100,
      tangibleBookValuePerShare: Math.random() * 80,
      cashPerShare: Math.random() * 20,
      revenuePerShare: Math.random() * 200
    };
  } else {
    return {
      // ETF Specific Metrics
      expenseRatio: 0.0005 + Math.random() * 0.0095,
      trackingError: Math.random() * 0.02,
      premiumDiscount: -0.01 + Math.random() * 0.02,
      avgDailyVolume: 100000 + Math.random() * 10000000,
      avgBid_AskSpread: 0.0001 + Math.random() * 0.0049,
      beta: 0.5 + Math.random() * 1.5,
      
      // Performance Metrics
      ytdReturn: -0.1 + Math.random() * 0.3,
      oneYearReturn: -0.2 + Math.random() * 0.5,
      threeYearReturn: -0.1 + Math.random() * 0.6,
      fiveYearReturn: 0 + Math.random() * 0.8,
      tenYearReturn: 0.1 + Math.random() * 1,
      sinceInceptionReturn: 0.2 + Math.random() * 2,
      
      // Risk Metrics
      standardDeviation: 0.05 + Math.random() * 0.25,
      sharpeRatio: -0.5 + Math.random() * 2.5,
      treynorRatio: -0.1 + Math.random() * 0.3,
      sortingRatio: -0.5 + Math.random() * 2.5,
      informationRatio: -1 + Math.random() * 2,
      alpha: -0.05 + Math.random() * 0.1,
      r_squared: 0.5 + Math.random() * 0.5,
      downCaptureRatio: 0.7 + Math.random() * 0.6,
      upCaptureRatio: 0.7 + Math.random() * 0.6,
      maxDrawdown: -0.5 + Math.random() * 0.3,
      
      // Income Metrics
      dividendYield: Math.random() * 0.05,
      ttmYield: Math.random() * 0.05,
      distributionYield: Math.random() * 0.05,
      secYield: Math.random() * 0.05
    };
  }
}

function generateMockHistoricalData() {
  const data = [];
  const today = new Date();
  let price = 100 + Math.random() * 900; // Starting price between 100 and 1000
  
  // Generate data for the past 365 days
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random daily price change between -5% and 5%
    const dailyChange = -0.05 + Math.random() * 0.1;
    price = price * (1 + dailyChange);
    
    data.push({
      date: date,
      price: price,
      volume: 100000 + Math.random() * 10000000,
      high: price * (1 + Math.random() * 0.03),
      low: price * (1 - Math.random() * 0.03),
      open: price * (1 - 0.01 + Math.random() * 0.02),
      close: price
    });
  }
  
  return data;
}

function generateMockSectorAllocation() {
  const sectors = [
    'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical',
    'Communication Services', 'Industrials', 'Consumer Defensive', 'Energy',
    'Basic Materials', 'Real Estate', 'Utilities'
  ];
  
  // Randomly select 5-10 sectors
  const numSectors = 5 + Math.floor(Math.random() * 6);
  const selectedSectors = [];
  
  for (let i = 0; i < numSectors; i++) {
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    if (!selectedSectors.find(s => s.sector === randomSector)) {
      selectedSectors.push({
        sector: randomSector,
        percentage: Math.random()
      });
    }
  }
  
  // Normalize percentages to sum to 1
  const totalPercentage = selectedSectors.reduce((sum, s) => sum + s.percentage, 0);
  return selectedSectors.map(s => ({
    sector: s.sector,
    percentage: s.percentage / totalPercentage
  }));
}

function generateMockGeographicAllocation() {
  const countries = [
    'United States', 'China', 'Japan', 'United Kingdom', 'Canada',
    'France', 'Germany', 'Switzerland', 'Australia', 'India',
    'Brazil', 'South Korea', 'Taiwan', 'Netherlands', 'Sweden'
  ];
  
  // Randomly select 5-10 countries
  const numCountries = 5 + Math.floor(Math.random() * 6);
  const selectedCountries = [];
  
  for (let i = 0; i < numCountries; i++) {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    if (!selectedCountries.find(c => c.country === randomCountry)) {
      selectedCountries.push({
        country: randomCountry,
        percentage: Math.random()
      });
    }
  }
  
  // Normalize percentages to sum to 1
  const totalPercentage = selectedCountries.reduce((sum, c) => sum + c.percentage, 0);
  return selectedCountries.map(c => ({
    country: c.country,
    percentage: c.percentage / totalPercentage
  }));
}

function generateMockHoldings() {
  const companyNames = [
    'Apple Inc.', 'Microsoft Corp.', 'Amazon.com Inc.', 'Alphabet Inc.',
    'Meta Platforms Inc.', 'Tesla Inc.', 'Berkshire Hathaway Inc.',
    'UnitedHealth Group Inc.', 'Johnson & Johnson', 'Exxon Mobil Corp.',
    'JPMorgan Chase & Co.', 'Visa Inc.', 'Procter & Gamble Co.',
    'Mastercard Inc.', 'Nvidia Corp.', 'Home Depot Inc.', 'Bank of America Corp.',
    'Chevron Corp.', 'AbbVie Inc.', 'Pfizer Inc.'
  ];
  
  const companySymbols = [
    'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'BRK.B',
    'UNH', 'JNJ', 'XOM', 'JPM', 'V', 'PG', 'MA', 'NVDA',
    'HD', 'BAC', 'CVX', 'ABBV', 'PFE'
  ];
  
  // Randomly select 10-20 holdings
  const numHoldings = 10 + Math.floor(Math.random() * 11);
  const selectedHoldings = [];
  
  for (let i = 0; i < numHoldings; i++) {
    const randomIndex = Math.floor(Math.random() * companyNames.length);
    if (!selectedHoldings.find(h => h.symbol === companySymbols[randomIndex])) {
      selectedHoldings.push({
        name: companyNames[randomIndex],
        symbol: companySymbols[randomIndex],
        percentage: Math.random()
      });
    }
  }
  
  // Normalize percentages to sum to 1
  const totalPercentage = selectedHoldings.reduce((sum, h) => sum + h.percentage, 0);
  return selectedHoldings.map(h => ({
    name: h.name,
    symbol: h.symbol,
    percentage: h.percentage / totalPercentage
  }));
}

module.exports = {
  fetchStockData,
  fetchETFData,
  updateFinancialData
};

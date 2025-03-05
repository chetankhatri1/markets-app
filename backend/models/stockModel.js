const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  exchange: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  sector: {
    type: String
  },
  industry: {
    type: String
  },
  marketCap: {
    type: Number
  },
  price: {
    type: Number
  },
  priceDate: {
    type: Date
  },
  financialMetrics: {
    // Profitability Ratios
    grossMargin: { type: Number },
    operatingMargin: { type: Number },
    netProfitMargin: { type: Number },
    returnOnAssets: { type: Number },
    returnOnEquity: { type: Number },
    returnOnInvestedCapital: { type: Number },
    
    // Liquidity Ratios
    currentRatio: { type: Number },
    quickRatio: { type: Number },
    cashRatio: { type: Number },
    
    // Solvency Ratios
    debtToEquityRatio: { type: Number },
    interestCoverageRatio: { type: Number },
    debtToAssetsRatio: { type: Number },
    debtToEBITDA: { type: Number },
    
    // Valuation Ratios
    peRatio: { type: Number },
    pbRatio: { type: Number },
    psRatio: { type: Number },
    evToEBITDA: { type: Number },
    evToSales: { type: Number },
    priceToCashFlow: { type: Number },
    priceToFreeCashFlow: { type: Number },
    
    // Efficiency Ratios
    assetTurnoverRatio: { type: Number },
    inventoryTurnoverRatio: { type: Number },
    receivablesTurnoverRatio: { type: Number },
    payablesTurnoverRatio: { type: Number },
    cashConversionCycle: { type: Number },
    
    // Growth Metrics
    revenueGrowthYOY: { type: Number },
    earningsGrowthYOY: { type: Number },
    dividendGrowthYOY: { type: Number },
    bookValueGrowthYOY: { type: Number },
    freeCashFlowGrowthYOY: { type: Number },
    
    // Market Performance Metrics
    earningsPerShare: { type: Number },
    dividendYield: { type: Number },
    dividendPayoutRatio: { type: Number },
    beta: { type: Number },
    
    // Cash Flow Metrics
    operatingCashFlowPerShare: { type: Number },
    freeCashFlowPerShare: { type: Number },
    cashFlowToDebtRatio: { type: Number },
    
    // Profitability Metrics
    grossProfit: { type: Number },
    operatingIncome: { type: Number },
    netIncome: { type: Number },
    ebitda: { type: Number },
    ebit: { type: Number },
    
    // Balance Sheet Metrics
    totalAssets: { type: Number },
    totalLiabilities: { type: Number },
    totalEquity: { type: Number },
    cashAndEquivalents: { type: Number },
    totalDebt: { type: Number },
    
    // Income Statement Metrics
    revenue: { type: Number },
    costOfRevenue: { type: Number },
    researchAndDevelopment: { type: Number },
    sellingGeneralAdmin: { type: Number },
    
    // Per Share Metrics
    bookValuePerShare: { type: Number },
    tangibleBookValuePerShare: { type: Number },
    cashPerShare: { type: Number },
    revenuePerShare: { type: Number },
    
    // Additional Metrics
    priceToEarningsGrowth: { type: Number },
    returnOnTangibleAssets: { type: Number },
    priceToSalesGrowth: { type: Number },
    sustainableGrowthRate: { type: Number },
    taxRate: { type: Number },
    enterpriseValue: { type: Number }
  },
  historicalData: [{
    date: { type: Date },
    price: { type: Number },
    volume: { type: Number },
    high: { type: Number },
    low: { type: Number },
    open: { type: Number },
    close: { type: Number }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);

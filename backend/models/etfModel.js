const mongoose = require('mongoose');

const etfSchema = mongoose.Schema({
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
  assetClass: {
    type: String,
    required: true
  },
  issuer: {
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
  aum: {
    type: Number
  },
  nav: {
    type: Number
  },
  navDate: {
    type: Date
  },
  price: {
    type: Number
  },
  priceDate: {
    type: Date
  },
  financialMetrics: {
    // ETF Specific Metrics
    expenseRatio: { type: Number },
    trackingError: { type: Number },
    premiumDiscount: { type: Number },
    avgDailyVolume: { type: Number },
    avgBid_AskSpread: { type: Number },
    beta: { type: Number },
    
    // Performance Metrics
    ytdReturn: { type: Number },
    oneYearReturn: { type: Number },
    threeYearReturn: { type: Number },
    fiveYearReturn: { type: Number },
    tenYearReturn: { type: Number },
    sinceInceptionReturn: { type: Number },
    
    // Risk Metrics
    standardDeviation: { type: Number },
    sharpeRatio: { type: Number },
    treynorRatio: { type: Number },
    sortingRatio: { type: Number },
    informationRatio: { type: Number },
    alpha: { type: Number },
    r_squared: { type: Number },
    downCaptureRatio: { type: Number },
    upCaptureRatio: { type: Number },
    maxDrawdown: { type: Number },
    
    // Income Metrics
    dividendYield: { type: Number },
    ttmYield: { type: Number },
    distributionYield: { type: Number },
    secYield: { type: Number },
    
    // Fixed Income Metrics (if applicable)
    yieldToMaturity: { type: Number },
    duration: { type: Number },
    averageMaturity: { type: Number },
    averageCreditQuality: { type: String },
    
    // Portfolio Composition
    numberOfHoldings: { type: Number },
    percentageInTop10: { type: Number },
    turnoverRatio: { type: Number },
    
    // ESG Metrics
    esgScore: { type: Number },
    environmentalScore: { type: Number },
    socialScore: { type: Number },
    governanceScore: { type: Number },
    
    // Tax Metrics
    taxCostRatio: { type: Number },
    potentialCapitalGainExposure: { type: Number },
    
    // Factor Exposure
    valueExposure: { type: Number },
    growthExposure: { type: Number },
    qualityExposure: { type: Number },
    momentumExposure: { type: Number },
    sizeExposure: { type: Number },
    volatilityExposure: { type: Number }
  },
  sectorAllocation: [{
    sector: { type: String },
    percentage: { type: Number }
  }],
  geographicAllocation: [{
    country: { type: String },
    percentage: { type: Number }
  }],
  topHoldings: [{
    name: { type: String },
    symbol: { type: String },
    percentage: { type: Number }
  }],
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

module.exports = mongoose.model('ETF', etfSchema);

const asyncHandler = require('express-async-handler');
const ETF = require('../models/etfModel');
const { fetchETFData } = require('../services/financialDataService');

// @desc    Get all ETFs
// @route   GET /api/etfs
// @access  Private
const getETFs = asyncHandler(async (req, res) => {
  // Allow filtering by various parameters
  const filter = {};
  
  if (req.query.symbol) {
    filter.symbol = { $regex: req.query.symbol, $options: 'i' };
  }
  
  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }
  
  if (req.query.assetClass) {
    filter.assetClass = req.query.assetClass;
  }
  
  if (req.query.issuer) {
    filter.issuer = req.query.issuer;
  }
  
  if (req.query.exchange) {
    filter.exchange = req.query.exchange;
  }
  
  if (req.query.country) {
    filter.country = req.query.country;
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  // Sort options
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sort.symbol = 1; // Default sort by symbol ascending
  }
  
  const etfs = await ETF.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  
  const totalETFs = await ETF.countDocuments(filter);
  
  res.status(200).json({
    etfs,
    page,
    pages: Math.ceil(totalETFs / limit),
    total: totalETFs
  });
});

// @desc    Get ETF by symbol
// @route   GET /api/etfs/:symbol
// @access  Private
const getETFBySymbol = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  res.status(200).json(etf);
});

// @desc    Add a new ETF
// @route   POST /api/etfs
// @access  Private
const addETF = asyncHandler(async (req, res) => {
  const { symbol } = req.body;
  
  if (!symbol) {
    res.status(400);
    throw new Error('Please provide an ETF symbol');
  }
  
  // Check if ETF already exists
  const etfExists = await ETF.findOne({ symbol: symbol.toUpperCase() });
  
  if (etfExists) {
    res.status(400);
    throw new Error('ETF already exists');
  }
  
  try {
    // Fetch ETF data from external API
    const etfData = await fetchETFData(symbol);
    
    // Create ETF in database
    const etf = await ETF.create(etfData);
    
    res.status(201).json(etf);
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to add ETF: ${error.message}`);
  }
});

// @desc    Update ETF data
// @route   PUT /api/etfs/:symbol
// @access  Private
const updateETF = asyncHandler(async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  
  // Check if ETF exists
  const etf = await ETF.findOne({ symbol });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  try {
    // Fetch updated ETF data from external API
    const etfData = await fetchETFData(symbol);
    
    // Update ETF in database
    const updatedETF = await ETF.findOneAndUpdate(
      { symbol },
      etfData,
      { new: true }
    );
    
    res.status(200).json(updatedETF);
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to update ETF: ${error.message}`);
  }
});

// @desc    Delete ETF
// @route   DELETE /api/etfs/:symbol
// @access  Private
const deleteETF = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  await etf.deleteOne();
  
  res.status(200).json({ message: 'ETF removed' });
});

// @desc    Get ETF metrics
// @route   GET /api/etfs/:symbol/metrics
// @access  Private
const getETFMetrics = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  res.status(200).json(etf.financialMetrics);
});

// @desc    Get ETF historical data
// @route   GET /api/etfs/:symbol/historical
// @access  Private
const getETFHistorical = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  // Filter by date range if provided
  let historicalData = etf.historicalData;
  
  if (req.query.startDate) {
    const startDate = new Date(req.query.startDate);
    historicalData = historicalData.filter(data => new Date(data.date) >= startDate);
  }
  
  if (req.query.endDate) {
    const endDate = new Date(req.query.endDate);
    historicalData = historicalData.filter(data => new Date(data.date) <= endDate);
  }
  
  res.status(200).json(historicalData);
});

// @desc    Get ETF holdings
// @route   GET /api/etfs/:symbol/holdings
// @access  Private
const getETFHoldings = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  res.status(200).json(etf.topHoldings);
});

// @desc    Get ETF sector allocation
// @route   GET /api/etfs/:symbol/sectors
// @access  Private
const getETFSectorAllocation = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  res.status(200).json(etf.sectorAllocation);
});

// @desc    Get ETF geographic allocation
// @route   GET /api/etfs/:symbol/geographic
// @access  Private
const getETFGeographicAllocation = asyncHandler(async (req, res) => {
  const etf = await ETF.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!etf) {
    res.status(404);
    throw new Error('ETF not found');
  }
  
  res.status(200).json(etf.geographicAllocation);
});

module.exports = {
  getETFs,
  getETFBySymbol,
  addETF,
  updateETF,
  deleteETF,
  getETFMetrics,
  getETFHistorical,
  getETFHoldings,
  getETFSectorAllocation,
  getETFGeographicAllocation
};

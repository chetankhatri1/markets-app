const asyncHandler = require('express-async-handler');
const Stock = require('../models/stockModel');
const { fetchStockData } = require('../services/financialDataService');

// @desc    Get all stocks
// @route   GET /api/stocks
// @access  Private
const getStocks = asyncHandler(async (req, res) => {
  // Allow filtering by various parameters
  const filter = {};
  
  if (req.query.symbol) {
    filter.symbol = { $regex: req.query.symbol, $options: 'i' };
  }
  
  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }
  
  if (req.query.exchange) {
    filter.exchange = req.query.exchange;
  }
  
  if (req.query.country) {
    filter.country = req.query.country;
  }
  
  if (req.query.sector) {
    filter.sector = req.query.sector;
  }
  
  if (req.query.industry) {
    filter.industry = req.query.industry;
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
  
  const stocks = await Stock.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  
  const totalStocks = await Stock.countDocuments(filter);
  
  res.status(200).json({
    stocks,
    page,
    pages: Math.ceil(totalStocks / limit),
    total: totalStocks
  });
});

// @desc    Get stock by symbol
// @route   GET /api/stocks/:symbol
// @access  Private
const getStockBySymbol = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!stock) {
    res.status(404);
    throw new Error('Stock not found');
  }
  
  res.status(200).json(stock);
});

// @desc    Add a new stock
// @route   POST /api/stocks
// @access  Private
const addStock = asyncHandler(async (req, res) => {
  const { symbol } = req.body;
  
  if (!symbol) {
    res.status(400);
    throw new Error('Please provide a stock symbol');
  }
  
  // Check if stock already exists
  const stockExists = await Stock.findOne({ symbol: symbol.toUpperCase() });
  
  if (stockExists) {
    res.status(400);
    throw new Error('Stock already exists');
  }
  
  try {
    // Fetch stock data from external API
    const stockData = await fetchStockData(symbol);
    
    // Create stock in database
    const stock = await Stock.create(stockData);
    
    res.status(201).json(stock);
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to add stock: ${error.message}`);
  }
});

// @desc    Update stock data
// @route   PUT /api/stocks/:symbol
// @access  Private
const updateStock = asyncHandler(async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  
  // Check if stock exists
  const stock = await Stock.findOne({ symbol });
  
  if (!stock) {
    res.status(404);
    throw new Error('Stock not found');
  }
  
  try {
    // Fetch updated stock data from external API
    const stockData = await fetchStockData(symbol);
    
    // Update stock in database
    const updatedStock = await Stock.findOneAndUpdate(
      { symbol },
      stockData,
      { new: true }
    );
    
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to update stock: ${error.message}`);
  }
});

// @desc    Delete stock
// @route   DELETE /api/stocks/:symbol
// @access  Private
const deleteStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!stock) {
    res.status(404);
    throw new Error('Stock not found');
  }
  
  await stock.deleteOne();
  
  res.status(200).json({ message: 'Stock removed' });
});

// @desc    Get stock metrics
// @route   GET /api/stocks/:symbol/metrics
// @access  Private
const getStockMetrics = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!stock) {
    res.status(404);
    throw new Error('Stock not found');
  }
  
  res.status(200).json(stock.financialMetrics);
});

// @desc    Get stock historical data
// @route   GET /api/stocks/:symbol/historical
// @access  Private
const getStockHistorical = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
  
  if (!stock) {
    res.status(404);
    throw new Error('Stock not found');
  }
  
  // Filter by date range if provided
  let historicalData = stock.historicalData;
  
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

module.exports = {
  getStocks,
  getStockBySymbol,
  addStock,
  updateStock,
  deleteStock,
  getStockMetrics,
  getStockHistorical
};

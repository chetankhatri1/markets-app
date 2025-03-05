const asyncHandler = require('express-async-handler');
const Watchlist = require('../models/watchlistModel');
const Stock = require('../models/stockModel');
const ETF = require('../models/etfModel');

// @desc    Get all watchlists for a user
// @route   GET /api/watchlist
// @access  Private
const getWatchlists = asyncHandler(async (req, res) => {
  const watchlists = await Watchlist.find({ user: req.user.id });
  res.status(200).json(watchlists);
});

// @desc    Get a specific watchlist
// @route   GET /api/watchlist/:id
// @access  Private
const getWatchlistById = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to access this watchlist');
  }
  
  // Populate securities with actual stock/ETF data
  const populatedSecurities = [];
  
  for (const item of watchlist.securities) {
    let securityData;
    
    if (item.type === 'stock') {
      securityData = await Stock.findById(item.security);
    } else if (item.type === 'etf') {
      securityData = await ETF.findById(item.security);
    }
    
    if (securityData) {
      populatedSecurities.push({
        _id: item._id,
        type: item.type,
        security: securityData,
        addedAt: item.addedAt,
        notes: item.notes
      });
    }
  }
  
  // Update last viewed timestamp
  watchlist.lastViewed = Date.now();
  await watchlist.save();
  
  // Return watchlist with populated securities
  const result = {
    _id: watchlist._id,
    name: watchlist.name,
    description: watchlist.description,
    user: watchlist.user,
    securities: populatedSecurities,
    isDefault: watchlist.isDefault,
    lastViewed: watchlist.lastViewed,
    createdAt: watchlist.createdAt,
    updatedAt: watchlist.updatedAt
  };
  
  res.status(200).json(result);
});

// @desc    Create a new watchlist
// @route   POST /api/watchlist
// @access  Private
const createWatchlist = asyncHandler(async (req, res) => {
  const { name, description, isDefault } = req.body;
  
  if (!name) {
    res.status(400);
    throw new Error('Please provide a name for the watchlist');
  }
  
  // If creating a default watchlist, unset any existing default
  if (isDefault) {
    await Watchlist.updateMany(
      { user: req.user.id, isDefault: true },
      { isDefault: false }
    );
  }
  
  const watchlist = await Watchlist.create({
    name,
    description,
    user: req.user.id,
    securities: [],
    isDefault: isDefault || false
  });
  
  res.status(201).json(watchlist);
});

// @desc    Update a watchlist
// @route   PUT /api/watchlist/:id
// @access  Private
const updateWatchlist = asyncHandler(async (req, res) => {
  const { name, description, isDefault } = req.body;
  
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this watchlist');
  }
  
  // If setting as default, unset any existing default
  if (isDefault && !watchlist.isDefault) {
    await Watchlist.updateMany(
      { user: req.user.id, isDefault: true },
      { isDefault: false }
    );
  }
  
  watchlist.name = name || watchlist.name;
  watchlist.description = description !== undefined ? description : watchlist.description;
  watchlist.isDefault = isDefault !== undefined ? isDefault : watchlist.isDefault;
  
  const updatedWatchlist = await watchlist.save();
  
  res.status(200).json(updatedWatchlist);
});

// @desc    Delete a watchlist
// @route   DELETE /api/watchlist/:id
// @access  Private
const deleteWatchlist = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this watchlist');
  }
  
  await watchlist.deleteOne();
  
  res.status(200).json({ message: 'Watchlist removed' });
});

// @desc    Add security to watchlist
// @route   POST /api/watchlist/:id/securities
// @access  Private
const addSecurityToWatchlist = asyncHandler(async (req, res) => {
  const { type, symbol, notes } = req.body;
  
  if (!type || !symbol) {
    res.status(400);
    throw new Error('Please provide security type and symbol');
  }
  
  if (type !== 'stock' && type !== 'etf') {
    res.status(400);
    throw new Error('Security type must be either "stock" or "etf"');
  }
  
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to modify this watchlist');
  }
  
  // Find the security by symbol
  let security;
  if (type === 'stock') {
    security = await Stock.findOne({ symbol: symbol.toUpperCase() });
  } else {
    security = await ETF.findOne({ symbol: symbol.toUpperCase() });
  }
  
  if (!security) {
    res.status(404);
    throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} with symbol ${symbol} not found`);
  }
  
  // Check if security already exists in watchlist
  const securityExists = watchlist.securities.find(
    item => item.type === type && item.security.toString() === security._id.toString()
  );
  
  if (securityExists) {
    res.status(400);
    throw new Error(`This ${type} is already in your watchlist`);
  }
  
  // Add security to watchlist
  watchlist.securities.push({
    type,
    security: security._id,
    notes: notes || ''
  });
  
  await watchlist.save();
  
  res.status(200).json(watchlist);
});

// @desc    Remove security from watchlist
// @route   DELETE /api/watchlist/:id/securities/:securityId
// @access  Private
const removeSecurityFromWatchlist = asyncHandler(async (req, res) => {
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to modify this watchlist');
  }
  
  // Find security in watchlist
  const securityIndex = watchlist.securities.findIndex(
    item => item._id.toString() === req.params.securityId
  );
  
  if (securityIndex === -1) {
    res.status(404);
    throw new Error('Security not found in watchlist');
  }
  
  // Remove security from watchlist
  watchlist.securities.splice(securityIndex, 1);
  
  await watchlist.save();
  
  res.status(200).json(watchlist);
});

// @desc    Update security notes in watchlist
// @route   PUT /api/watchlist/:id/securities/:securityId
// @access  Private
const updateSecurityNotes = asyncHandler(async (req, res) => {
  const { notes } = req.body;
  
  const watchlist = await Watchlist.findById(req.params.id);
  
  if (!watchlist) {
    res.status(404);
    throw new Error('Watchlist not found');
  }
  
  // Check if watchlist belongs to user
  if (watchlist.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to modify this watchlist');
  }
  
  // Find security in watchlist
  const security = watchlist.securities.find(
    item => item._id.toString() === req.params.securityId
  );
  
  if (!security) {
    res.status(404);
    throw new Error('Security not found in watchlist');
  }
  
  // Update notes
  security.notes = notes;
  
  await watchlist.save();
  
  res.status(200).json(watchlist);
});

module.exports = {
  getWatchlists,
  getWatchlistById,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addSecurityToWatchlist,
  removeSecurityFromWatchlist,
  updateSecurityNotes
};

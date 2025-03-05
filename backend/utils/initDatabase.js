const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Stock = require('../models/stockModel');
const ETF = require('../models/etfModel');
const Watchlist = require('../models/watchlistModel');
const { fetchStockData, fetchETFData } = require('../services/financialDataService');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/global-stock-analyzer')
  .then(() => console.log('MongoDB connected for initialization'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data for initialization
const sampleStockSymbols = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 
  'TSLA', 'NVDA', 'JPM', 'V', 'JNJ',
  'WMT', 'PG', 'XOM', 'BAC', 'HD'
];

const sampleETFSymbols = [
  'SPY', 'QQQ', 'VTI', 'IWM', 'EFA',
  'VWO', 'GLD', 'AGG', 'LQD', 'VNQ'
];

// Initialize the database with sample data
const initDatabase = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Stock.deleteMany({});
    await ETF.deleteMany({});
    await Watchlist.deleteMany({});
    
    // Create admin user
    console.log('Creating admin user...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const user = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    });
    
    console.log('Admin user created:', user.username);
    
    // Add sample stocks
    console.log('Adding sample stocks...');
    for (const symbol of sampleStockSymbols) {
      try {
        const stockData = await fetchStockData(symbol);
        await Stock.create(stockData);
        console.log(`Added stock: ${symbol}`);
      } catch (error) {
        console.error(`Error adding stock ${symbol}:`, error.message);
      }
    }
    
    // Add sample ETFs
    console.log('Adding sample ETFs...');
    for (const symbol of sampleETFSymbols) {
      try {
        const etfData = await fetchETFData(symbol);
        await ETF.create(etfData);
        console.log(`Added ETF: ${symbol}`);
      } catch (error) {
        console.error(`Error adding ETF ${symbol}:`, error.message);
      }
    }
    
    // Create default watchlist
    console.log('Creating default watchlist...');
    
    // Get some stock and ETF IDs
    const stocks = await Stock.find().limit(5);
    const etfs = await ETF.find().limit(3);
    
    const securities = [
      ...stocks.map(stock => ({
        type: 'stock',
        security: stock._id,
        notes: `Added ${stock.symbol} to default watchlist`
      })),
      ...etfs.map(etf => ({
        type: 'etf',
        security: etf._id,
        notes: `Added ${etf.symbol} to default watchlist`
      }))
    ];
    
    const watchlist = await Watchlist.create({
      name: 'Default Watchlist',
      description: 'A default watchlist with sample stocks and ETFs',
      user: user._id,
      securities,
      isDefault: true
    });
    
    console.log('Default watchlist created with', securities.length, 'securities');
    
    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initDatabase();

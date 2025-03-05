const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cron = require('node-cron');
const { updateFinancialData } = require('./services/dataUpdateService');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/etfs', require('./routes/etfRoutes'));
app.use('/api/watchlist', require('./routes/watchlistRoutes'));
app.use('/api/metrics', require('./routes/metricRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

// Schedule daily data updates at 1:00 AM
cron.schedule('0 1 * * *', async () => {
  console.log('Running scheduled financial data update');
  try {
    await updateFinancialData();
    console.log('Financial data update completed successfully');
  } catch (error) {
    console.error('Error updating financial data:', error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Stock = require('../models/stockModel');
const ETF = require('../models/etfModel');
const { fetchStockData, fetchETFData } = require('./financialDataService');

/**
 * Update financial data for all stocks and ETFs in the database
 * This service is used by the scheduled cron job and manual update requests
 */
const updateFinancialData = async () => {
  try {
    console.log('Starting financial data update...');
    let updatedCount = 0;
    let errorCount = 0;
    
    // Update stocks
    const stocks = await Stock.find({});
    console.log(`Found ${stocks.length} stocks to update`);
    
    for (const stock of stocks) {
      try {
        console.log(`Updating stock: ${stock.symbol}`);
        const stockData = await fetchStockData(stock.symbol);
        
        // Update stock data while preserving the _id
        await Stock.findOneAndUpdate(
          { symbol: stock.symbol },
          {
            ...stockData,
            lastUpdated: new Date()
          }
        );
        
        updatedCount++;
      } catch (error) {
        console.error(`Error updating stock ${stock.symbol}:`, error.message);
        errorCount++;
      }
    }
    
    // Update ETFs
    const etfs = await ETF.find({});
    console.log(`Found ${etfs.length} ETFs to update`);
    
    for (const etf of etfs) {
      try {
        console.log(`Updating ETF: ${etf.symbol}`);
        const etfData = await fetchETFData(etf.symbol);
        
        // Update ETF data while preserving the _id
        await ETF.findOneAndUpdate(
          { symbol: etf.symbol },
          {
            ...etfData,
            lastUpdated: new Date()
          }
        );
        
        updatedCount++;
      } catch (error) {
        console.error(`Error updating ETF ${etf.symbol}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`Financial data update completed. Updated: ${updatedCount}, Errors: ${errorCount}`);
    return {
      success: true,
      updatedCount,
      errorCount,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error in updateFinancialData service:', error);
    throw new Error(`Failed to update financial data: ${error.message}`);
  }
};

/**
 * Update financial data for a specific security
 * @param {string} type - Type of security ('stock' or 'etf')
 * @param {string} symbol - Symbol of the security
 */
const updateSecurityData = async (type, symbol) => {
  try {
    console.log(`Updating ${type} data for ${symbol}...`);
    
    if (type === 'stock') {
      const stockData = await fetchStockData(symbol);
      await Stock.findOneAndUpdate(
        { symbol },
        {
          ...stockData,
          lastUpdated: new Date()
        }
      );
    } else if (type === 'etf') {
      const etfData = await fetchETFData(symbol);
      await ETF.findOneAndUpdate(
        { symbol },
        {
          ...etfData,
          lastUpdated: new Date()
        }
      );
    } else {
      throw new Error(`Invalid security type: ${type}`);
    }
    
    console.log(`Successfully updated ${type} data for ${symbol}`);
    return {
      success: true,
      type,
      symbol,
      timestamp: new Date()
    };
  } catch (error) {
    console.error(`Error updating ${type} data for ${symbol}:`, error);
    throw new Error(`Failed to update ${type} data for ${symbol}: ${error.message}`);
  }
};

module.exports = {
  updateFinancialData,
  updateSecurityData
};

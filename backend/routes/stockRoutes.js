const express = require('express');
const router = express.Router();
const { 
  getStocks,
  getStockBySymbol,
  addStock,
  updateStock,
  deleteStock,
  getStockMetrics,
  getStockHistorical
} = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getStocks)
  .post(addStock);

router.route('/:symbol')
  .get(getStockBySymbol)
  .put(updateStock)
  .delete(deleteStock);

router.get('/:symbol/metrics', getStockMetrics);
router.get('/:symbol/historical', getStockHistorical);

module.exports = router;

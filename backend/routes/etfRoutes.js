const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/etfController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getETFs)
  .post(addETF);

router.route('/:symbol')
  .get(getETFBySymbol)
  .put(updateETF)
  .delete(deleteETF);

router.get('/:symbol/metrics', getETFMetrics);
router.get('/:symbol/historical', getETFHistorical);
router.get('/:symbol/holdings', getETFHoldings);
router.get('/:symbol/sectors', getETFSectorAllocation);
router.get('/:symbol/geographic', getETFGeographicAllocation);

module.exports = router;

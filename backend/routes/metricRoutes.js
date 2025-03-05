const express = require('express');
const router = express.Router();
const { 
  compareMetrics,
  getAvailableMetrics,
  analyzeMetrics
} = require('../controllers/metricController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.post('/compare', compareMetrics);
router.get('/available', getAvailableMetrics);
router.post('/analyze', analyzeMetrics);

module.exports = router;

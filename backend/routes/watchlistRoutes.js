const express = require('express');
const router = express.Router();
const { 
  getWatchlists,
  getWatchlistById,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addSecurityToWatchlist,
  removeSecurityFromWatchlist,
  updateSecurityNotes
} = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.route('/')
  .get(getWatchlists)
  .post(createWatchlist);

router.route('/:id')
  .get(getWatchlistById)
  .put(updateWatchlist)
  .delete(deleteWatchlist);

router.route('/:id/securities')
  .post(addSecurityToWatchlist);

router.route('/:id/securities/:securityId')
  .put(updateSecurityNotes)
  .delete(removeSecurityFromWatchlist);

module.exports = router;

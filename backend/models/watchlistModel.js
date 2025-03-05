const mongoose = require('mongoose');

const watchlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a watchlist name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  securities: [{
    type: {
      type: String,
      enum: ['stock', 'etf'],
      required: true
    },
    security: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'securities.type'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String
    }
  }],
  isDefault: {
    type: Boolean,
    default: false
  },
  lastViewed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure securities references are correctly set up
watchlistSchema.path('securities.type').validate(function(value) {
  if (value === 'stock') {
    return this.securities.security.ref = 'Stock';
  } else if (value === 'etf') {
    return this.securities.security.ref = 'ETF';
  }
  return false;
});

module.exports = mongoose.model('Watchlist', watchlistSchema);

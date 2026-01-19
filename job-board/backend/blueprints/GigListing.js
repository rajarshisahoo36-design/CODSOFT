const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A gig must have a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A gig must have a description']
  },
  location: {
    type: String,
    default: 'Remote'
  },
  salaryRange: {
    type: String,
    default: 'Negotiable'
  },
  listingType: {
    type: String,
    default: 'Contract', // Contract, Full-time, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserPersona'
  },
  // Hidden field for search optimization
  searchMetadata: {
    type: String,
    select: false
  }
});

// Middleware to populate search metadata automatically
gigSchema.pre('save', function(next) {
  this.searchMetadata = `${this.title} ${this.description} ${this.location}`.toLowerCase();
  next();
});

const GigListing = mongoose.model('GigListing', gigSchema);
module.exports = GigListing;
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  salary: {
    type: String,
    required: [true, 'Please add a salary range (e.g., $50k - $80k)']
  },
  description: {
    type: String,
    required: [true, 'Please add a job description']
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Links the job to the user who posted it
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
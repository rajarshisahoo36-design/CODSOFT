const express = require('express');
const router = express.Router();
const { getAllJobs, createJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware'); // Use your existing auth middleware

// Anyone can SEE jobs
router.get('/', getAllJobs);

// Only Logged In users can POST jobs
router.post('/', protect, createJob);

module.exports = router;
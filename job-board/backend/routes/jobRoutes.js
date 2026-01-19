const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware'); // Use your existing auth middleware

// Public route to view jobs
router.get('/', getJobs);

// Protected route to post a job (User must be logged in)
router.post('/', protect, createJob);

module.exports = router;
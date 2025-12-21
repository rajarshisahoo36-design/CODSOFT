const express = require('express');
const gigHandler = require('../handlers/gigHandler');
const authHandler = require('../handlers/authHandler');

const router = express.Router();

// Public Routes (Anyone can see)
router.get('/search', gigHandler.searchGigs);
router.get('/:id', gigHandler.getGigDetails);

// Protected Routes (Only logged in users can post)
router.use(authHandler.protect);

router.post('/', gigHandler.createGig);

module.exports = router;
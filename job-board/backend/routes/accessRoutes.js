const express = require('express');
const authHandler = require('../handlers/authHandler');
const User = require('../models/userModel');

const router = express.Router();

router.post('/join', authHandler.onboardUser); // Sign up
router.post('/enter', authHandler.loginUser);  // Login

module.exports = router;
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser); // Register Route
router.post('/login', authUser); // Login Route

module.exports = router;
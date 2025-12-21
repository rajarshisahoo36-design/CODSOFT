const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const accessRoutes = require('./routes/accessRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();

// Middleware
app.use(cors()); // Allow requests from our React frontend
app.use(express.json()); // Parse JSON bodies

// Database Connection
const dbURI = process.env.DATABASE_URL;
// TEMPORARY FIX: Hardcoding the address
// const dbURI = "mongodb://127.0.0.1:27017/codsoft-jobboard";
mongoose.connect(dbURI)
  .then(() => console.log('DB Connection: SOLID'))
  .catch((err) => console.log('DB Connection: FAILED', err));

// Route Mounting
app.use('/api/v1/auth', accessRoutes);
app.use('/api/v1/gigs', marketRoutes);

// --- FIXED 404 HANDLER ---
// We changed app.all('*') to app.use() to fix the "Missing parameter" crash
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is humming on port ${PORT}...`);
});
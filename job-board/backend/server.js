const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Route Files
// Ensure these filenames match EXACTLY what you have in your folders
const authRoutes = require('./routes/accessRoutes'); 
const jobRoutes = require('./routes/jobs'); 

const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON bodies

// --- ROUTE MOUNTING ---
// 1. Authentication Routes (Login/Register)
app.use('/api/v1/auth', authRoutes);

// 2. Job Routes (Post a Job, Get Jobs)
app.use('/api/v1/jobs', jobRoutes);

// Database Connection
const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI)
  .then(() => console.log('DB Connection: SOLID'))
  .catch((err) => console.log('DB Connection: FAILED', err));

// --- 404 HANDLER ---
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
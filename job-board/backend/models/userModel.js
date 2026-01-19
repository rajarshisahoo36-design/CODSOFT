const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8, // 👈 NOTE: Password must be 8+ chars
    select: false
  },
  role: {
    type: String,
    enum: ['talent', 'employer', 'admin', 'scout'],
    default: 'talent'
  }
}, 
{ 
  collection: 'final_users',
  timestamps: true 
});

// 🔒 1. ENCRYPT PASSWORD (FIXED: Removed 'next' to prevent crash)
userSchema.pre('save', async function() {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return;

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// 🔑 2. METHOD TO CHECK PASSWORD
userSchema.methods.checkPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const AppUser = mongoose.model('AppUser', userSchema);

module.exports = AppUser;
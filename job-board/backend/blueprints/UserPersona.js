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
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['scout', 'talent'], // scout = employer, talent = candidate
    default: 'talent'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // Never show password in output
  }
});

// Encrypt password before saving
userSchema.pre('save', async function() {
  // If password wasn't modified, do nothing
  if (!this.isModified('password')) return;
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check password
userSchema.methods.checkPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserPersona = mongoose.model('UserPersona', userSchema);
module.exports = UserPersona;
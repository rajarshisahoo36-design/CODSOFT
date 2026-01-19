// Authentication and authorization logic will be implemented here
const UserPersona = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

// Quick helper to sign tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

// 1. Onboarding (Sign Up)
exports.onboardUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // We strictly limit what can be passed here to prevent malicious data injection
  const newUser = await UserPersona.create({
    username,
    email,
    password,
    role: role || 'talent' // Default to candidate if not specified
  });

  // Remove password from output just to be safe
  newUser.password = undefined;

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
});

// 2. Gatekeeping (Login)
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Basic validation because we can't trust the frontend
  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
  }

  // Explicitly selecting password because we set select:false in the model
  const user = await UserPersona.findOne({ email }).select('+password');

  // Using our custom method from the Model to check password match
  if (!user || !(await user.checkPassword(password, user.password))) {
    return res.status(401).json({ status: 'fail', message: 'Incorrect credentials' });
  }

  // If we get here, they are good to go
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

// 3. Protection Middleware (THIS WAS MISSING)
// This checks if the user is actually logged in before letting them post jobs
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  
  // 1) Getting token from the header (Bearer Token pattern)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'You are not logged in! Please log in to get access.' 
    });
  }

  // 2) Verify the token (Is it fake? Is it expired?)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists (Maybe they were deleted yesterday?)
  const currentUser = await UserPersona.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'The user belonging to this token no longer exists.' 
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
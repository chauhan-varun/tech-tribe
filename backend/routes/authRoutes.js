const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserEmail, updateUserPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Register a new admin user
router.post(
  '/register', 
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user email
router.put(
  '/:userId/email',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  protect,
  updateUserEmail
);

// Update user password
router.put(
  '/:userId/password',
  [
    check('currentPassword', 'Current password is required').exists(),
    check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  protect,
  updateUserPassword
);

module.exports = router;

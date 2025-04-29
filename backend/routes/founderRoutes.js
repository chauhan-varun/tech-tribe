const express = require('express');
const router = express.Router();
const { 
  getFounders, 
  getFounderById, 
  createFounder, 
  updateFounder, 
  deleteFounder 
} = require('../controllers/founderController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getFounders);
router.get('/:id', getFounderById);

// Protected routes (admin only)
router.post('/', protect, admin, upload.single('image'), createFounder);
router.put('/:id', protect, admin, upload.single('image'), updateFounder);
router.delete('/:id', protect, admin, deleteFounder);

module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  getOrganizations, 
  getOrganizationById, 
  createOrganization, 
  updateOrganization, 
  deleteOrganization 
} = require('../controllers/organizationController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);

// Protected routes (admin only)
router.post('/', protect, admin, upload.single('image'), createOrganization);
router.put('/:id', protect, admin, upload.single('image'), updateOrganization);
router.delete('/:id', protect, admin, deleteOrganization);

module.exports = router;

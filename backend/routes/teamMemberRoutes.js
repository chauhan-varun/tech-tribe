const express = require('express');
const router = express.Router();
const { 
  getTeamMembers, 
  getTeamMemberById, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} = require('../controllers/teamMemberController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMemberById);

// Protected routes (admin only)
router.post('/', protect, admin, upload.single('image'), createTeamMember);
router.put('/:id', protect, admin, upload.single('image'), updateTeamMember);
router.delete('/:id', protect, admin, deleteTeamMember);

module.exports = router;

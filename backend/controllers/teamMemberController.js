const TeamMember = require('../models/TeamMember');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all team members
// @route   GET /api/team-members
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({}).sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single team member
// @route   GET /api/team-members/:id
// @access  Public
const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (teamMember) {
      res.json(teamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a team member
// @route   POST /api/team-members
// @access  Private/Admin
const createTeamMember = async (req, res) => {
  try {
    const { teamName, role } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }
    
    const newTeamMember = new TeamMember({
      teamName,
      role,
      image: req.file.path
    });
    
    const savedTeamMember = await newTeamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a team member
// @route   PUT /api/team-members/:id
// @access  Private/Admin
const updateTeamMember = async (req, res) => {
  try {
    const { teamName, role } = req.body;
    
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    teamMember.teamName = teamName || teamMember.teamName;
    teamMember.role = role || teamMember.role;
    
    if (req.file) {
      // Delete previous image from Cloudinary if it exists
      if (teamMember.image) {
        const publicId = teamMember.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
      }
      teamMember.image = req.file.path;
    }
    
    const updatedTeamMember = await teamMember.save();
    res.json(updatedTeamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team-members/:id
// @access  Private/Admin
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    // Delete image from Cloudinary
    if (teamMember.image) {
      const publicId = teamMember.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
    }
    
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};

const Founder = require('../models/Founder');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all founders
// @route   GET /api/founders
// @access  Public
const getFounders = async (req, res) => {
  try {
    const founders = await Founder.find({});
    res.json(founders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single founder
// @route   GET /api/founders/:id
// @access  Public
const getFounderById = async (req, res) => {
  try {
    const founder = await Founder.findById(req.params.id);
    
    if (founder) {
      res.json(founder);
    } else {
      res.status(404).json({ message: 'Founder not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a founder
// @route   POST /api/founders
// @access  Private/Admin
const createFounder = async (req, res) => {
  try {
    const { name, role, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }
    
    const newFounder = new Founder({
      name,
      role,
      description: description || '',
      image: req.file.path
    });
    
    const savedFounder = await newFounder.save();
    res.status(201).json(savedFounder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a founder
// @route   PUT /api/founders/:id
// @access  Private/Admin
const updateFounder = async (req, res) => {
  try {
    const { name, role, description } = req.body;
    
    const founder = await Founder.findById(req.params.id);
    
    if (!founder) {
      return res.status(404).json({ message: 'Founder not found' });
    }
    
    founder.name = name || founder.name;
    founder.role = role || founder.role;
    founder.description = description !== undefined ? description : founder.description;
    
    if (req.file) {
      // Delete previous image from Cloudinary if it exists
      if (founder.image) {
        const publicId = founder.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
      }
      founder.image = req.file.path;
    }
    
    const updatedFounder = await founder.save();
    res.json(updatedFounder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a founder
// @route   DELETE /api/founders/:id
// @access  Private/Admin
const deleteFounder = async (req, res) => {
  try {
    const founder = await Founder.findById(req.params.id);
    
    if (!founder) {
      return res.status(404).json({ message: 'Founder not found' });
    }
    
    // Delete image from Cloudinary
    if (founder.image) {
      const publicId = founder.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
    }
    
    await founder.remove();
    res.json({ message: 'Founder removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getFounders,
  getFounderById,
  createFounder,
  updateFounder,
  deleteFounder
};

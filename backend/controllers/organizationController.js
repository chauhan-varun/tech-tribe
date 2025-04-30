const Organization = require('../models/Organization');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all organizations
// @route   GET /api/organizations
// @access  Public
const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single organization
// @route   GET /api/organizations/:id
// @access  Public
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (organization) {
      res.json(organization);
    } else {
      res.status(404).json({ message: 'Organization not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an organization
// @route   POST /api/organizations
// @access  Private/Admin
const createOrganization = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }
    
    const newOrganization = new Organization({
      title,
      description,
      image: req.file.path
    });
    
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an organization
// @route   PUT /api/organizations/:id
// @access  Private/Admin
const updateOrganization = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    
    organization.title = title || organization.title;
    organization.description = description || organization.description;
    
    if (req.file) {
      // Delete previous image from Cloudinary if it exists
      if (organization.image) {
        const publicId = organization.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
      }
      organization.image = req.file.path;
    }
    
    const updatedOrganization = await organization.save();
    res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an organization
// @route   DELETE /api/organizations/:id
// @access  Private/Admin
const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    
    // Delete image from Cloudinary
    if (organization.image) {
      const publicId = organization.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`tech-tribe/${publicId}`);
    }
    
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ message: 'Organization removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization
};

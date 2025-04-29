const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Organization title is required']
  },
  image: {
    type: String, // Cloudinary URL
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Organization', organizationSchema);

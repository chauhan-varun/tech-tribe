const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Founder name is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  },
  image: {
    type: String, // Cloudinary URL
    required: [true, 'Image is required']
  },
  description: {
    type: String,
    default: '' // Optional
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Founder', founderSchema);

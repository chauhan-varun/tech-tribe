const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team member name is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  },
  image: {
    type: String, // Cloudinary URL
    required: [true, 'Image is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);

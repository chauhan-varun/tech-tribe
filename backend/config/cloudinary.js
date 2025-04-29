const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tech-tribe',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

// Initialize multer upload with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = {
  cloudinary,
  upload
};

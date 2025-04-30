const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/team-members', require('./routes/teamMemberRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/founders', require('./routes/founderRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tech Tribe API' });
});

// Handle 404s
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: process.env.NODE_ENV === 'development' ? err.message : {} });
});

// Set PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

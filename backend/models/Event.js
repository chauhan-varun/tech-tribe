const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: [true, 'Event title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);

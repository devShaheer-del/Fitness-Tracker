const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Workout', 'Meal', 'Fitness Check'],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Reminder', reminderSchema);

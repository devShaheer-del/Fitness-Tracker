const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, required: true },

  workouts: [
    {
      workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'workouts.modelType',
      },
      modelType: {
        type: String,
        required: true,
        enum: ['workout', 'cardio'],
      },
    },
  ],

  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'meal',
      required: true,
    },
  ],

  reminders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reminder',
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('auth', authSchema);

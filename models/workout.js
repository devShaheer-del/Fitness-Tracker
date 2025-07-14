const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    Exercise: { type: String, required: true },
    Sets: { type: Number, required: true },
    Reps: { type: Number, required: true },
    Weight: { type: Number, required: true },
    Note: { type: String, required: true }
});

const WorkoutModel = mongoose.model('workout', workoutSchema);
module.exports = WorkoutModel;

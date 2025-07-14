const mongoose = require('mongoose');

const cardioSchema = new mongoose.Schema({
    CardioName: { type: String, required: true },
    Duration: { type: String, required: true },
    Distance: { type: Number, required: true },
    Note: { type: String, required: true }
});

const CardioModel = mongoose.model('cardio', cardioSchema);
module.exports = CardioModel;

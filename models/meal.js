const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    meal_type: {
        type: String,
        required: true
    },
    food_item: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
});

const mealModel = mongoose.model('meal', mealSchema);


module.exports = mealModel;
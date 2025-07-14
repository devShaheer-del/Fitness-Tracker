const mealDB = require('../models/meal');
const AuthModel = require('../models/auth'); // make sure to require your auth model

exports.CreateMeal = async (req, res) => {
  try {
    const { meal_type, food_item, quantity, calories, protein, carbs, fat } = req.body;

    // Validate all fields are present
    if (
      !meal_type ||
      food_item === undefined ||
      quantity === undefined ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fat === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if meal already exists
    const meal_exist = await mealDB.findOne({ meal_type, food_item });

    if (meal_exist) {
      return res.status(400).json({
        message: "Meal already exists",
        success: false,
      });
    }

    // Create new meal
    const newMeal = await mealDB.create({
      meal_type,
      food_item,
      quantity,
      calories,
      protein,
      carbs,
      fat,
    });

    // Update the authenticated user's meals array by pushing this meal's _id
    await AuthModel.findByIdAndUpdate(
      req.userId,
      { $push: { meals: newMeal._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Meal created successfully",
      success: true,
      meal: newMeal,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message || error,
    });
  }
};

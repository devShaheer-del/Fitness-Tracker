const authModel = require('../models/auth');
const cardioModel = require('../models/cardio');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');
const mealModel = require('../models/meal');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dog8hzzop',
    api_key: '635187578911971',
    api_secret: 'wJiYLegJcR-3HmksZnJfrEhvOu4'
});

exports.Register = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const IsExist = await authModel.findOne({ email });

        if (IsExist) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "No photo uploaded" });
        }

        const file = req.files.photo;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const User = await authModel.create({
            name,
            email,
            password: hashedPassword,
            profile: result.secure_url
        });

        return res.status(200).json({
            message: "User registered successfully",
            success: true,
            user: User
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};




exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Both fields are required",
                success: false
            });
        }

        const UserExist = await authModel.findOne({ email });

        if (!UserExist) {
            return res.status(401).json({
                message: "User does not exist",
                success: false
            });
        }

        const comparePassword = await bcrypt.compare(password, UserExist.password);

        if (!comparePassword) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign(
            { id: UserExist._id, email: UserExist.email },
            secret,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "User Login Successfully",
            success: true,
            user: UserExist,
            token: token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};




exports.UpdateProfile = async (req, res) => {
    try {
        const id = req.params.id;

        let updatedFields = { ...req.body };

        // Hash password if present
        if (updatedFields.password) {
            updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
        }

        // Handle photo upload
        if (req.files && req.files.photo) {
            const file = req.files.photo;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "users"
            });
            updatedFields.profile = result.secure_url;
        }

        const updatedUser = await authModel.findByIdAndUpdate(id, updatedFields, {
            new: true
        });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            updatedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};



exports.GetWorkouts = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: User not logged in",
                success: false
            });
        }

        const user = await authModel.findById(userId).populate({
            path: 'workouts.workoutId',
            strictPopulate: false // ensures it doesn’t throw if modelType mismatches
        });

        if (!user || !user.workouts?.length) {
            return res.status(404).json({
                message: "No workouts found for this user",
                success: false
            });
        }

        // Filter out any workoutId that failed to populate
        const workoutsData = user.workouts
            .filter(item => item.workoutId && item.workoutId._id)
            .map(item => ({
                _id: item.workoutId._id,
                modelType: item.modelType,
                ...item.workoutId._doc
            }));

        return res.status(200).json({
            message: "Workouts fetched successfully",
            success: true,
            workouts: workoutsData
        });

    } catch (error) {
        console.error("Error in GetWorkouts:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};



exports.getMeals = async (req, res) => {
    try {
        // Get the logged-in user by ID (set by your auth middleware)
        const user = await authModel.findById(req.userId).populate('meals');

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // If the user exists but has no meals
        if (!user.meals || user.meals.length === 0) {
            return res.status(200).json({
                message: "No meals found",
                success: true,
                meals: []
            });
        }

        // Return user's meals
        return res.status(200).json({
            message: "Meals fetched successfully",
            success: true,
            meals: user.meals
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};



exports.updateMeal = async (req, res) => {
    try {
        const { mealId } = req.params;
        const userId = req.userId; // Comes from auth middleware
        const updates = req.body;

        // Step 1: Validate user
        const user = await authModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Step 2: Check if the meal belongs to the user
        const meal = await mealModel.findById(mealId);
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found",
            });
        }

        if (!user.meals.includes(mealId)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this meal",
            });
        }

        // Step 3: Update the meal
        const updatedMeal = await mealModel.findByIdAndUpdate(mealId, updates, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            meal: updatedMeal,
        });
    } catch (error) {
        console.error("Error updating meal:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};




exports.deleteMeal = async (req, res) => {
    try {
        const { mealId } = req.params;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(mealId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid meal ID"
            });
        }

        const user = await authModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const meal = await mealModel.findById(mealId);
        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found",
            });
        }

        const mealBelongsToUser = user.meals.some((id) => id.equals(mealId));
        if (!mealBelongsToUser) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this meal",
            });
        }

        await mealModel.findByIdAndDelete(mealId);
        user.meals.pull(mealId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting meal:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Basic validation
        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required",
                success: false
            });
        }

        // Check if user exists
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: "Password updated successfully",
            success: true
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};
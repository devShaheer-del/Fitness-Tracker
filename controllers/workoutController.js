const workoutDb = require('../models/workout');
const authModel = require('../models/auth');
const cardioModel = require('../models/cardio');
const mongoose = require('mongoose');
exports.createExercise = async (req, res) => {
    try {
        const { Exercise, Sets, Reps, Weight, Note } = req.body;

        // Validate input
        if (!Exercise || Sets === undefined || Reps === undefined || Weight === undefined || Note === undefined) {
            return res.status(400).json({
                message: "All fields (Exercise, Sets, Reps, Weight, Note) are required",
                success: false,
            });
        }

        // Optional duplicate check
        const existingWorkout = await workoutDb.findOne({ Exercise, Sets });

        if (existingWorkout) {
            return res.status(409).json({
                message: "Exercise already exists with the same sets",
                success: false,
            });
        }

        // Create the workout
        const newWorkout = await workoutDb.create({
            Exercise,
            Sets: Number(Sets),
            Reps: Number(Reps),
            Weight: Number(Weight),
            Note,
        });

        // Push workout with modelType
        await authModel.findByIdAndUpdate(req.userId, {
            $push: {
                workouts: {
                    workoutId: newWorkout._id,
                    modelType: 'workout', // 🟢 Add modelType
                },
            },
        });

        return res.status(201).json({
            message: "Workout created successfully",
            success: true,
            workout: newWorkout,
        });

    } catch (error) {
        console.error("Error in createExercise:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};


exports.CreateCardio = async (req, res) => {
    try {
        const { CardioName, Duration, Distance, Note } = req.body;

        if (!CardioName || Duration === undefined || Distance === undefined || Note === undefined) {
            return res.status(400).json({
                message: "All fields (CardioName, Duration, Distance, Note) are required",
                success: false,
            });
        }

        const existingCardio = await cardioModel.findOne({ CardioName, Duration });

        if (existingCardio) {
            return res.status(409).json({
                message: "Cardio workout already exists with the same duration",
                success: false,
            });
        }

        const newCardio = await cardioModel.create({
            CardioName,
            Duration: Number(Duration),
            Distance: Number(Distance),
            Note,
        });

        await authModel.findByIdAndUpdate(req.userId, {
            $push: {
                workouts: {
                    workoutId: newCardio._id,
                    modelType: 'cardio', // ✅ already correct
                },
            },
        });

        return res.status(201).json({
            message: "Cardio workout created successfully",
            success: true,
            cardio: newCardio,
        });

    } catch (error) {
        console.error("Error in CreateCardio:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};



exports.updateWorkout = async (req, res) => {
    try {
        const userId = req.userId;
        const workoutId = req.params.id;
        const modelType = req.query.type; // cardio or workout
        const updateData = req.body;

        if (!userId || !workoutId || !modelType) {
            return res.status(400).json({
                message: "Missing required data (userId, workoutId, modelType)",
                success: false,
            });
        }

        // Validate user owns the workout
        const user = await authModel.findById(userId);
        const workoutRef = user.workouts.find(
            (w) => w.workoutId.toString() === workoutId && w.modelType === modelType
        );

        if (!workoutRef) {
            return res.status(403).json({
                message: "Workout not found in your account or access denied",
                success: false,
            });
        }

        // Choose correct model
        let model;
        if (modelType === 'cardio') {
            model = cardioModel;
        } else if (modelType === 'workout') {
            model = workoutDb;
        } else {
            return res.status(400).json({
                message: "Invalid modelType. Must be 'cardio' or 'workout'",
                success: false,
            });
        }

        const updatedWorkout = await model.findByIdAndUpdate(
            workoutId,
            updateData,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({
                message: "Workout not found or could not be updated",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Workout updated successfully",
            success: true,
            workout: updatedWorkout,
        });

    } catch (error) {
        console.error("Update Workout Error:", error);
        return res.status(500).json({
            message: "Server error while updating workout",
            success: false,
        });
    }
};




exports.getWorkouts = async (req, res) => {
    try {
        const strengthWorkouts = await workoutDb.find({});
        const cardioWorkouts = await cardioModel.find({});

        // Combine both arrays and tag them with modelType for frontend use
        const allWorkouts = [
            ...strengthWorkouts.map(w => ({ ...w._doc, modelType: "workout" })),
            ...cardioWorkouts.map(w => ({ ...w._doc, modelType: "cardio" }))
        ];

        if (!allWorkouts.length) {
            return res.status(404).json({
                message: "No workouts found.",
                success: false
            });
        }

        res.status(200).json({
            message: "Workouts fetched successfully",
            success: true,
            workouts: allWorkouts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (!id || !type) {
            return res.status(400).json({
                success: false,
                message: "Workout ID and type are required",
            });
        }

        let deletedWorkout;

        if (type === "cardio") {
            deletedWorkout = await cardioModel.findByIdAndDelete(id);
        } else if (type === "workout") {
            deletedWorkout = await workoutDb.findByIdAndDelete(id);
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid workout type",
            });
        }

        if (!deletedWorkout) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Workout deleted successfully",
        });
    } catch (error) {
        console.error("Delete workout error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}
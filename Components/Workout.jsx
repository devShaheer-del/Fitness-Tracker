import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Workout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
        notes: "",
    });

    const exerciseOptions = [
        "Push Up",
        "Squat",
        "Bench Press",
        "Deadlift",
        "Pull Up",
        "Lunge",
        "Plank",
        "Bicep Curl",
        "Tricep Dip",
        "Shoulder Press",
        "Bent Over Row",
        "Leg Press",
        "Crunches",
        "Mountain Climbers",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear weight if "Push Up" is selected
        if (name === "name" && value === "Push Up") {
            setForm({ ...form, [name]: value, weight: "" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.sets ||
            !form.reps ||
            (form.name !== "Push Up" && !form.weight)
        ) {
            toast.error("Please fill in all required fields.")
            return;
        }

        const payload = {
            Exercise: form.name,
            Sets: Number(form.sets),
            Reps: Number(form.reps),
            Weight: form.name === "Push Up" ? 0 : Number(form.weight),
            Note: form.notes || "",
        };

        try {
            // Get auth object from localStorage
            const authData = JSON.parse(localStorage.getItem("auth"));

            // Check for token
            if (!authData || !authData.token) {
                toast.error("You must be logged in to create a workout.");
                return;
            }

            const response = await axios.post(
                "http://localhost:8080/api/v1/workout/CreateWorkout",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`, // Use token here
                    },
                }
            );

            // Append new workout to the list (assuming response.data.workout)
            setWorkouts([...workouts, response.data.workout]);

            // Reset form
            setForm({ name: "", sets: "", reps: "", weight: "", notes: "" });

            toast.success("Workout Created Successfully");
        } catch (error) {
            console.error("Error creating workout:", error);
            if (error.response) {
                alert(
                    error.response.data.message ||
                    JSON.stringify(error.response.data) ||
                    "Failed to create workout. Please try again."
                );
            } else {
                alert("Failed to create workout. Please try again.");
            }
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 text-primary">Strenght Exercise</h1>

            {/* Workout Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <select
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Exercise</option>
                                    {exerciseOptions.map((exercise, i) => (
                                        <option key={i} value={exercise}>
                                            {exercise}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 mb-3">
                                <input
                                    type="number"
                                    name="sets"
                                    className="form-control"
                                    placeholder="Sets"
                                    value={form.sets}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="col-md-2 mb-3">
                                <input
                                    type="number"
                                    name="reps"
                                    className="form-control"
                                    placeholder="Reps"
                                    value={form.reps}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            {form.name !== "Push Up" && (
                                <div className="col-md-2 mb-3">
                                    <input
                                        type="number"
                                        name="weight"
                                        className="form-control"
                                        placeholder="Weight (kg)"
                                        value={form.weight}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="notes"
                                className="form-control"
                                rows="2"
                                placeholder="Additional Notes"
                                value={form.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Add Workout
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Workout List */}
            <div>
                {workouts.length === 0 ? (
                    <p className="text-muted text-center">No workouts added yet.</p>
                ) : (
                    workouts.map((workout, index) => (
                        <div key={index} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{workout.Exercise}</h5>
                                <p className="card-text mb-1">
                                    <strong>Sets:</strong> {workout.Sets} &nbsp;|&nbsp;
                                    <strong>Reps:</strong> {workout.Reps}
                                    {workout.Exercise !== "Push Up" && (
                                        <>
                                            &nbsp;|&nbsp;
                                            <strong>Weight:</strong> {workout.Weight} kg
                                        </>
                                    )}
                                </p>
                                {workout.Note && (
                                    <p className="card-text">
                                        <small className="text-muted">Notes: {workout.Note}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Workout;

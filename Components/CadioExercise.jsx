import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CardioExercise = () => {
    const [cardios, setCardios] = useState([]);
    const [form, setForm] = useState({
        exercise: "",
        duration: "",
        distance: "",
        note: "",
    });

    const cardioOptions = [
        "Running",
        "Cycling",
        "Swimming",
        "Jump Rope",
        "Rowing",
        "Elliptical",
        "Stair Climbing",
        "Walking",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.exercise || !form.duration || !form.distance) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const payload = {
            CardioName: form.exercise,
            Duration: Number(form.duration),
            Distance: Number(form.distance), // ✅ Fixed spelling
            Note: form.note,
        };

        try {
            const authData = JSON.parse(localStorage.getItem("auth"));

            if (!authData || !authData.token) {
                toast.error("You must be logged in to create a cardio exercise.");
                return;
            }

            const response = await axios.post(
                "https://f-backend-eight.vercel.app/api/v1/workout/Create-Cardio",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            setCardios([...cardios, response.data.cardio]);
            setForm({ exercise: "", duration: "", distance: "", note: "" });

            toast.success("Cardio Exercise Created Successfully");
        } catch (error) {
            console.error("Error creating cardio:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to create cardio workout. Please try again."
            );
        }
    };


    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 text-primary">Cardio Exercise</h1>

            {/* Cardio Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-3">
                                <select
                                    name="exercise"
                                    className="form-control"
                                    value={form.exercise}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Cardio Exercise</option>
                                    {cardioOptions.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <input
                                    type="number"
                                    name="duration"
                                    className="form-control"
                                    placeholder="Duration (minutes)"
                                    value={form.duration}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <input
                                    type="number"
                                    name="distance"
                                    className="form-control"
                                    placeholder="Distance (km)"
                                    value={form.distance}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="note"
                                className="form-control"
                                rows="2"
                                placeholder="Additional Notes"
                                value={form.note}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Add Cardio
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Cardio List */}
            <div>
                {cardios.length === 0 ? (
                    <p className="text-muted text-center">No cardio exercises added yet.</p>
                ) : (
                    cardios.map((cardio, index) => (
                        <div key={index} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{cardio.CardioName}</h5>
                                <p className="card-text mb-1">
                                    <strong>Duration:</strong> {cardio.Duration} mins &nbsp;|&nbsp;
                                    <strong>Distance:</strong> {cardio.Distence} km
                                </p>
                                {cardio.Note && (
                                    <p className="card-text">
                                        <small className="text-muted">Notes: {cardio.Note}</small>
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

export default CardioExercise;

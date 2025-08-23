import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";



const GlobalWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [search, setSearch] = useState("");

    const fetchWorkouts = async () => {
        try {
            const authData = localStorage.getItem("auth");
            const auth = authData ? JSON.parse(authData) : null;

            if (!auth?.token) {
                toast.error("Please login to view workouts.");
                return;
            }

            const response = await axios.get("http://localhost:8080/api/v1/workout/GetWorkouts", {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            console.log("API response:", response.data); // Log API response for debugging

            const fetched = response?.data?.workouts;
            if (response.data.success && Array.isArray(fetched)) {
                setWorkouts(fetched);
            } else {
                setWorkouts([]);
                toast.error(response.data.message || "No workouts found.");
            }
        } catch (err) {
            console.error("Error fetching workouts:", err.response?.data || err.message);
            setWorkouts([]);
            toast.error("Failed to fetch workouts.");
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const filteredWorkouts = workouts.filter((workout) => {
        const name =
            workout.modelType === "cardio"
                ? workout.CardioName
                : workout.Exercise;
        return name?.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Global Workouts</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search workouts by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="row">
                {filteredWorkouts.length === 0 ? (
                    <p className="text-center text-muted">No workouts found.</p>
                ) : (
                    filteredWorkouts.map((workout) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={workout._id}>
                            <div className="card shadow-sm h-100 border-success">
                                <div className="card-body">
                                    <h5 className="card-title text-success">
                                        {workout.modelType === "cardio" ? workout.CardioName : workout.Exercise}
                                    </h5>

                                    <ul className="list-group list-group-flush mb-3">
                                        {workout.modelType === "cardio" ? (
                                            <>
                                                <li className="list-group-item">
                                                    <strong>Duration:</strong> {workout.Duration} mins
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Distance:</strong> {workout.Distance} km
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li className="list-group-item">
                                                    <strong>Sets:</strong> {workout.Sets}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Reps:</strong> {workout.Reps}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Weight:</strong> {workout.Weight} kg
                                                </li>
                                            </>
                                        )}
                                        {workout.Note && (
                                            <li className="list-group-item">
                                                <strong>Note:</strong> {workout.Note}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GlobalWorkouts;

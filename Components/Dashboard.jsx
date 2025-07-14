import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) {
        toast.error("Please login to continue.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/v1/auth/getWorkouts", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        setWorkouts(response.data.workouts);
      } else {
        toast.error(response.data.message || "Failed to load workouts");
      }
    } catch (err) {
      console.error("Error fetching workouts:", err);
      toast.error("Something went wrong while fetching workouts.");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) {
        toast.error("Please login to continue.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/v1/workout/Delete-Workout/${id}?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Workout deleted successfully!");
        fetchWorkouts(); // refresh the list
      } else {
        toast.error(response.data.message || "Failed to delete workout");
      }
    } catch (err) {
      console.error("Error deleting workout:", err);
      toast.error("Something went wrong while deleting workout.");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) {
        toast.error("Please login to continue.");
        return;
      }

      const { modelType, _id, ...rest } = selectedWorkout;
      let payload = {};

      if (modelType === "cardio") {
        const { CardioName, Duration, Distance, Note } = rest;
        payload = { CardioName, Duration, Distance, Note, modelType };
      } else if (modelType === "workout") {
        const { Exercise, Sets, Reps, Weight, Note } = rest;
        payload = { Exercise, Sets, Reps, Weight, Note, modelType };
      } else {
        toast.error("Invalid workout type");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/v1/workout/updateWorkout/${_id}?type=${modelType}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Workout updated successfully!");
        setShowModal(false);
        fetchWorkouts();
      } else {
        toast.error(response.data.message || "Failed to update workout");
      }
    } catch (err) {
      console.error("Error updating workout:", err);
      toast.error("Something went wrong while updating workout.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Workouts</h2>

      <div className="row">
        {workouts.length === 0 ? (
          <p className="text-center text-muted">No workouts found.</p>
        ) : (
          workouts.map((workout) => (
            <div className="col-md-6 col-lg-4 mb-4" key={workout._id}>
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">
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

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(workout)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(workout._id, workout.modelType)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && selectedWorkout && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Workout</h5>
                <button
                  type="button"
                  className="close btn btn-light"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {selectedWorkout.modelType === "cardio" ? (
                  <>
                    <div className="form-group mb-3">
                      <label>Cardio Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="CardioName"
                        value={selectedWorkout.CardioName || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Duration (mins)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Duration"
                        value={selectedWorkout.Duration || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Distance (km)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Distance"
                        value={selectedWorkout.Distance || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group mb-3">
                      <label>Exercise</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Exercise"
                        value={selectedWorkout.Exercise || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Sets</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Sets"
                        value={selectedWorkout.Sets || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Reps</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Reps"
                        value={selectedWorkout.Reps || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Weight (kg)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="Weight"
                        value={selectedWorkout.Weight || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="form-group mb-3">
                  <label>Note</label>
                  <textarea
                    className="form-control"
                    name="Note"
                    value={selectedWorkout.Note || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

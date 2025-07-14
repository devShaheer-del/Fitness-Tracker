import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MealsDisplay = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const fetchMeals = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) {
        toast.error("Please login to view meals.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/v1/auth/getMeals", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        setMeals(response.data.meals);
      } else {
        toast.error(response.data.message || "Failed to fetch meals");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      toast.error("Something went wrong while fetching meals.");
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleEdit = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this meal?");
    if (!confirm) return;

    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth?.token) {
        toast.error("Please login to continue.");
        return;
      }

      const response = await axios.delete(`http://localhost:8080/api/v1/auth/deleteMeal/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        toast.success("Meal deleted successfully!");
        fetchMeals(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to delete meal");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("Something went wrong while deleting the meal.");
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMeal((prev) => ({
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

      const response = await axios.put(
        `http://localhost:8080/api/v1/auth/updateMeal/${selectedMeal._id}`,
        selectedMeal,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Meal updated successfully!");
        setShowModal(false);
        fetchMeals();
      } else {
        toast.error(response.data.message || "Failed to update meal");
      }
    } catch (err) {
      console.error("Error updating meal:", err);
      toast.error("Something went wrong while updating the meal.");
    }
  };

  const filteredMeals = meals.filter((meal) =>
    `${meal.meal_type} ${meal.food_item}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Meals</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by meal type or food item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredMeals.length === 0 ? (
          <p className="text-center text-muted">No meals found.</p>
        ) : (
          filteredMeals.map((meal) => (
            <div className="col-md-6 col-lg-4 mb-4" key={meal._id}>
              <div className="card shadow-sm h-100 border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">{meal.meal_type}</h5>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item"><strong>Item:</strong> {meal.food_item}</li>
                    <li className="list-group-item"><strong>Calories:</strong> {meal.calories} kcal</li>
                    <li className="list-group-item"><strong>Protein:</strong> {meal.protein} g</li>
                    <li className="list-group-item"><strong>Carbs:</strong> {meal.carbs} g</li>
                    <li className="list-group-item"><strong>Fat:</strong> {meal.fat} g</li>
                    {meal.note && (
                      <li className="list-group-item"><strong>Note:</strong> {meal.note}</li>
                    )}
                  </ul>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleEdit(meal)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(meal._id)}
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

      {/* Edit Modal */}
      {showModal && selectedMeal && (
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
                <h5 className="modal-title">Edit Meal</h5>
                <button
                  type="button"
                  className="close btn btn-light"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {[
                  { label: "Meal Type", name: "meal_type" },
                  { label: "Food Item", name: "food_item" },
                  { label: "Calories", name: "calories", type: "number" },
                  { label: "Protein", name: "protein", type: "number" },
                  { label: "Carbs", name: "carbs", type: "number" },
                  { label: "Fat", name: "fat", type: "number" },
                ].map(({ label, name, type = "text" }) => (
                  <div className="form-group mb-3" key={name}>
                    <label>{label}</label>
                    <input
                      type={type}
                      className="form-control"
                      name={name}
                      value={selectedMeal[name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="form-group mb-3">
                  <label>Note</label>
                  <textarea
                    className="form-control"
                    name="note"
                    value={selectedMeal.note || ""}
                    onChange={handleChange}
                  />
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
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

export default MealsDisplay;

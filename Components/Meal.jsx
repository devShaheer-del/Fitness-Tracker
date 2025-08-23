import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Meal = () => {
    const [formData, setFormData] = useState({
        mealType: 'breakfast',
        foodItem: '',
        quantity: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authData = JSON.parse(localStorage.getItem('auth'));

        if (!authData || !authData.token) {
            toast.error("You must be logged in to create a meal.");
            return;
        }

        try {
            const url = "https://f-backend-eight.vercel.app/api/v1/meal/create-meal";

            const response = await axios.post(
                url,
                {
                    meal_type: formData.mealType,
                    food_item: formData.foodItem,
                    quantity: formData.quantity,
                    calories: formData.calories,
                    protein: formData.protein,
                    carbs: formData.carbs,
                    fat: formData.fat,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            toast.success("Meal logged successfully!");
            console.log("Meal created:", response.data);

            // Reset form
            setFormData({
                mealType: 'breakfast',
                foodItem: '',
                quantity: '',
                calories: '',
                protein: '',
                carbs: '',
                fat: '',
            });
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error(error?.response?.data?.message || "Failed to log meal.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4>Log Daily Meal</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Meal Type</label>
                            <select
                                className="form-select"
                                name="mealType"
                                value={formData.mealType}
                                onChange={handleChange}
                            >
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snacks">Snacks</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Food Item</label>
                            <input
                                type="text"
                                className="form-control"
                                name="foodItem"
                                value={formData.foodItem}
                                onChange={handleChange}
                                placeholder="e.g., Chicken Breast"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <input
                                type="text"
                                className="form-control"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="e.g., 200g"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Calories</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Protein (g)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Carbs (g)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="carbs"
                                    value={formData.carbs}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Fat (g)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="fat"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success">
                            Add Meal Entry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Meal;

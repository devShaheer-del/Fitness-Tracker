import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Correct import
// this is critical to add the autoTable method to jsPDF


const NutritionAnalytics = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    const fetchMeals = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (!auth?.token) {
                toast.error('Please login to view your nutrition data.');
                setLoading(false);
                return;
            }

            const response = await axios.get('https://f-backend-eight.vercel.app/api/v1/auth/getMeals', {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (response.data.success) {
                const mealsData = response.data.meals;
                setMeals(mealsData);

                const totalsCalc = mealsData.reduce(
                    (acc, meal) => ({
                        calories: acc.calories + Number(meal.calories || 0),
                        protein: acc.protein + Number(meal.protein || 0),
                        carbs: acc.carbs + Number(meal.carbs || 0),
                        fat: acc.fat + Number(meal.fat || 0),
                    }),
                    { calories: 0, protein: 0, carbs: 0, fat: 0 }
                );

                setTotals(totalsCalc);
            } else {
                toast.error(response.data.message || 'Failed to fetch meals');
            }
        } catch (error) {
            console.error('Error fetching meals:', error);
            toast.error('Something went wrong while fetching meals.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

   

    const exportPDF = () => {
        const doc = new jsPDF();
      
        autoTable(doc, {
          head: [['Meal Type', 'Food Item', 'Quantity', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)']],
          body: meals.map(meal => [
            meal.meal_type,
            meal.food_item,
            meal.quantity,
            meal.calories,
            meal.protein,
            meal.carbs,
            meal.fat
          ]),
        });
      
        // Add totals summary
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 10,
          head: [['Total Calories', 'Total Protein (g)', 'Total Carbs (g)', 'Total Fat (g)']],
          body: [[
            totals.calories,
            totals.protein,
            totals.carbs,
            totals.fat
          ]],
        });
      
        doc.save('nutrition_analytics.pdf');
      };
      
      
      


    const exportCSV = () => {
        const headers = ['Meal Type', 'Food Item', 'Quantity', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)'];
        const rows = meals.map((meal) => [
            meal.meal_type,
            meal.food_item,
            meal.quantity,
            meal.calories,
            meal.protein,
            meal.carbs,
            meal.fat,
        ]);
        const totalRow = ['Total', '', '', totals.calories, totals.protein, totals.carbs, totals.fat];
        const csvContent = [headers, ...rows, totalRow]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'nutrition_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <p className="text-center my-4">Loading nutrition data...</p>;

    if (!meals.length)
        return <p className="text-center my-4 text-muted">No meals found. Please add meals to see nutrition insights.</p>;

    return (
        <>
            <style>
                {`
        .nutrition-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px 25px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgb(0 0 0 / 0.08);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        h2 {
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
          color: #222;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        thead {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #555;
          border-bottom: 2px solid #ddd;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        tbody tr:hover {
          background-color: #fafafa;
          cursor: default;
        }

        .totals {
          margin-top: 30px;
          padding: 20px 25px;
          border-top: 1px solid #ddd;
          font-size: 1.05rem;
          color: #444;
        }

        .totals h4 {
          font-weight: 600;
          margin-bottom: 16px;
          color: #111;
        }

        .totals p {
          margin: 8px 0;
          font-weight: 500;
        }

        .export-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 15px;
        }
        `}
            </style>

            <div className="nutrition-container">
                <h2>Your Nutrition Insights</h2>

                <div className="export-buttons">
                    <button onClick={exportPDF} className="btn btn-outline-primary btn-sm">Export PDF</button>
                    <button onClick={exportCSV} className="btn btn-outline-secondary btn-sm">Export CSV</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Meal Type</th>
                            <th>Food Item</th>
                            <th>Quantity</th>
                            <th>Calories</th>
                            <th>Protein (g)</th>
                            <th>Carbs (g)</th>
                            <th>Fat (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal._id}>
                                <td>{meal.meal_type}</td>
                                <td>{meal.food_item}</td>
                                <td>{meal.quantity}</td>
                                <td>{meal.calories}</td>
                                <td>{meal.protein}</td>
                                <td>{meal.carbs}</td>
                                <td>{meal.fat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="totals">
                    <h4>Total Intake</h4>
                    <p><strong>Calories:</strong> {totals.calories}</p>
                    <p><strong>Protein:</strong> {totals.protein} g</p>
                    <p><strong>Carbs:</strong> {totals.carbs} g</p>
                    <p><strong>Fat:</strong> {totals.fat} g</p>
                </div>
            </div>
        </>
    );
};

export default NutritionAnalytics;

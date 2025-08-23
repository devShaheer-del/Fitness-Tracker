import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CalculateWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth?.token) {
          toast.error("Please login to continue.");
          setWorkouts([]);
          setLoading(false);
          return;
        }

        const res = await axios.get("https://f-backend-eight.vercel.app/api/v1/auth/getWorkouts", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (res.data.success && Array.isArray(res.data.workouts)) {
          setWorkouts(res.data.workouts);
        } else {
          toast.error("Failed to fetch workouts");
          setWorkouts([]);
        }
      } catch (err) {
        console.error("Fetch workouts error:", err);
        toast.error("Error fetching workouts");
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const { workoutSummary, cardioVsStrength } = useMemo(() => {
    const summaryMap = {};
    const cardioStrengthCount = { cardio: 0, strength: 0 };

    workouts.forEach((w) => {
      if (!w) return;

      if (w.modelType === "cardio") {
        cardioStrengthCount.cardio++;
        const name = w.Exercise ? w.Exercise.trim() : "Cardio";

        if (!summaryMap[name]) summaryMap[name] = { name, total: 0, type: 'cardio' };
        summaryMap[name].total += 1;
      } else {
        cardioStrengthCount.strength++;
        const name = w.Exercise ? w.Exercise.trim() : "Unknown Exercise";
        const sets = Number(w.Sets) || 0;
        const reps = Number(w.Reps) || 0;
        const weight = Number(w.Weight) || 0;
        const totalWeight = sets * reps * weight;

        if (!summaryMap[name]) summaryMap[name] = { name, total: 0, type: 'strength' };
        summaryMap[name].total += totalWeight;
      }
    });

    const summaryArray = Object.values(summaryMap);
    return { workoutSummary: summaryArray, cardioVsStrength: cardioStrengthCount };
  }, [workouts]);

  const pieData = [
    { name: "Cardio", value: cardioVsStrength.cardio },
    { name: "Strength", value: cardioVsStrength.strength },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Workout Report", 14, 20);

    // Cardio vs Strength Summary
    autoTable(doc, {
      startY: 30,
      head: [["Workout Type", "Count"]],
      body: [
        ["Cardio Sessions", cardioVsStrength.cardio],
        ["Strength Exercises", cardioVsStrength.strength],
      ],
    });

    // Workout Summary Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Exercise Name", "Type", "Metric"]],
      body: workoutSummary.map((w) => [
        w.name,
        w.type,
        w.type === "cardio" ? `${w.total} sessions` : `${w.total} kg`,
      ]),
    });

    doc.save("workout_report.pdf");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading workouts...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Workout Analytics & Progress</h2>

      <div className="text-end mb-3">
        <button onClick={exportPDF} className="btn btn-outline-primary btn-sm">
          Export PDF Report
        </button>
      </div>

      {/* PIE CHART */}
      <div className="my-5 text-center">
        <h4>Workout Type Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="my-5">
        <h4 className="text-center">Total Weight Lifted per Exercise & Cardio Sessions</h4>
        {workoutSummary.length === 0 ? (
          <p className="text-center">No workout data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Count / Weight", angle: -90, position: "insideLeft" }} />
              <Tooltip
                formatter={(value, name, props) => {
                  if (props.payload.type === "cardio") {
                    return [`${value} sessions`, "Cardio Sessions"];
                  } else {
                    return [`${value} kg`, "Total Weight"];
                  }
                }}
              />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Workout Metric" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CalculateWorkouts;

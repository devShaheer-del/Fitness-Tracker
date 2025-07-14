// src/Components/ProgressChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ProgressChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#007bff" name="Weight (kg)" />
        <Line type="monotone" dataKey="chest" stroke="#28a745" name="Chest (cm)" />
        <Line type="monotone" dataKey="waist" stroke="#ffc107" name="Waist (cm)" />
        <Line type="monotone" dataKey="runTime" stroke="#dc3545" name="Run Time (min)" />
        <Line type="monotone" dataKey="liftWeight" stroke="#6f42c1" name="Lift (kg)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;

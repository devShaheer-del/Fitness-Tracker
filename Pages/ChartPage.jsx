// src/Pages/ChartPage.jsx
import React, { useEffect, useState } from 'react';
import ProgressChart from '../Components/ProgressChart';

const ChartPage = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('progressData')) || [];
    setProgressData(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Fitness Progress</h2>
      {progressData.length > 0 ? (
        <ProgressChart data={progressData} />
      ) : (
        <p className="text-center text-muted">No progress data available yet.</p>
      )}
    </div>
  );
};

export default ChartPage;

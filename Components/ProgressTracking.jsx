import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProgressTracking = () => {
  const [formData, setFormData] = useState({
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    runTime: '',
    liftWeight: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
    };

    const storedProgress = JSON.parse(localStorage.getItem('progressData')) || [];
    storedProgress.push(newEntry);
    localStorage.setItem('progressData', JSON.stringify(storedProgress));

    toast.success('Fitness progress saved!');
    setTimeout(() => {
      navigate('/dashboard/chart');
    }, 2000); // removed square brackets here

    setFormData({
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      runTime: '',
      liftWeight: '',
    });
  };

  const handleShowProgress = () => {
    navigate('/dashboard/chart');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow rounded-4">
        <div className="card-header bg-primary text-white text-center rounded-top-4">
          <h4 className="mb-0">Fitness Progress Tracker</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {['weight', 'chest', 'waist', 'hips', 'runTime', 'liftWeight'].map((field, index) => (
                <div className="col-md-6" key={index}>
                  <label htmlFor={field} className="form-label">
                    {{
                      weight: 'Weight (kg)',
                      chest: 'Chest (cm)',
                      waist: 'Waist (cm)',
                      hips: 'Hips (cm)',
                      runTime: '5km Run Time (min)',
                      liftWeight: 'Max Lift (kg)',
                    }[field]}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={field}
                    placeholder={`e.g. ${{
                      weight: '70',
                      chest: '95',
                      waist: '80',
                      hips: '90',
                      runTime: '25',
                      liftWeight: '100',
                    }[field]}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary rounded-pill">
                Save Progress
              </button>
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill"
                onClick={handleShowProgress}
              >
                Show My Progress
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;

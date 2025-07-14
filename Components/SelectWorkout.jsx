import React from 'react';
import { useNavigate } from 'react-router-dom';
import gym from '../src/assets/images/gym.png';
import cardio from '../src/assets/images/cardio.png';

const SelectWorkout = () => {
    const navigate = useNavigate();

    const cardStyle = {
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        borderRadius: '15px',
        overflow: 'hidden', // ensures internal elements don't overflow
    };

    const imageContainerStyle = {
        height: '200px',
        overflow: 'hidden',
        borderRadius: '10px',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const handleHover = (e, scale) => {
        e.currentTarget.style.transform = `scale(${scale})`;
        e.currentTarget.style.boxShadow = scale > 1 ? '0 12px 20px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)';
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 text-primary fw-bold">Select Your Workout Type</h2>
            <div className="row justify-content-center g-4">
                {/* Strength Workout */}
                <div className="col-md-5">
                    <div
                        className="card bg-light text-center shadow-sm h-100 p-3"
                        onClick={() => navigate('/workout')}
                        onMouseEnter={(e) => handleHover(e, 1.03)}
                        onMouseLeave={(e) => handleHover(e, 1)}
                        style={cardStyle}
                    >
                        <div style={imageContainerStyle}>
                            <img
                                src={gym}
                                alt="Strength Workout"
                                style={imageStyle}
                            />
                        </div>
                        <h4 className="mt-3">💪 Strength Workout</h4>
                        <p className="text-muted mt-2">
                            Build strength and muscle with workouts like squats, presses, and curls.
                        </p>
                    </div>
                </div>

                {/* Cardio Workout */}
                <div className="col-md-5">
                    <div
                        className="card bg-light text-center shadow-sm h-100 p-3"
                        onClick={() => navigate('/cardio-workout')}
                        onMouseEnter={(e) => handleHover(e, 1.03)}
                        onMouseLeave={(e) => handleHover(e, 1)}
                        style={cardStyle}
                    >
                        <div style={imageContainerStyle}>
                            <img
                                src={cardio}
                                alt="Cardio Workout"
                                style={imageStyle}
                            />
                        </div>
                        <h4 className="mt-3">🏃 Cardio Workout</h4>
                        <p className="text-muted mt-2">
                            Boost endurance and burn calories with running, cycling, and more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectWorkout;

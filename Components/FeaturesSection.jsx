import React from 'react';
import { BsHeartFill, BsGraphUpArrow, BsBullseye } from 'react-icons/bs';

const FeaturesSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <h2 className="fw-bold text-primary mb-4">Why Choose Our Tracker?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <BsHeartFill size={40} className="text-danger mb-3" />
            <h5 className="fw-semibold">Health Monitoring</h5>
            <p className="text-muted">Track heart rate, calories, and active minutes in real-time.</p>
          </div>
          <div className="col-md-4">
            <BsGraphUpArrow size={40} className="text-success mb-3" />
            <h5 className="fw-semibold">Daily Activity Goals</h5>
            <p className="text-muted">Set daily goals and let the app keep you on track.</p>
          </div>
          <div className="col-md-4">
            <BsBullseye size={40} className="text-primary mb-3" />
            <h5 className="fw-semibold">Progress Insights</h5>
            <p className="text-muted">Visualize your fitness trends and performance improvements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

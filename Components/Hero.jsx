import React from "react";
import hero from '../src/assets/images/one.png'; // Fixed import
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-5">

      <div className="container py-5">
        <div className="row align-items-center">

          {/* Left Side: Text Content */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-bold text-primary">
              Track Your Fitness,<br /> Transform Your Life
            </h1>
            <p className="lead text-secondary mt-3">
              Stay on top of your goals with real-time tracking and smart insights to push your limits.
            </p>
            <Link to="/select-workout" className="btn btn-primary btn-lg mt-4 px-4 py-2">
              Get Started
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="col-md-6 text-center">
            <img
              src={hero}
              alt="Fitness Vector"
              className="img-fluid rounded-4 shadow"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

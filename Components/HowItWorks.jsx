import React from 'react'
import { BsFillClockFill, BsGraphUp, BsCheckCircleFill } from 'react-icons/bs';
const HowItWorks = () => {
    return (
        <section className="py-5 bg-light">
            <div className="container text-center">
                <h2 className="fw-bold text-primary mb-5">How It Works</h2>
                <div className="row g-5">
                    <div className="col-md-4">
                        <div className="mb-3 text-primary">
                            <BsFillClockFill size={50} />
                        </div>
                        <h5 className="fw-semibold mb-3">1. Track Your Activity</h5>
                        <p className="text-muted">
                            Use our app to monitor your steps, workouts, and calories burned in real-time.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <div className="mb-3 text-success">
                            <BsGraphUp size={50} />
                        </div>
                        <h5 className="fw-semibold mb-3">2. Analyze Your Progress</h5>
                        <p className="text-muted">
                            Get insightful charts and daily reports to see your fitness improvements over time.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <div className="mb-3 text-primary">
                            <BsCheckCircleFill size={50} />
                        </div>
                        <h5 className="fw-semibold mb-3">3. Achieve Your Goals</h5>
                        <p className="text-muted">
                            Set personalized goals and let the app motivate you to reach your best self.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
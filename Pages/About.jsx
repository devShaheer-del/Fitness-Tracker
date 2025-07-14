import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import firstbanner from '../src/assets/images/firstbanner.png';
import secondbanner from '../src/assets/images/secondbanner.png';
import education from '../src/assets/images/education.png';
import emprover from '../src/assets/images/emprover.png';
import transform from '../src/assets/images/transform.png';
import background from '../src/assets/video/background.mp4';
import person from '../src/assets/images/person.jpg';
import uzair from '../src/assets/images/uzair.jpg';

const About = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => setOffsetY(window.pageYOffset);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="hero-section position-relative text-white text-center py-5 overflow-hidden"
        style={{ height: '70vh', minHeight: '400px' }}
      >
        <video
          className="position-absolute top-0 start-0 w-100 h-100"
          src={background}
          autoPlay
          muted
          loop
          playsInline
          style={{
            zIndex: 0,
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            transform: `translateY(${offsetY * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            transform: `translateY(${offsetY * 0.15}px)`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        />

        <div
          className="container position-relative d-flex flex-column justify-content-center align-items-center h-100"
          data-aos="fade-down"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-4 fw-bold">Welcome to FitTrack</h1>
          <p className="lead px-3 px-md-0" style={{ maxWidth: '700px' }}>
            Empowering you to take control of your fitness journey — one step, one rep, one goal at a time.
          </p>
        </div>
      </section>

      {/* Why Choose FitTrack */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold text-primary mb-5" data-aos="fade-up">Why Choose FitTrack?</h2>

          <div className="row align-items-center mb-5" data-aos="fade-right">
            <div className="col-md-6">
              <img
                src={firstbanner}
                alt="Tracking workout progress with FitTrack"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
                height={300}
                width={300}
                style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Track Your Progress with Precision</h4>
              <p className="text-muted">
                Monitor your workouts, diet, and body changes with real-time analytics and personalized insights.
              </p>
            </div>
          </div>

          <div className="row align-items-center flex-md-row-reverse" data-aos="fade-left">
            <div className="col-md-6">
              <img
                src={secondbanner}
                alt="Stay motivated with goal tracking"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
                height={300}
                width={300}
                style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">Stay Motivated with Smart Goals</h4>
              <p className="text-muted">
                Set realistic goals and celebrate milestones with our intuitive goal-setting features and encouragement tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold text-primary mb-5" data-aos="zoom-in">Our Mission</h2>
          <div className="row text-center">
            {[
              {
                img: education,
                title: 'Educate',
                desc: 'We believe in educating users on the importance of balanced fitness and mental well-being.',
                aos: 'flip-left'
              },
              {
                img: emprover,
                title: 'Empower',
                desc: 'We empower individuals with the tools and support they need to stay on track and push limits.',
                aos: 'flip-up'
              },
              {
                img: transform,
                title: 'Transform',
                desc: 'Our goal is to help people transform their lives through consistency, community, and commitment.',
                aos: 'flip-right'
              }
            ].map(({ img, title, desc, aos }, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos={aos}>
                <img
                  src={img}
                  alt={`${title} users on fitness and mental well-being`}
                  className="img-fluid rounded-circle shadow-lg mb-3"
                  width="140"
                  height="140"
                  loading="lazy"
                  style={{ boxShadow: '0 6px 15px rgba(0,0,0,0.12)' }}
                />
                <h5 className="fw-bold">{title}</h5>
                <p className="text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-5" data-aos="fade-up">Meet the Team Behind FitTrack</h2>
          <div className="row justify-content-center">
            {[
              {
                name: 'John Doe',
                role: 'Founder & Head Coach',
                alt: 'John Doe - Founder and Head Coach',
                aosDelay: 100,
                imgSrc: person,
              },
              {
                name: 'Jane Smith',
                role: 'Nutrition Specialist',
                alt: 'Jane Smith - Nutrition Specialist',
                aosDelay: 200,
                imgSrc: uzair,
              }
            ].map(({ name, role, alt, aosDelay, imgSrc }, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={aosDelay}>
                <div style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '20px' }}>
                  <img
                    src={imgSrc}
                    alt={alt}
                    className="rounded-circle shadow"
                    width="150"
                    height="150"
                    loading="lazy"
                    style={{ boxShadow: '0 8px 18px rgba(0,0,0,0.15)' }}
                  />
                  <h5 className="fw-bold mt-3">{name}</h5>
                  <p className="text-muted">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="text-white text-center py-5"
        style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}
      >
        <div className="container" data-aos="zoom-in">
          <h2 className="fw-bold">Ready to Transform Your Life?</h2>
          <p className="mb-4">Join FitTrack and take the first step toward a healthier, more confident you.</p>
          <a href="/signup" className="btn btn-light btn-lg">Start Your Journey</a>
        </div>
      </section>
    </div>
  );
};

export default About;

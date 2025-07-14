import React from 'react';
import Hero from '../Components/Hero';
import TestimonialSection from '../Components/TestimonialSection';
import FeaturesSection from '../Components/FeaturesSection';
import HowItWorks from '../Components/HowItWorks';
 // Make sure this exists

const Home = () => {
  return (
    <div className="home-wrapper">
      <Hero />
      <FeaturesSection />
      <TestimonialSection />
      <HowItWorks />
    </div>
  );
};

export default Home;

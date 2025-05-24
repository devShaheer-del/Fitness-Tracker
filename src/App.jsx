import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../Components/Layout/Layout';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import PageNotfound from '../Pages/PageNotfound';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotfound />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;

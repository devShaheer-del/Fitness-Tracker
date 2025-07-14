// src/App.jsx
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
import WorkoutPage from '../Pages/WorkoutPage';
import Protect from '../Components/Protect';
import Dashboard from '../Components/Dashboard';
import SelectWorkout from '../Components/SelectWorkout';
import CadioPage from '../Pages/CadioPage';
import SidebarLayout from '../Components/Layout/SidebarLayout';
import MealPage from '../Pages/MealPage';
import ProgressPage from '../Pages/ProgressPage';
import ChartPage from '../Pages/ChartPage'; // ✅ Added ChartPage
import DisplayMealsPage from '../Pages/DisplayMealsPage';
import WorkoutsOverview from '../Pages/WorkoutsOverview';
import NutritionAnalytics from '../Pages/NutritionAnalytics';
import GlobalWorkoutsPage from '../Pages/GlobalWorkoutsPage';
import ReminderPage from '../Pages/ReminderPage';
import ForgetPasswordPage from '../Pages/ForgetPasswordPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<Protect Component={About} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Protect Component={Profile} />} />
          <Route path="*" element={<PageNotfound />} />
          <Route path="/select-workout" element={<Protect Component={SelectWorkout} />} />
          <Route path="/cardio-workout" element={<Protect Component={CadioPage} />} />
          <Route path="/workout" element={<Protect Component={WorkoutPage} />} />
          <Route path='/forgetPassword' element={<ForgetPasswordPage />} />

          {/* Dashboard with nested routes */}
          <Route path="/dashboard" element={<Protect Component={SidebarLayout} />}>
            <Route index element={<Dashboard />} />
            <Route path="meal" element={<Protect Component={MealPage} />} />
            <Route path="progress" element={<Protect Component={ProgressPage} />} />
            <Route path="chart" element={<Protect Component={ChartPage} />} />
            <Route path='ShowMeals' element={<Protect Component={DisplayMealsPage} />} />
            <Route path='CalculateWorkouts' element={<Protect Component={WorkoutsOverview} />} />
            <Route path='NutritionAnalytics' element={<Protect Component={NutritionAnalytics} />} />
            <Route path='GlobalWorkouts' element={<Protect Component={GlobalWorkoutsPage} />} />
            <Route path='Setreminder' element={<Protect Component={ReminderPage} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

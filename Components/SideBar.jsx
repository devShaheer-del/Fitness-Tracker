import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChartBig,
  Dumbbell,
  Utensils,
  LogOut,
  ChartPie,
  Vegan,
  Target,
  Wheat,
  Globe,
  Bell
} from 'lucide-react';


const SideBar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: '250px', height: '100vh', position: 'fixed', overflowY: 'auto' }}
    >
      <Link
        to="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <BarChartBig className="me-2" />
        <span className="fs-4">Fitness Tracker</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
            <Dumbbell className="me-2" />
            Workouts
          </Link>
        </li>
        <li>
          <Link to="/dashboard/meal" className="nav-link text-white d-flex align-items-center">
            <Utensils className="me-2" />
            Meal
          </Link>
        </li>
        <li>
          <Link to="/dashboard/progress" className="nav-link text-white d-flex align-items-center">
            <ChartPie className="me-2" />
            Progress Tracking
          </Link>
        </li>
        <li>
          <Link to="/dashboard/ShowMeals" className="nav-link text-white d-flex align-items-center">
            <Vegan className="me-2" />
            Nutrition Logs
          </Link>
        </li>
        <li>
          <Link to="/dashboard/CalculateWorkouts" className="nav-link text-white d-flex align-items-center">
            <Target className="me-2" />
            Workouts Overview
          </Link>
        </li>
        <li>
          <Link to="/dashboard/NutritionAnalytics" className="nav-link text-white d-flex align-items-center">
            <Wheat className="me-2" />
            Nutrition Analytics
          </Link>
        </li>
        <li>
          <Link to="/dashboard/GlobalWorkouts" className="nav-link text-white d-flex align-items-center">
            <Globe className="me-2" />
            Global Workouts
          </Link>
        </li>
        <li>
          <Link to="/dashboard/Setreminder" className="nav-link text-white d-flex align-items-center">
            <Bell className="me-2" />
            Set Reminder
          </Link>
        </li>
        
      </ul>
      <hr />
      <div className="text-white">Welcome, User!</div>
    </div>
  );
};

export default SideBar;

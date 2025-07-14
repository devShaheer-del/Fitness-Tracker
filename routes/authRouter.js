const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');
const { UserAuthentication } = require('../middlewares/Authentication');



Router.post('/Register', authController.Register);
Router.post('/Login', authController.Login);
Router.put('/UpdateProfile/:id', authController.UpdateProfile);
Router.get('/getWorkouts', UserAuthentication, authController.GetWorkouts);
Router.get('/getMeals', UserAuthentication, authController.getMeals);

Router.put("/updateMeal/:mealId", UserAuthentication, authController.updateMeal);
Router.delete("/deleteMeal/:mealId", UserAuthentication, authController.deleteMeal);
Router.post('/forgot-password',authController.forgotPassword);
module.exports = Router;
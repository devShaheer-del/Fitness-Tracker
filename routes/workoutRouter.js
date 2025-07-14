const express = require('express');
const Router = express.Router();
const workoutController = require('../controllers/workoutController');
const { UserAuthentication } = require('../middlewares/Authentication');

Router.post('/CreateWorkout', UserAuthentication, workoutController.createExercise);
Router.post('/Create-Cardio', UserAuthentication, workoutController.CreateCardio);
Router.put('/updateWorkout/:id', UserAuthentication,workoutController.updateWorkout);
Router.get('/GetWorkouts',UserAuthentication,workoutController.getWorkouts);
Router.delete('/Delete-Workout/:id',UserAuthentication,workoutController.deleteWorkout);
module.exports = Router;

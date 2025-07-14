const express = require('express');
const Router = express.Router();
const mealController = require('../controllers/mealController');
const { UserAuthentication } = require('../middlewares/Authentication');


Router.post('/create-meal',UserAuthentication,mealController.CreateMeal);

module.exports = Router;
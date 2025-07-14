const express = require('express');
const Router = express.Router();
const ReminderController = require('../controllers/ReminderController')
const { UserAuthentication } = require('../middlewares/Authentication');


Router.post('/SetReminder',UserAuthentication,ReminderController.createReminder)
Router.get('/getreminder',UserAuthentication,ReminderController.Getreminders);



module.exports = Router;
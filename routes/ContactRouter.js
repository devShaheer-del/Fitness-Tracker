const express = require('express');
const Router = express.Router();
const ContactController = require('../controllers/ContactController');


Router.post('/Contact', ContactController.CreateContact);

module.exports = Router;
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
require('./models/Database');
const cors = require('cors');

const fileupload = require('express-fileupload');
const authRouter = require('./routes/authRouter');
const workoutRouter = require('./routes/workoutRouter');
const mealRouter = require('./routes/mealRouter');
const reminderRouter = require('./routes/ReminderRouter');
const contactRouter = require('./routes/ContactRouter');
// Setup middleware
app.use(express.json()); // for JSON data
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cors());

// file upload setup
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './tmp', // make sure ./tmp folder exists
}));

// Register routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workout', workoutRouter);
app.use('/api/v1/meal', mealRouter);
app.use('/api/v1/reminder', reminderRouter);
app.use('/api/v1/ContactUs', contactRouter);

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

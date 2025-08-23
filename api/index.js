const express = require('express');
const app = express();
require('dotenv').config();
require('../models/Database');
const cors = require('cors');
const fileupload = require('express-fileupload');

// Routers
const authRouter = require('../routes/authRouter');
const workoutRouter = require('../routes/workoutRouter');
const mealRouter = require('../routes/mealRouter');
const reminderRouter = require('../routes/ReminderRouter');
const contactRouter = require('../routes/ContactRouter');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// File upload setup
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: './tmp', // make sure ./tmp folder exists
  })
);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workout', workoutRouter);
app.use('/api/v1/meal', mealRouter);
app.use('/api/v1/reminder', reminderRouter);
app.use('/api/v1/ContactUs', contactRouter);

// Default test route
app.get('/', (req, res) => {
  res.send('✅ Express server deployed successfully on Vercel!');
});

// ❌ Local mode: only when running locally
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () =>
    console.log(`🚀 Local server running on http://localhost:${port}`)
  );
}

// ✅ Vercel export
module.exports = app;

const Reminder = require('../models/reminder');
const AuthModel = require('../models/auth');
const reminder = require('../models/reminder');
const cron = require('node-cron');
exports.createReminder = async (req, res) => {
  try {
    const { type, date, time } = req.body;

    if (!type || !date || !time) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // 1. Create reminder
    const newReminder = await Reminder.create({ type, date, time });

    // 2. Add reminder to user's reminders array using req.userId
    await AuthModel.findByIdAndUpdate(
      req.userId,
      { $push: { reminders: newReminder._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Reminder set successfully",
      success: true,
      reminder: newReminder,
    });

  } catch (error) {
    console.error('Error creating reminder:', error);
    return res.status(500).json({
      message: 'Failed to create reminder',
      error: error.message,
    });
  }
};


exports.Getreminders = async (req, res) => {
  try {
    const users = await AuthModel.find({}, 'reminders'); // Only fetch reminder IDs

    // Collect all reminder IDs
    const allReminderIds = users.flatMap(user => user.reminders);

    if (!allReminderIds.length) {
      return res.status(404).json({
        message: "No reminders found",
        success: false,
      });
    }

    // Fetch all reminder documents by IDs
    const reminders = await reminder.find({
      _id: { $in: allReminderIds }
    });

    return res.status(200).json({
      message: "Reminders retrieved successfully",
      success: true,
      reminders: reminders
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve reminders',
      error: error.message,
    });
  }
};



cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5); // HH:mm

    const matchingReminders = await reminder.find({
      date: currentDate,
      time: currentTime,
    });

    if (matchingReminders.length > 0) {
      for (let rem of matchingReminders) {
        const user = await AuthModel.findOne({ reminders: rem._id });
        if (user) {
          global.io.emit('reminder', {
            userId: user._id.toString(),
            type: rem.type,
            date: rem.date,
            time: rem.time,
          });
        }
      }
    }
  } catch (err) {
    console.error('Cron error:', err);
  }
});
const contactDB = require('../models/Contact'); // Ensure correct model import

exports.CreateContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ❌ Bug: Incorrect check — you're passing a string instead of a filter object
    const isContactExist = await contactDB.findOne({ email });

    if (isContactExist) {
      return res.status(400).json({
        message: "You have already sent a contact request. We'll get back to you soon!",
        success: false,
      });
    }

    const newContact = await contactDB.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      message: "Contact created successfully",
      success: true,
      contact: newContact,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

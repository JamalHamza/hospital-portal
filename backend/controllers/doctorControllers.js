const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
const doctorSendEmail = require('../utils/doctorSendEmail');

// * ------------------------------------
const getAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.query;

  if (!doctorId) {
    res.status(400);
    throw new Error('Doctor ID is required!');
  }

  const appointments = await Appointment.find({
    doctorId,
  }).sort('-createdAt');

  if (!appointments) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json(appointments);
});

module.exports = {
  getAppointments,
};

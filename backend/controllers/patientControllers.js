const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const bcryptjs = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointments');
const { default: mongoose } = require('mongoose');

// * -------------------------------------
const bookAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;
  const doctor = await Doctor.findOne({ _id: doctorId });
  const { startDate, endDate, startTime, endTime, name } = doctor;
  // ! change date formate that client sent
  const appointmentDateFormatted = new Date(appointmentDate);

  //! validation
  if (!appointmentDate || !appointmentTime) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }

  if (
    appointmentDateFormatted >= startDate &&
    appointmentDateFormatted <= endDate &&
    appointmentTime >= startTime &&
    appointmentTime <= endTime
  ) {
    // ! If appointment date and time is available then save to db.
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
    });
    // ! Check if booked successfully
    if (appointment) {
      res.status(201).json(appointment);
    } else {
      res.status(400);
      throw new Error('Invalid appointment data');
    }
  } else {
    res.status(400);
    throw new Error(`Dr. ${name} is not available on that date`);
  }
});

module.exports = {
  bookAppointment,
};

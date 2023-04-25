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
  // const formattedDate = appointmentDate?.toISOString();

  //! validation
  if (!appointmentDate || !appointmentTime) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }

  const startDate1 = new Date(startDate);
  const endDate1 = new Date(endDate);
  const appointmentDate1 = new Date(appointmentDate);

  if (appointmentDate1 >= startDate1 && appointmentDate1 <= endDate1) {
    res.status(201).json('booked');
  } else {
    res.status(400);
    throw new Error(`Dr. ${name} is not available on that date`);
  }

  // if (appointmentDate < startDate || appointmentDate > endDate) {

  // }

  console.log(startDate1);
  console.log(endDate1);
  console.log(appointmentDate1);

  // const appointment = await Appointment.create({
  //   patientId,
  //   doctorId,
  //   appointmentDate,
  //   appointmentTime,
  // });

  // ! if user created successfully & SEND to frontend
  // if (true) {
  //   // const { appointmentDate, appointmentTime } = appointment;
  //   // res.status(201).json({ appointmentDate, appointmentTime, patientId });
  // res.status(201).json('booked');
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid appointment data');
  // }
});

module.exports = {
  bookAppointment,
};

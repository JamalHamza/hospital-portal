const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const { default: mongoose } = require('mongoose');
const moment = require('moment');

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

// * ------------------------------------
const checkAvailability = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate } = req.body;

  const doctor = await Doctor.findById(doctorId);
  const { startTime, endTime } = doctor;
  console.log(startTime);
  console.log(endTime);

  // ! Get the list of existing appointment
  const existingAppointments = await Appointment.find({
    doctorId,
    appointmentDate,
  });

  // !  Calculate the booked time slots
  // Calculate the booked time slots
  const bookedTimeSlots = existingAppointments.map((appointment) =>
    moment.utc(appointment.appointmentTime, 'HH:mm')
  );

  // Calculate the available time slots
  const availableTimeSlots = [];
  let currentTimeSlot = moment.utc(startTime);
  while (currentTimeSlot.isBefore(endTime)) {
    if (!bookedTimeSlots.find((slot) => slot.isSame(currentTimeSlot))) {
      availableTimeSlots.push(currentTimeSlot.format('HH:mm'));
    }
    currentTimeSlot.add(1, 'hour');
  }

  res.status(200).json(availableTimeSlots);
});

module.exports = {
  bookAppointment,
  checkAvailability,
};

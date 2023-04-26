const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const { default: mongoose } = require('mongoose');
const moment = require('moment');

// ! ----------------------------------------------------------------------------------------------------------
// ! Booking Appointment Logic to book an appointment:
// ! We have implemented a check to ensure that the selected date and time fall within the doctor's working hours.
// ! Specifically, the date and time must be later than the start of the doctor's workday and start work time
// ! and earlier than the end of the doctor's workday and end work time, as set by the admin.
// !----------------------------------------------------------------------------------------------------------

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

  const formattedAppointmentTime = moment(appointmentTime).format('HH:mm');
  const formattedStartTime = moment(startTime).format('HH:mm');
  // ! we subtract 1 hour from the end time
  const formattedEndTime = moment(endTime).subtract(1, 'hour').format('HH:mm');
  console.log(formattedEndTime);

  if (
    appointmentDateFormatted >= startDate &&
    appointmentDateFormatted <= endDate &&
    formattedAppointmentTime >= formattedStartTime &&
    formattedAppointmentTime <= formattedEndTime
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

// ! ------------------------------------------------------------------------------------------------
// ! To select a booking time on a specific date, the patient must first choose an available workday 
// ! for the doctor from the DatePicker.  The DatePicker has been configured using minDate and maxDate 
// ! to restrict the patient to selecting only valid workdays.
// ! After the patient selects a workday, the server will send three arrays to the frontend.
// ! These arrays will include booked times, available times, and all times available for booking.
// ! This information will help the patient select a suitable time for their appointment.
// ! -------------------------------------------------------------------------------------------------

// * ------------------------------------
const checkAvailability = asyncHandler(async (req, res) => {
  const { doctorId, appointmentDate } = req.body;

  const doctor = await Doctor.findById(doctorId);
  const { startTime, endTime } = doctor;
  const formattedStartTime = moment(startTime).format('HH:mm');
  // ! we subtract 1 hour from the end time
  const formattedEndTime = moment(endTime).subtract(1, 'hour').format('HH:mm');

  // ! Get the list of existing appointment
  const existingAppointments = await Appointment.find({
    doctorId,
    appointmentDate,
  });

  // ! Calculate the booked time slots
  const bookedTimeSlots = existingAppointments.map((appointment) =>
    moment(appointment.appointmentTime).format('HH:mm')
  );
  // console.log(bookedTimeSlots);

  // ! Calculate the all time slots
  const availableTimeSlots = [];
  let currentTimeSlot = moment(startTime);

  while (currentTimeSlot.isBefore(endTime)) {
    if (!bookedTimeSlots.find((slot) => slot.match(currentTimeSlot))) {
      availableTimeSlots.push(currentTimeSlot.format('HH:mm'));
    }
    currentTimeSlot.add(1, 'hour');
  }

  // ! calculate available time
  const availableTime = availableTimeSlots.filter(
    (time) => time != bookedTimeSlots
  );
  // console.log(availableTimeSlots);

  res.status(200).json({ availableTime, bookedTimeSlots, availableTimeSlots });
});

module.exports = {
  bookAppointment,
  checkAvailability,
};

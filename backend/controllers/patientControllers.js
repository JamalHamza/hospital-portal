const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const bcryptjs = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/tokenModel');

// * --------------------------------------
const allDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().sort('-createAt').select('-password');
  if (!doctors) {
    res.status(500);
    throw new Error('Something went wrong, please try again');
  }
  res.status(200).json(doctors);
});

// * -------------------------------------
const getDoctor = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  const {
    name,
    email,
    specialist,
    fee,
    experiences,
    startDate,
    endDate,
    startTime,
    endTime,
    phone,
    photo,
    createdAt,
    userId,
    _id,
  } = doctor;
  const user = await User.findById(userId);

  if (doctor && user) {
    const { isVerified } = user;
    res.status(200).json({
      name,
      email,
      phone,
      specialist,
      fee,
      experiences,
      startDate,
      endDate,
      startTime,
      endTime,
      isVerified,
      photo,
      createdAt,
      _id,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



// * -------------------------------------
const updateDoctorShift = asyncHandler(async (req, res) => {
  // ! req.user is coming from AuthMiddleWare
  const id = req.params.id;
  const { startDate, endDate, startTime, endTime } = req.body;
  const doctor = await Doctor.findById(id);
  console.log(id);
  console.log(doctor);

  //! validation
  if (!startDate || !endDate || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }

  if (doctor) {
    doctor.startDate = startDate;
    doctor.endDate = endDate;
    doctor.startTime = startTime;
    doctor.endTime = endTime;
    await doctor.save();
    res.status(200).json({ message: `Doctor's work day renewed` });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

module.exports = {
  allDoctors,

};

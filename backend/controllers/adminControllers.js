const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const bcryptjs = require('bcryptjs');
const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Token = require('../models/tokenModel');

// *--------------------------------------
const addDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    experiences,
    fee,
    startDate,
    endDate,
    startTime,
    endTime,
    specialist,
  } = req.body;

  //! validation
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !experiences ||
    !fee ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !specialist
  ) {
    res.status(400);
    throw new Error('Please fill in all the required fields ');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters. ');
  }

  // ! Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already existed');
  }

  // ! Get UserAgent
  const ua = parser(req.headers['user-agent']);
  const userAgent = [ua.ua];

  // * -----------------------------
  // ! Create new User
  const user = await User.create({
    name,
    email,
    password,
    userAgent,
    phone,
    role: 'doctor',
  });
  // * -----------------------------

  const experienceArray = experiences;

  // ! Create new Doctor
  const doctor = await Doctor.create({
    userId: user._id,
    name,
    email,
    password,
    phone,
    experiences: experienceArray,
    fee,
    startDate,
    endDate,
    startTime,
    endTime,
    specialist,
  });

  // * -----------------------------
  // ! Generate Token
  const token = genereteteToken(user._id);
  // ! Send  HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // one day
    sameSite: 'none',
    secure: true,
  });
  // ! if user created successfuly & SEND to frontend
  if (user && doctor) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;
    res
      .status(201)
      .json({ _id, name, email, phone, bio, photo, role, isVerified, token });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  addDoctor,
};

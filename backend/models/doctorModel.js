const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a passwrod'],
  },
  photo: {
    type: String,
    default: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
  phone: {
    type: String,
    default: '+7',
  },
  bio: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: true,
    default: 'doctor',
    // subscriber, author, and admin (suspended)
  },
  isVerified: {
    type: Boolean,
    default: ture,
  },
  startDate: {
    type: Date,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  experience: {
    type: Array,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorModel;

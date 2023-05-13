const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
const multer = require('multer');
const File = require('../models/results');
const path = require('path');

// * ------------------------------------
const getAppointments = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400);
    throw new Error('userId is required!');
  }

  const doctor = await Doctor.findOne({
    userId,
  }).select('-password');

  // ! Find doctor by userId
  const appointments = await Appointment.find({ doctorId: doctor._id }).sort(
    '-createdAt'
  );

  if (!appointments) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json({ appointments, doctor });
});

// * ------------------------------------
// * -----Files Upload/Download----------
// * ------------------------------------

const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await File.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400);
    throw new Error('Something went wrong!');
  }
});
// * ------------------------------------
const addItem = asyncHandler(async (req, res) => {
  const { doctorId, patientId, name } = req.body;
  console.log(req.file);
  const file = req.file.path;
  if (!doctorId && !patientId && !name && !file) {
    res.status(404);
    throw new Error('Please fill all fields');
  }
  const item = await File.create({ name, file, doctorId, patientId });
  if (item) {
    res.status(201).json({ item });
  } else {
    res.status(400);
    throw new Error('File is not uploaded');
  }
});
// * ------------------------------------
const downloadFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await File.findById(id);
  if (!item) {
    res.status(404);
    throw new Error('File not found');
  }
  const file = item.file;
  const filePath = path.join(__dirname, `../${file}`);
  res.download(filePath);
});
// * ------------------------------------
const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await File.findByIdAndDelete(id);
  if (!item) {
    res.status(404);
    throw new Error('File not found');
  }

  if (item) {
    res.status(200).json({
      message: 'File deleted successfully',
    });
  } else {
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = {
  getAppointments,
  getItems,
  addItem,
  downloadFile,
  deleteFile
};

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const { genereteteToken, hashToken } = require('../utils/index');
const parser = require('ua-parser-js');
const Appointment = require('../models/appointments');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');
const multer = require('multer');
const Pdf = require('../models/results');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  // ! Find patient by patientId
  const patient = await User.find({ _id: appointments[0].patientId });

  if (!appointments) {
    res.status(200);
    res.json('History is empty');
  }
  res.status(200).json({ appointments, doctor });
});

// * ------------------------------------
// * ------------------------------------

// ! Set up multer storage

// router.post('/upload', upload.single('pdf'), async (req, res) => {
//   const { doctorId, patientId } = req.body;
//   const { originalname, mimetype, buffer } = req.file;

//   const pdf = new Pdf({
//     doctorId,
//     patientId,
//     filename: originalname,
//     contentType: mimetype,
//     data: buffer,
//   });

//   await pdf.save();

//   res.status(201).json({ message: 'PDF uploaded successfully' });
// });

const uploadPdfResult = asyncHandler(async (req, res) => {
  // const { doctorId, patientId } = req.body;
  const { originalname, mimetype, buffer } = req.file;

  // if (!doctorId && !patientId) {
  //   res.status(400);
  //   throw new Error('doctorId or patientId is not defined');
  // }

  const pdf = new Pdf({
    // doctorId,
    // patientId,
    filename: originalname,
    contentType: mimetype,
    // data: buffer,
  });

  await pdf.save();

  res.status(201).json({ message: 'PDF uploaded successfully' });
});

const downLoadResult = asyncHandler(async (req, res) => {
  const id = req.params.id;

  console.log(id);
  const pdf = await Pdf.findById(id);

  if (!pdf) {
    res.status(404);
    throw new Error('File not found');
  }

  res.setHeader('Content-Type', pdf.contentType);
  res.setHeader('Content-Disposition', `attachment; filename=${pdf.filename}`);
  res.send(pdf.data);
});

module.exports = {
  getAppointments,
  uploadPdfResult,
  downLoadResult,
};

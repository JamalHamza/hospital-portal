const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const { bookAppointment } = require('../controllers/patientControllers');
const router = express.Router();

router.post('/allDoctors/:id', protect, patientOnly, bookAppointment);

module.exports = router;

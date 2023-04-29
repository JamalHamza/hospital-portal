const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const {
  bookAppointment,
  checkAvailability,
  getAppointments,
  getAppointment,
} = require('../controllers/patientControllers');
const router = express.Router();

router.post('/allDoctors/:id', protect, patientOnly, bookAppointment);
router.get(
  '/allDoctors/check-booking-availability',
  protect,
  patientOnly,
  checkAvailability
);

router.get('/allDoctors/history', protect, patientOnly, getAppointments);

router.get(
  '/allDoctors/history/appointment',
  protect,
  patientOnly,
  getAppointment
);

module.exports = router;

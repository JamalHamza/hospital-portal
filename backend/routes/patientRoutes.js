const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const {
  bookAppointment,
  checkAvailability,
  getAppointments,
} = require('../controllers/patientControllers');
const router = express.Router();

router.post('/allDoctors/:id', protect, patientOnly, bookAppointment);
router.get(
  '/allDoctors/check-booking-availability',
  protect,
  patientOnly,
  checkAvailability
);

router.get('/allDoctors/history', protect,  getAppointments);

module.exports = router;

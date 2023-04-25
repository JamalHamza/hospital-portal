const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const {
  bookAppointment,
  checkAvailability,
} = require('../controllers/patientControllers');
const router = express.Router();

router.post('/allDoctors/:id', protect, patientOnly, bookAppointment);
router.get(
  '/allDoctors/check-booking-availibility',
  protect,
  patientOnly,
  checkAvailability
);

module.exports = router;

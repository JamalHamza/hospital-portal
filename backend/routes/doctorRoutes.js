const express = require('express');
const { protect, doctorOnly } = require('../middleware/AuthMiddleware');
const { getAppointments } = require('../controllers/doctorControllers');
const router = express.Router();

router.get('/appointments', protect, doctorOnly, getAppointments);

module.exports = router;

const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const router = express.Router();
const { allDoctors } = require('../controllers/patientControllers');

router.get('/allDoctors', protect, patientOnly, allDoctors);

module.exports = router;

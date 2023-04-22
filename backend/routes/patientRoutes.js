const express = require('express');
const { protect, patientOnly } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/allDoctors', protect, patientOnly);

module.exports = router;

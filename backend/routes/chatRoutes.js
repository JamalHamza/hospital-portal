const express = require('express');
const { protect, doctorOrPatient } = require('../middleware/AuthMiddleware');
const { accessChat } = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(protect, doctorOrPatient, accessChat);

module.exports = router;

const express = require('express');
const { protect, doctorOrPatient } = require('../middleware/AuthMiddleware');
const { accessChat, fetchChats } = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(protect, doctorOrPatient, accessChat);
router.route('/').get(protect, doctorOrPatient, fetchChats);

module.exports = router;

const express = require('express');
const {
  protect,
  doctorOrPatient,
  verifiedOnly,
} = require('../middleware/AuthMiddleware');
const {
  accessChat,
  fetchChats,
  sendMessage,
  allMessages,
  allDoctors,
} = require('../controllers/chatControllers');

const router = express.Router();

router
  .route('/doctors')
  .get(protect, verifiedOnly, doctorOrPatient, allDoctors);
router.route('/').post(protect, verifiedOnly, doctorOrPatient, accessChat);
router.route('/').get(protect, verifiedOnly, doctorOrPatient, fetchChats);
router.route('/send').post(protect, verifiedOnly, doctorOrPatient, sendMessage);
router
  .route('/:chatId')
  .get(protect, verifiedOnly, doctorOrPatient, allMessages);

module.exports = router;

const express = require('express');
const { protect, doctorOnly } = require('../middleware/AuthMiddleware');
const {
  getAppointments,
  uploadPdfResult,
  downLoadResult,
} = require('../controllers/doctorControllers');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/appointments', protect, doctorOnly, getAppointments);
router.post(
  '/upload',
  upload.single('pdf'),
  protect,
  doctorOnly,
  uploadPdfResult
);

router.get('/file/:id', protect, doctorOnly, downLoadResult);

module.exports = router;

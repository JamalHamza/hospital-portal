const express = require('express');
const { protect, doctorOnly } = require('../middleware/AuthMiddleware');
const {
  getAppointments,
  getItems,
  addItem,
  downloadFile,
  deleteFile,
  getAppointment,
  getItem,
} = require('../controllers/doctorControllers');
const router = express.Router();
const upload = require('../middleware/multer');

router.get('/appointments', protect, doctorOnly, getAppointments);
router.get('/appointments/:id', protect, doctorOnly, getAppointment);
// ! ----File Endpoints----------
router.get('/files', protect, doctorOnly, getItems);
router.get('/files/file', protect, doctorOnly, getItem);
router.post('/files', upload.single('file'), protect, doctorOnly, addItem);
router.get('/download/:id', protect, doctorOnly, downloadFile);
router.delete('/download/:id', protect, doctorOnly, deleteFile);
// router.route('/files').get(getItems).post(upload.single('file'), addItem);
// router.route('/download/:id').get(downloadFile);

module.exports = router;

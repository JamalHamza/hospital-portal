const express = require('express');
const { protect, doctorOnly } = require('../middleware/AuthMiddleware');
const {
  getAppointments,
  getItems,
  addItem,
  downloadFile,
} = require('../controllers/doctorControllers');
const router = express.Router();
const upload = require('../middleware/multer');





router.get('/appointments', protect, doctorOnly, getAppointments);
// ! ----File Endpoints----------
router.route('/files').get(getItems).post(upload.single('file'), addItem);
router.route('/download/:id').get(downloadFile);

module.exports = router;

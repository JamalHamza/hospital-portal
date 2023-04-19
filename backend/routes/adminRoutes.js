const express = require('express');
const router = express.Router();
const {
  addDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
} = require('../controllers/adminControllers');
const { protect, adminOnly } = require('../middleware/AuthMiddleware');

router.post('/addDoctor', protect, adminOnly, addDoctor);
router.get('/getDoctors', protect, adminOnly, getDoctors);
// TODO LATER
// ! may be I dont need protect here but I am not sure
router.get('/getDoctors/:id', protect, adminOnly, getDoctor);
router.delete('/getDoctors/:id', protect, adminOnly, deleteDoctor);

module.exports = router;

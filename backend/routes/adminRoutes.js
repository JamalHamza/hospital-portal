const express = require('express');
const router = express.Router();
const { addDoctor, getDoctors } = require('../controllers/adminControllers');
const {
  protect,
  adminOnly,
  authorOnly,
} = require('../middleware/AuthMiddleware');

router.post('/addDoctor', protect, adminOnly, addDoctor);
router.get('/getDoctors', protect, adminOnly, getDoctors);

module.exports = router;

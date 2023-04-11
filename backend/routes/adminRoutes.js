const express = require('express');
const router = express.Router();
const { addDoctor } = require('../controllers/adminControllers');
const {
  protect,
  adminOnly,
  authorOnly,
} = require('../middleware/AuthMiddleware');

router.post('/addDoctor', protect, adminOnly, addDoctor);

module.exports = router;

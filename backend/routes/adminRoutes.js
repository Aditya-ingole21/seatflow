const express = require('express');
const router  = express.Router();

const { getAllBookings, getDashboardStats, getAllUsers } = require('../controllers/adminControllers');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes require JWT + admin role
router.use(protect, adminOnly);

router.get('/stats',    getDashboardStats);
router.get('/bookings', getAllBookings);
router.get('/users',    getAllUsers);

module.exports = router;

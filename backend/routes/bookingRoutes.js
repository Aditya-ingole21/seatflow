const express = require('express');
const router  = express.Router();

const { bookEvent, getMyBookings, cancelBooking } = require('../controllers/bookingControllers');
const { protect } = require('../middleware/authMiddleware');

// All booking routes require authentication
router.post('/',              protect, bookEvent);
router.get('/my',             protect, getMyBookings);
router.patch('/:id/cancel',   protect, cancelBooking);

module.exports = router;

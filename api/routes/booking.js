const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Booking_controller = require('../controllers/bookings')


router.post('/', checkAuth, Booking_controller.post_booking );

router.get('/', checkAuth, Booking_controller.post_booking );

router.get('/:bookDate', checkAuth, Booking_controller.post_booking );

router.delete('/:bookingId', checkAuth, Booking_controller.deleteBooking );

router.patch('/:bookingId', checkAuth, Booking_controller.deleteBooking );

module.exports = router;
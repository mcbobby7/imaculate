const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Booking_controller = require('../controllers/bookings')


// router.get('/', checkAuth, (req, res, next) => {
//     res.status(200).json({
//         message: 'handling Get'
//     });
// });

router.post('/', checkAuth, Booking_controller.post_booking );

router.delete('/:bookingId', checkAuth, Booking_controller.deleteBooking );

module.exports = router;
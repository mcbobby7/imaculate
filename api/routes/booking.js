const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const checkAuth = require('../middleware/check-auth');
const PostBooking = require('../controllers/bookings')


router.get('/', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'handling Get'
    });
});

router.post('/', checkAuth, PostBooking.post_booking );

router.delete('/:bookingId', checkAuth, (req, res, next) => {
    const id = req.params.bookingId;
    Booking.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event deleted successfully',
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
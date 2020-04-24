const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling Get'
    });
});

router.post('/', (req, res, next) => {
    const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        event: req.body.event,
        user: req.body.user,
    });
    booking.save().then(result => {
        res.status(200).json({
            message: "Booked succesfully",
            createdProperty: {
                _id: result._id,
                event: result.event,
                user: result.user,
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/bookings/" + result._id
                }
            } 
        });
    })
    .catch(err => console.log(err));

});

router.get('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'handling single'
    });
});

router.patch('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'patch single'
    });
});

router.delete('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'delete single'
    });
});

module.exports = router;
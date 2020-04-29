const Booking = require('../models/booking');
const mongoose = require('mongoose');

exports.post_booking = (req, res, next) => {
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
                    type: "GET, DELETE",
                    url: `http://localhost:4000/bookings/${result._id}`
                }
            } 
        });
    })
    .catch(err => console.log(err));

}
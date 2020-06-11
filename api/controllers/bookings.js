const Booking = require('../models/booking');
const mongoose = require('mongoose');

exports.post_booking = (req, res, next) => {
    const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        isAccepted: false,
        time: req.body.time,
        user: req.body.user,
    });
    booking.save().then(result => {
        res.status(200).json({
            message: "Booked succesfully",
            createdProperty: {
                _id: result._id,
                date: result.date,
                time: result.time,
                isAccepted: result.isAccepted,
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

exports.get_bookings = (req, res, next) => {
    Booking.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            blogs: docs.map(doc => {
                return {
                    _id: doc._id,
                    date: doc.date,
                    time: doc.time,
                    isAccepted: doc.isAccepted,
                    user: doc.user,
                    request: {
                        type: "GET, PATCH, DELETE",
                        url: `http://localhost:4000/bookings/${doc._id}`
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.deleteBooking = (req, res, next) => {
    const id = req.params.bookingId;
    Booking.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'booking deleted successfully',
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../models/event');

router.get('/', (req, res, next) => {
    Event.find()
    .select("title, description price date creator _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    description: doc.description,
                    price: doc.price,
                    date: doc.price,
                    creator: doc.creator,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/events/" + doc._id
                    }
                }
            })
        }
    })
    res.status(200).json(response);
});

router.post('/', (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.price,
        creator: req.body.creator,
    });
    event.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(200).json({
        message: "event created successfully",
        createdProperty: {event}
    });
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
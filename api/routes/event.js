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
        createdProperty: {
            _id: result._id,
            title: result.title,
            description: result.description,
            price: result.price,
            date: result.price,
            creator: result.creator,
            request: {
                type: "GET",
                url: "http://localhost:3000/events/" + result._id
            }
        }
    });
});

router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
    .select("title, description price date creator _id")
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                event: doc,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/events/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "No valid entry found for Event"
            })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
});

router.patch('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Event.update({ _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event updated successfully',
                request: {
                    type: "GET",
                    url: "http://localhost:3000/events/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
        res.status(200).json({
        message: 'delete single'
    });
});

module.exports = router;
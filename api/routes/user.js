const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
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
                        type: "GET, PATCH, DELETE",
                        url: `http://localhost:4000/events/${doc._id}`
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
});

router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
    .select("title description price date creator _id")
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                event: doc,
                request: {
                    type: "PATCH, DELETE",
                    url: "http://localhost:4000/events/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "No valid entry found for Event"
            });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
});
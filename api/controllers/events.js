const mongoose = require('mongoose');
const Event = require('../models/event');


exports.post_event = (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.price,
        creator: req.body.creator,
    });
    event.save().then(result => {
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
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/events/" + result._id
                }
            } 
        });
    })
    .catch(err => console.log(err));

    
}

exports.get_events = (req, res, next) => {
    Event.find()
    .select("title description price date creator _id")
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
}

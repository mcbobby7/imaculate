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

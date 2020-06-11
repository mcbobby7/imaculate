const mongoose = require('mongoose');
const Blog = require('../models/blog');


exports.post_blog = (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.body,
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        date: req.body.date,
        tag: req.body.tag,
    });
    blog.save().then(result => {
        res.status(200).json({
            message: "blog created successfully",
            createdProperty: {
                _id: result._id,
                body: result.body,
                title: result.title,
                imgUrl: result.imgUrl,
                date: result.data,
                tag: result.tag,
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/blog/" + result._id
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

exports.single_event = (req, res, next) => {
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
        
}

exports.patch_event = (req, res, next) => {
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
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/events/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event deleted successfully',
                request: {
                    type: "POST",
                    url: "http://localhost:4000/events/",
                    body: {
                        title: 'String',
                        description: 'String',
                        price: 'String',
                        date: 'String',
                        creator: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

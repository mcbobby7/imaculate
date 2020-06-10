const mongoose = require('mongoose');
const Contact = require('../models/contactUs');


exports.post_contact = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        creator: req.body.creator,
    });
    contact.save().then(result => {
        res.status(200).json({
            message: "sent successfully",
            createdProperty: {
                _id: result._id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                subject: result.subject,
                message: result.message,
                creator: result.creator,
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/contacts/" + result._id
                }
            } 
        });
    })
    .catch(err => console.log(err));

    
}

exports.get_contacts = (req, res, next) => {
    Contact.find()
    .select("name email phone subject message creator _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    phone: doc.phone,
                    subject: doc.subject,
                    message: doc.message,
                    creator: doc.creator,
                    request: {
                        type: "GET, PATCH, DELETE",
                        url: `http://localhost:4000/contacts/${doc._id}`
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

exports.single_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
    .select("name email phone subject message creator _id")
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                contact: doc,
                request: {
                    type: "PATCH, DELETE",
                    url: "http://localhost:4000/events/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "No valid entry found"
            });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
}


exports.delete_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'deleted successfully',
                request: {
                    type: "POST",
                    url: "http://localhost:4000/events/",
                    body: {
                        name: 'String',
                        email: 'String',
                        phone: 'String',
                        subject: 'String',
                        message: 'String',
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

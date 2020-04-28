const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'user already exist'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "User created successfuly"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});

router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
                return {
                    // _id: doc._id,
                    // title: doc.title,
                    // description: doc.description,
                    // price: doc.price,
                    // date: doc.price,
                    // creator: doc.creator,
                    request: {
                        type: "GET, PATCH, DELETE",
                        url: `http://localhost:4000/user/${doc._id}`
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

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                event: doc,
                request: {
                    type: "PATCH, DELETE, GET",
                    url: "http://localhost:4000/users/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "Sorry, User does not exist"
            });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted successfully"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
        
});

module.exports = router;
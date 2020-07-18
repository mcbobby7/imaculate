const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user');

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Authentication Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                    'secreteKey', 
                    {
                        expiresIn: "5h"
                    },
                );
                return res.status(200).json({
                    message: 'Authentication successful',
                    token,
                    firstName: user[0].firstName,
                    userId: user[0]._id
                });
            }
            res.status(401).json({
                message: 'Authentication Failed'
            });
        })
    })
    .catch()
}

exports.signup = (req, res, next) => {
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
                        const token = jwt.sign({
                            email: result.email,
                            userId: result._id
                        }, 
                            'secreteKey', 
                            {
                                expiresIn: "5h"
                            },
                        );
                        res.status(201).json({
                            message: "User created successfuly",
                            firstName: result.firstName,
                            userId: result._id,
                            token
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
}

exports.get_users = (req, res, next) => {
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
}

exports.get_single_user = (req, res, next) => {
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
        
}

exports.delete_user = (req, res, next) => {
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
    
        
}
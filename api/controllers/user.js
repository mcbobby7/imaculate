const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

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
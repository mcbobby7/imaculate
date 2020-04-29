const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const Login_controller = require('../controllers/user')

router.post('/signup', Login_controller.signup);

router.post('/login', Login_controller.login );

router.get('/', checkAuth, Login_controller.get_users);

router.get('/:userId', checkAuth, Login_controller.get_single_user);

router.delete('/:userId', checkAuth, Login_controller.delete_user);

module.exports = router;
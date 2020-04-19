const express = require('express');
const app = express();

const bookingRoute = require('./api/routes/booking')

app.use('/bookings', bookingRoute);

module.exports = app;
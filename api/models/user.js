const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    linkedIn: {
        type: String,
        required: false
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
    
});

module.exports = mongoose.model('User', userSchema);
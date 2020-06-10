const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
    
});

module.exports = mongoose.model('contactUs', contactUsSchema);
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const bookingSchema = new Schema({
        date: {
                type: String,
                required: true
        },
        time: {
                type: String,
                required: true
        },
        isAccepted: {
                type: String,
                required: true
        }, 
        user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        }
    
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
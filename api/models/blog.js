const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const blogSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
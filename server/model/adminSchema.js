const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);




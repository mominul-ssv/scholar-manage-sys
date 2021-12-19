const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseDetails: {
        type: String
    },
});

module.exports = mongoose.model('Course', courseSchema);




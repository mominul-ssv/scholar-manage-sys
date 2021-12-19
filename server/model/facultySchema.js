const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let facultySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    university: {
        type: String,
        required: true
    },
    registrationStatus: {
        type: Boolean,
        required: true
    },
    semesterStatus: {
        type: Boolean
    },
    dob: {
        type: String
    },
    citizenship: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    course: [{
        courseCode: {
            type: String,
            required: true
        },
        courseDetails: {
            type: String,
            required: true
        },
        courseSemester: {
            type: String,
            required: true
        }
    }],
    initial: {
        type: String
    }
});

module.exports = mongoose.model('Faculty', facultySchema);
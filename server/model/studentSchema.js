const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    registrationStatus: {
        type: Boolean,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    degreeShort: {
        type: String
    },
    major: {
        type: String
    },
    credits: {
        type: Number
    },
    creditsPassed: {
        type: Number
    },
    entrySemester: {
        type: String,
        required: true
    },
    currentSemester: {
        type: String
    },
    cgpa: {
        type: Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: String
    },
    citizenship: {
        type: String
    },
    address: {
        type: String
    },
    financialAid: {
        type: String
    }
});

module.exports = mongoose.model('Student', studentSchema);
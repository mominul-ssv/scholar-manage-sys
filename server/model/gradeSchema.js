const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradeSchema = new Schema({
    semesterName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseDetails: {
        type: String,
        required: true
    },
    courseFacultyEmail: {
        type: String,
        required: true
    },
    courseFacultyFirstName: {
        type: String,
        required: true
    },
    courseFacultyLastName: {
        type: String,
        required: true
    },
    courseStudentId: {
        type: String,
        required: true
    },
    courseStudentFirstName: {
        type: String,
        required: true
    },
    courseStudentLastName: {
        type: String,
        required: true
    },
    courseStudentGrade: {
        type: String
    }
});

module.exports = mongoose.model('Grade', gradeSchema);




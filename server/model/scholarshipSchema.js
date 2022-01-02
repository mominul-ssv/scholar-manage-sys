const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let scholarshipSchema = new Schema({
    studentId: {
        type: Number
    },
    courseCompleted: [{
        courseCode: {
            type: String
        },
        courseDetails: {
            type: String
        },
        courseCredit: {
            type: String
        },
        courseGrade: {
            type: String
        }
    }],
    cgpa: {
        type: String
    },
    creditsCompleted: {
        type: String
    }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
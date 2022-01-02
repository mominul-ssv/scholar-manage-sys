const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gradeSchema = new Schema({
    semesterName: {
        type: String
    },
    courseCode: {
        type: String
    },
    courseDetails: {
        type: String
    },
    courseCredit: {
        type: String
    },
    courseFacultyEmail: {
        type: String
    },
    courseFacultyFirstName: {
        type: String
    },
    courseFacultyLastName: {
        type: String
    },
    courseFacultyStatus: {
        type: Boolean
    },
    courseStudent: [{
        courseStudentId: {
            type: String
        },
        courseStudentFirstName: {
            type: String
        },
        courseStudentLastName: {
            type: String
        },
        courseStudentStatus: {
            type: Boolean
        },
        courseStudentGrade: {
            type: String
        },
        courseStudentGradeStatus: {
            type: Boolean
        }
    }]
});

module.exports = mongoose.model('Grade', gradeSchema);




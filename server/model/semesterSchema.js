const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let semesterSchema = new Schema({
    semesterName: {
        type: String,
        required: true
    },
    semesterDetails: [{
        courseCode: {
            type: String,
            required: true
        },
        courseDetails: {
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
        courseStudents: [{
            studentId: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            studentGrade: {
                type: String
            }
        }]
    }]
});

module.exports = mongoose.model('Semester', semesterSchema);




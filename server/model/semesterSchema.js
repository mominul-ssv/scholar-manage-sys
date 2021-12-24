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
        courseFacultyEmail: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Semester', semesterSchema);




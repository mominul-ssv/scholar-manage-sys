const Student = require('../../model/studentSchema.js');
const Grade = require("../../model/gradeSchema.js");

// STUDENT ----------------------------------------------------------------------------------------------------- (Home)
exports.student_dashboard_get = (req, res) => {
    if (req.session.studentAuth === true) {
        const sidebarNav = {home: 'active'};
        res.render('student/student-dashboard', {sidebarNav});
    }
}

exports.student_dashboard_post = (req, res) => {
    if (req.session.studentAuth === true) {
        res.redirect('/student-dashboard');
    }
}

// STUDENT -------------------------------------------------------------------------------------------------- (Profile)
exports.student_profile_get = (req, res) => {
    if (req.session.studentAuth === true) {
        Student.findOne({studentId: req.session.studentLoginId}, (err, foundStudent) => {
            if (!err) {
                const sidebarNav = {profile: 'active'};
                res.render('student/student-profile', {foundStudent, sidebarNav});
            } else console.log(err);
        });
    }
}

exports.student_profile_post = (req, res) => {
    if (req.session.studentAuth === true) {
        const {studentId, phone, email, dob, citizenship, address} = req.body;
        Student.updateOne(
            {studentId: studentId},
            {
                $set: {
                    phone: phone,
                    email: email,
                    dob: dob,
                    citizenship: citizenship,
                    address: address
                }
            }, (err) => {
                if (!err) {
                    res.redirect('/student-profile');
                } else console.log(err);
            });
    }
}

// STUDENT -------------------------------------------------------------------------------------------------- (Courses)
exports.student_courses_get = (req, res) => {
    if (req.session.studentAuth === true) {
        Grade.find({}, (err, foundGrades) => {
            if (!err) {
                const sidebarNav = {courses: 'active'};
                res.render('student/student-courses', {foundGrades, sidebarNav});
            } else console.log(err);
        });
    }
}

exports.student_courses_post = (req, res) => {
    if (req.session.studentAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            case 'STUDENT_TAKE_COURSE': {
                Student.findOne(
                    {studentId: req.session.studentLoginId},
                    (err, foundStudent) => {
                        if (!err) {
                            Grade.updateOne(
                                {_id: req.body._id},
                                {
                                    $push: {
                                        courseStudent: {
                                            courseStudentId: foundStudent.studentId,
                                            courseStudentFirstName: foundStudent.firstName,
                                            courseStudentLastName: foundStudent.lastName,
                                            courseStudentStatus: true
                                        }
                                    }
                                }, (err) => {
                                    if (!err) {
                                        res.redirect('/student-courses');
                                    } else console.log(err);
                                });
                        } else console.log(err);
                    });
            }
                break;

            case 'STUDENT_READ_COURSE': {
                res.redirect('/student-courses');
            }
                break;

            case 'STUDENT_DROP_COURSE': {
                Grade.findOneAndUpdate(
                    {_id: req.body._id},
                    {
                        $pull: {
                            courseStudent: {
                                courseStudentId: req.session.studentLoginId
                            }
                        }
                    },
                    (err, found) => {
                        if (!err) {
                            console.log(found);
                            res.redirect('/student-courses');
                        } else console.log(err);
                    });
            }
                break;

            default:
                console.log("Error occurred in { student_courses_post }");

        }
    }
}

// STUDENT --------------------------------------------------------------------------------------------------- (Grades)
exports.student_grades_get = (req, res) => {
    if (req.session.studentAuth === true) {
        const sidebarNav = {grades: 'active'};
        res.render('student/student-grades', {sidebarNav});
    }
}

exports.student_grades_post = (req, res) => {
    if (req.session.studentAuth === true) {
        res.redirect('/student-grades');
    }
}

// STUDENT ---------------------------------------------------------------------------------------------- (Scholarship)
exports.student_scholarship_get = (req, res) => {
    if (req.session.studentAuth === true) {
        const sidebarNav = {scholarship: 'active'};
        res.render('student/student-scholarship', {sidebarNav});
    }
}

exports.student_scholarship_post = (req, res) => {
    if (req.session.studentAuth === true) {
        res.redirect('/student-scholarship');
    }
}

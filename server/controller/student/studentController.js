const Student = require('../../model/studentSchema.js');
const Grade = require("../../model/gradeSchema.js");
const Scholarship = require("../../model/scholarshipSchema.js");

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
                Scholarship.findOne({studentId: req.session.studentLoginId}, (err, foundScholarship) => {
                    if (!err) {
                        const sidebarNav = {profile: 'active'};
                        res.render('student/student-profile', {foundStudent, foundScholarship, sidebarNav});
                    } else console.log(err);
                });
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
                const studentId = req.session.studentLoginId;
                res.render('student/student-courses', {foundGrades, studentId, sidebarNav});
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
                            Grade.findOne(
                                {_id: req.body._id, 'courseStudent.courseStudentId': req.session.studentLoginId},
                                (err, foundGrade) => {
                                    if (!err) {
                                        if (foundGrade === null) {
                                            Grade.updateOne(
                                                {_id: req.body._id},
                                                {
                                                    $push: {
                                                        courseStudent: {
                                                            courseStudentId: foundStudent.studentId,
                                                            courseStudentFirstName: foundStudent.firstName,
                                                            courseStudentLastName: foundStudent.lastName,
                                                            courseStudentStatus: true,
                                                            courseStudentGradeStatus: false
                                                        }
                                                    }
                                                }, (err) => {
                                                    if (!err) {
                                                        res.redirect('/student-courses');
                                                    } else console.log(err);
                                                });
                                        } else {
                                            res.redirect('/student-courses');
                                        }
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
                    (err) => {
                        if (!err) {
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
        Grade.find(
            {'courseStudent.courseStudentId': req.session.studentLoginId},
            (err, foundGrades) => {
                if (!err) {
                    const sidebarNav = {grades: 'active', studentId: req.session.studentLoginId};
                    res.render('student/student-grades', {foundGrades, sidebarNav});
                } else console.log(err);
            });
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
        Scholarship.findOne(
            {studentId: req.session.studentLoginId},
            (err, foundScholarship) => {
                if (!err) {
                    let meritScholarship = false;
                    if (foundScholarship.cgpa >= 3.5 && foundScholarship.creditsCompleted >= 12) {
                        meritScholarship = true;
                    }
                    const sidebarNav = {scholarship: 'active'};
                    res.render('student/student-scholarship', {foundScholarship, meritScholarship, sidebarNav});
                } else console.log(err);
            });
    }
}

exports.student_scholarship_post = (req, res) => {
    if (req.session.studentAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            case 'STUDENT_MERIT_APPLY': {

                Scholarship.updateOne(
                    {studentId: req.session.studentLoginId},
                    {
                        $set: {
                            meritApplicationRequest: true,
                            meritApplicationStatusCode: 200
                        }
                    }, (err) => {
                        if (!err) {
                            res.redirect('/student-scholarship');
                        } else console.log(err);
                    });
            }
                break;

            case 'STUDENT_READ_SCHOLARSHIP': {
                res.redirect('/student-scholarship');
            }
                break;

            default:
                console.log("Error occurred in { student_scholarship_post }");
        }
    }
}

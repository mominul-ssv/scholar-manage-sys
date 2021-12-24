const Student = require('../../model/studentSchema.js');
const Semester = require("../../model/semesterSchema.js");
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
        Student.findOne({studentId: req.session.studentLoginId}, (err, foundStudent) => {
            if (!err) {
                Semester.find({}, (err, foundSemesters) => {
                    if (!err) {
                        Grade.find({}, (err, foundGrades) => {
                            if (!err) {

                                const notAvailable = [];

                                foundSemesters.forEach((semester) => {
                                    semester.semesterDetails.forEach((details) => {
                                        foundGrades.forEach((grade) => {
                                            if (grade.courseCode === details.courseCode
                                                && grade.courseStudentId === foundStudent.studentId.toString()
                                                && grade.semesterName === semester.semesterName) {
                                                notAvailable.push([grade.courseCode, grade.semesterName]);
                                            }
                                        })
                                    });
                                });

                                const sidebarNav = {courses: 'active'};
                                res.render('student/student-courses', {foundSemesters, notAvailable, sidebarNav});
                            } else console.log(err);
                        });
                    } else console.log(err);
                });

            } else console.log(err);
        });
    }
}

exports.student_courses_post = (req, res) => {
    if (req.session.studentAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            // TAKE course
            case 'STUDENT_TAKE_COURSE': {

                const {
                    semesterName,
                    courseCode,
                    courseDetails,
                    courseFacultyEmail,
                    courseFacultyFirstName,
                    courseFacultyLastName
                } = req.body;

                Student.findOne({studentId: req.session.studentLoginId}, (err, foundStudent) => {
                    if (!err) {
                        Grade.findOne(
                            {
                                semesterName: semesterName,
                                courseCode: courseCode,
                                courseStudentId: foundStudent.studentId
                            }, async (err, found) => {
                                if (!err) {
                                    if (found === null) {
                                        const grade = new Grade({
                                            semesterName: semesterName,
                                            courseCode: courseCode,
                                            courseDetails: courseDetails,
                                            courseFacultyEmail: courseFacultyEmail,
                                            courseFacultyFirstName: courseFacultyFirstName,
                                            courseFacultyLastName: courseFacultyLastName,
                                            courseStudentId: foundStudent.studentId,
                                            courseStudentFirstName: foundStudent.firstName,
                                            courseStudentLastName: foundStudent.lastName
                                        });
                                        await grade.save();
                                        res.redirect('/student-courses');
                                    } else {
                                        res.redirect('/student-courses');
                                    }
                                } else console.log(err);
                            });
                    } else console.log(err);
                });
            }
                break;

            // TAKE course
            case 'STUDENT_DROP_COURSE': {
                const {semesterName, courseCode} = req.body;
                Grade.deleteOne(
                    {
                        semesterName: semesterName,
                        courseCode: courseCode,
                        courseStudentId: req.session.studentLoginId
                    }, (err) => {
                    if (!err) {
                        res.redirect('/student-courses');
                    } else console.log(err);
                });
            }
                break;

            case 'STUDENT_READ_COURSE': {
                res.redirect('/student-courses');
            }
                break;
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

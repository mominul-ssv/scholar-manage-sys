const bcrypt = require('bcrypt');
const Student = require('../../model/studentSchema.js');
const data = require("../../database/data.js");

// STUDENT ------------------------------------------------------------------------------------------------- (Register)
exports.student_register_get = (req, res) => {
    res.render('register/student/student-register');
}

exports.student_register_post = async (req, res) => {
    const {studentId, studentPassword, studentPasswordConfirm} = req.body;
    if (studentPassword !== studentPasswordConfirm) {
        const error = {code: 'ERROR', msg: 'Password mismatch!'};
        res.render('register/student/student-register', {error});
    } else {
        // READ Student
        Student.findOne({studentId: studentId}, async (err, foundStudent) => {
            if (!err) {
                if (foundStudent !== null) {
                    if (foundStudent.registrationStatus === false) {
                        // Hashing Student Password
                        const hashedPassword = await bcrypt.hash(studentPassword, 10);
                        // UPDATE Student
                        Student.updateOne(
                            {studentId: studentId},
                            {
                                $set: {
                                    password: hashedPassword,
                                    registrationStatus: true
                                }
                            }, (err) => {
                                if (!err) {
                                    res.redirect('/');
                                } else {
                                    console.log(err);
                                }
                            });
                    } else {
                        const error = {code: 'ERROR', msg: 'Student is already registered!'};
                        res.render('register/student/student-register', {error});
                    }
                } else {
                    const error = {code: 'ERROR', msg: 'Student ID is invalid!'};
                    res.render('register/student/student-register', {error});
                }
            } else {
                console.log(err);
            }
        });
    }
}

// STUDENT ------------------------------------------------------------------------------------------- (Password Reset)
exports.student_password_reset_get = (req, res) => {
    res.render('register/student/student-password-reset');
}

exports.student_password_reset_post = (req, res) => {
    const {studentId, newStudentPassword, newStudentPasswordConfirm} = req.body;

    res.redirect('student-password-reset');
}

// STUDENT ----------------------------------------------------------------------------------------------------- (Home)
exports.student_home_get = (req, res) => {
    if (req.session.studentAuth === true) {
        const sidebarNav = {home: 'active'};
        res.render('student/student-home', {sidebarNav});
    }
}
exports.student_home_post = (req, res) => {
    if (req.session.studentAuth === true) {
        res.redirect('/student-home');
    }
}

// STUDENT -------------------------------------------------------------------------------------------------- (Profile)
exports.student_profile_get = (req, res) => {
    if (req.session.studentAuth === true) {
        // READ Student (Student-Auth)
        Student.findOne({studentId: req.session.studentLoginId}, (err, foundStudent) => {
            if (!err) {
                const sidebarNav = {profile: 'active'};
                res.render('student/student-profile', {foundStudent, sidebarNav});
            } else {
                console.log(err);
            }
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
                } else {
                    console.log(err);
                }
            });
    }
}

// STUDENT -------------------------------------------------------------------------------------------------- (Courses)
exports.student_courses_get = (req, res) => {
    if (req.session.studentAuth === true) {
        const sidebarNav = {courses: 'active'};
        res.render('student/student-courses', {sidebarNav});
    }
}

exports.student_courses_post = (req, res) => {
    if (req.session.studentAuth === true) {
        res.redirect('/student-courses');
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


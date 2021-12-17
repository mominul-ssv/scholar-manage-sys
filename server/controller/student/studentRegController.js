const Student = require("../../model/studentSchema.js");
const bcrypt = require("bcrypt");

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
    res.redirect('/student-password-reset');
}

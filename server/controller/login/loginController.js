const bcrypt = require('bcrypt');
const Admin = require('../../model/adminSchema.js');
const Student = require('../../model/studentSchema.js');

exports.root_get = (req, res) => {
    const navBarAnimation = {student: 'active'};
    res.render('login', {navBarAnimation});
}

exports.root_post = async (req, res) => {

    const {adminEmail, adminPassword} = req.body;
    const {studentId, studentPassword} = req.body;
    const {facultyEmail, facultyPassword} = req.body;

    switch (req.body.auth) {

        // Login Validation ----------------------------------------------------------------------------------- (ADMIN)
        case 'admin-auth':
            Admin.findOne({email: adminEmail}, async (err, foundAdmin) => {
                if (!err) {
                    const navBarAnimation = {admin: 'active'};
                    if (foundAdmin !== null) {
                        await bcrypt.compare(adminPassword, foundAdmin.password, async (error, result) => {
                            if (result === true) {
                                req.session.adminAuth = true;
                                res.redirect('/admin-dashboard');
                            } else {
                                const error = {code: 'ERROR', msg: 'Password is incorrect!'};
                                res.render('login', {navBarAnimation, error});
                            }
                        });
                    } else {
                        const error = {code: 'ERROR', msg: 'Email is incorrect!'};
                        res.render('login', {navBarAnimation, error});
                    }
                } else {
                    console.log(err);
                }
            });
            break;

        // Login Validation --------------------------------------------------------------------------------- (Student)
        case 'student-auth':
            Student.findOne({studentId: studentId}, async (err, foundStudent) => {
                if (!err) {
                    const navBarAnimation = {student: 'active'};
                    if (foundStudent !== null) {
                        if (foundStudent.registrationStatus === true) {
                            await bcrypt.compare(studentPassword, foundStudent.password, async (error, result) => {
                                if (result === true) {
                                    req.session.studentAuth = true;
                                    req.session.studentLoginId = studentId;
                                    res.redirect('/student-home');
                                } else {
                                    const error = {code: 'ERROR', msg: 'Password is incorrect!'};
                                    res.render('login', {navBarAnimation, error});
                                }
                            });
                        } else {
                            const error = {code: 'ERROR', msg: 'Student is not registered!'};
                            res.render('login', {navBarAnimation, error});
                        }
                    } else {
                        const error = {code: 'ERROR', msg: 'Student ID is invalid!'};
                        res.render('login', {navBarAnimation, error});
                    }
                } else {
                    console.log(err);
                }
            });
            break;
        // Login Validation --------------------------------------------------------------------------------- (FACULTY)
        case 'faculty-auth':
            break;
        default:
            console.log("Error Occurred in { root_post }");
    }
}
const bcrypt = require('bcrypt');
const Admin = require('../../model/adminSchema.js');
const Student = require('../../model/studentSchema.js');
const Faculty = require('../../model/facultySchema.js');

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
                                // Initial Admin Login
                                const sidebarNav = {dashboard: 'active'};
                                res.render('admin/admin-dashboard', {sidebarNav});
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
                                    // Initial Student Login
                                    const sidebarNav = {home: 'active'};
                                    res.render('student/student-home', {sidebarNav});
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
            Faculty.findOne({email: facultyEmail}, async (err, foundFaculty) => {
                if (!err) {
                    const navBarAnimation = {faculty: 'active'};
                    if (foundFaculty !== null) {
                        if (foundFaculty.registrationStatus === true) {
                            await bcrypt.compare(facultyPassword, foundFaculty.password, async (error, result) => {
                                if (result === true) {
                                    req.session.facultyAuth = true;
                                    req.session.facultyEmail = facultyEmail;
                                    // Initial Faculty Login
                                    const sidebarNav = {home: 'active'};
                                    res.render('faculty/faculty-home', {sidebarNav});
                                } else {
                                    const error = {code: 'ERROR', msg: 'Password is incorrect!'};
                                    res.render('login', {navBarAnimation, error});
                                }
                            });
                        } else {
                            const error = {code: 'ERROR', msg: 'Faculty is not registered!'};
                            res.render('login', {navBarAnimation, error});
                        }
                    } else {
                        const error = {code: 'ERROR', msg: 'Faculty email is invalid!'};
                        res.render('login', {navBarAnimation, error});
                    }
                } else {
                    console.log(err);
                }
            });
            break;
        default:
            console.log("Error Occurred in { root_post }");
    }
}
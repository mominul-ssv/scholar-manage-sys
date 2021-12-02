const data = require('../../database/data.js');
const Student = require('../../model/studentSchema.js');
const Faculty = require('../../model/facultySchema.js');

// ADMIN -------------------------------------------------------------------------------------------------- (Dashboard)
exports.admin_dashboard_get = (req, res) => {
    if (req.session.adminAuth === true) {
        const sidebarNav = {dashboard: 'active'};
        res.render('admin/admin-dashboard', {sidebarNav});
    }
}

exports.admin_dashboard_post = (req, res) => {
    if (req.session.adminAuth === true) {
        res.redirect('/admin-dashboard');
    }
}

// ADMIN ---------------------------------------------------------------------------------------------------- (Student)
exports.admin_student_get = async (req, res) => {
    if (req.session.adminAuth === true) {
        const sidebarNav = {student: 'active'};
        // READ Student (P-2)
        Student.find({}, (err, foundStudents) => {
            if (!err) {
                if (req.session.msg === 'INVALID_SID') {
                    req.session.msg = 'NULL';
                    const error = {code: 'ERROR', msg: 'Error! Student ID is already in use.'};
                    res.render('admin/admin-student', {foundStudents, sidebarNav, error});
                } else {
                    res.render('admin/admin-student', {foundStudents, sidebarNav});
                }
            } else {
                console.log(err);
            }
        });
    }
}

exports.admin_student_post = (req, res) => {
    if (req.session.adminAuth === true) {
        const {CRUD} = req.body;
        console.log(CRUD);
        switch (CRUD) {
            // CREATE Student
            case 'ADMIN_CREATE_STUDENT': {
                const {firstName, lastName, studentId, entrySemester, program, dob, citizenship} = req.body;
                Student.findOne({studentId: studentId}, async (err, foundStudent) => {
                    if (!err) {
                        if (foundStudent === null) {
                            const student = new Student({
                                firstName: firstName,
                                lastName: lastName,
                                studentId: studentId,
                                entrySemester: entrySemester,
                                degree: data.Registration(program).degree,
                                degreeShort: data.Registration(program).degreeShort,
                                major: data.Registration(program).major,
                                credits: data.Registration(program).credits,
                                dob: dob,
                                citizenship: citizenship,
                                registrationStatus: false
                            });
                            await student.save();
                            res.redirect('/admin-student');
                        } else {
                            req.session.msg = 'INVALID_SID';
                            res.redirect('/admin-student');
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
                break;
            // READ Student (P-1)
            case 'ADMIN_READ_STUDENT': {
                res.redirect('/admin-student');
            }
                break;
            // UPDATE Student
            case 'ADMIN_UPDATE_STUDENT': {
                const {firstName, lastName, program, dob, citizenship} = req.body;
                Student.findOne({studentId: req.body.studentId}, async (err, foundStudent) => {
                    if (!err) {
                        Student.updateOne(
                            {studentId: req.body.studentId},
                            {
                                $set: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    degree: data.Registration(program).degree,
                                    degreeShort: data.Registration(program).degreeShort,
                                    major: data.Registration(program).major,
                                    credits: data.Registration(program).credits,
                                    dob: dob,
                                    citizenship: citizenship
                                }
                            }, (err) => {
                                if (!err) {
                                    res.redirect('/admin-student');
                                } else {
                                    console.log(err);
                                }
                            });
                    } else {
                        console.log(err);
                    }
                });
            }
                break;
            // DELETE Student
            case 'ADMIN_DELETE_STUDENT': {
                Student.deleteOne({studentId: req.body.studentId}, (err) => {
                    if (!err) {
                        res.redirect('/admin-student');
                    } else {
                        console.log(err);
                    }
                });
            }
                break;
            default:
                console.log("Error occurred in { admin_student_post }");
        }
    }
}

// ADMIN ---------------------------------------------------------------------------------------------------- (Faculty)
exports.admin_faculty_get = (req, res) => {
    if (req.session.adminAuth === true) {
        const sidebarNav = {faculty: 'active'};
        // READ Faculty (P-2)
        Faculty.find({}, (err, foundFaculty) => {
            if (!err) {
                if (req.session.msg === 'INVALID_EMAIL') {
                    req.session.msg = 'NULL';
                    const error = {code: 'ERROR', msg: 'Error! Email is already in use.'};
                    res.render('admin/admin-faculty', {foundFaculty, sidebarNav, error});
                } else {
                    res.render('admin/admin-faculty', {foundFaculty, sidebarNav});
                }
            } else {
                console.log(err);
            }
        });
    }
}

exports.admin_faculty_post = (req, res) => {
    if (req.session.adminAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {
            // CREATE Faculty
            case 'ADMIN_CREATE_FACULTY': {
                const {firstName, lastName, email, university, dob, citizenship} = req.body;
                Faculty.findOne({email: email}, async (err, foundFaculty) => {
                    if (!err) {
                        if (foundFaculty === null) {
                            const faculty = new Faculty({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                university: university,
                                dob: dob,
                                citizenship: citizenship,
                                registrationStatus: false,
                                semesterStatus: false
                            });
                            await faculty.save();
                            res.redirect('/admin-faculty');
                        } else {
                            req.session.msg = 'INVALID_EMAIL';
                            res.redirect('/admin-faculty');
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
                break;
            // READ Faculty (P-1)
            case 'ADMIN_READ_FACULTY': {
                res.redirect('/admin-faculty');
            }
                break;
            // UPDATE Faculty
            case 'ADMIN_UPDATE_FACULTY': {

            }
                break;
            // DELETE Faculty
            case 'ADMIN_DELETE_FACULTY': {
                console.log("Success!");
                Faculty.deleteOne({email: req.body.email}, (err) => {
                    if (!err) {
                        res.redirect('/admin-faculty');
                    } else {
                        console.log(err);
                    }
                });
            }
                break;
            default:
                console.log("Error occurred in { admin_faculty_post }");
        }
    }
}
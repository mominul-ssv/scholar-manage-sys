const data = require('../../database/data.js');
const Student = require('../../model/studentSchema.js');
const Faculty = require('../../model/facultySchema.js');
const Course = require('../../model/courseSchema.js');

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
exports.admin_students_get = async (req, res) => {
    if (req.session.adminAuth === true) {

        const sidebarNav = {student: 'active'};

        Student.find({}, (err, foundStudents) => {
            if (!err) {
                if (req.session.msg === 'DUPLICATE_SID') {

                    req.session.msg = 'NULL';
                    const error = {code: 'ERROR', msg: 'Student ID is already in use!'};
                    res.render('admin/admin-students', {foundStudents, sidebarNav, error});

                } else res.render('admin/admin-students', {foundStudents, sidebarNav});
            } else console.log(err);
        });
    }
}

exports.admin_students_post = (req, res) => {
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
                            res.redirect('/admin-students');
                        } else {
                            req.session.msg = 'DUPLICATE_SID';
                            res.redirect('/admin-students');
                        }
                    } else console.log(err);
                });
            }
                break;

            // READ Student
            case 'ADMIN_READ_STUDENT': {
                res.redirect('/admin-students');
            }
                break;

            // UPDATE Student
            case 'ADMIN_UPDATE_STUDENT': {
                const {firstName, lastName, program, dob, citizenship} = req.body;
                Student.findOne({studentId: req.body.studentId}, async (err) => {
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
                                    res.redirect('/admin-students');
                                } else console.log(err);
                            });
                    } else console.log(err);
                });
            }
                break;

            // DELETE Student
            case 'ADMIN_DELETE_STUDENT': {
                Student.deleteOne({studentId: req.body.studentId}, (err) => {
                    if (!err) {
                        res.redirect('/admin-students');
                    } else console.log(err);
                });
            }
                break;

            // DETAILS Student
            case 'ADMIN_STUDENT_DETAILS': {
                const sidebarNav = {student: 'active'};
                const foundStudent = req.body.student;
                res.render('admin/admin-btn/admin-students-btn/admin-student-details', {foundStudent, sidebarNav});
            }
                break;

            default:
                console.log("Error occurred in { admin_students_post }");
        }
    }
}

// ADMIN ---------------------------------------------------------------------------------------------------- (Faculty)
exports.admin_faculties_get = (req, res) => {
    if (req.session.adminAuth === true) {

        const sidebarNav = {faculty: 'active'};

        Faculty.find({}, (err, foundFaculties) => {
            if (!err) {
                if (req.session.msg === 'DUPLICATE_EMAIL') {

                    req.session.msg = 'NULL';
                    const error = {code: 'ERROR', msg: 'Email is already in use!'};
                    res.render('admin/admin-faculties', {foundFaculties, sidebarNav, error});

                } else res.render('admin/admin-faculties', {foundFaculties, sidebarNav});
            } else console.log(err);
        });
    }
}

exports.admin_faculties_post = (req, res) => {
    if (req.session.adminAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            // CREATE Faculty
            case 'ADMIN_CREATE_FACULTY': {
                const {firstName, lastName, email, university} = req.body;
                Faculty.findOne({email: email}, async (err, foundFaculty) => {
                    if (!err) {
                        if (foundFaculty === null) {
                            const faculty = new Faculty({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                university: university,
                                registrationStatus: false,
                                semesterStatus: false
                            });
                            await faculty.save();
                            res.redirect('/admin-faculties');
                        } else {
                            req.session.msg = 'DUPLICATE_EMAIL';
                            res.redirect('/admin-faculties');
                        }
                    } else console.log(err);
                });
            }
                break;

            // READ Faculty
            case 'ADMIN_READ_FACULTY': {
                res.redirect('/admin-faculties');
            }
                break;

            // UPDATE Faculty
            case 'ADMIN_UPDATE_FACULTY': {
                const {firstName, lastName, email, university} = req.body;
                Faculty.findOne({email: email}, async (err, foundFaculty) => {
                    if (!err) {
                        Faculty.updateOne(
                            {email: email},
                            {
                                $set: {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    university: university,
                                    registrationStatus: foundFaculty.registrationStatus,
                                    semesterStatus: foundFaculty.semesterStatus
                                }
                            }, (err) => {
                                if (!err) {
                                    res.redirect('/admin-faculties');
                                } else console.log(err);
                            });
                    } else console.log(err);
                });
            }
                break;

            // DELETE Faculty
            case 'ADMIN_DELETE_FACULTY': {
                Faculty.deleteOne({email: req.body.email}, (err) => {
                    if (!err) {
                        res.redirect('/admin-faculties');
                    } else console.log(err);
                });
            }
                break;

            default:
                console.log("Error occurred in { admin_faculties_post }");
        }
    }
}

// ADMIN ---------------------------------------------------------------------------------------------------- (Courses)
exports.admin_courses_get = (req, res) => {
    if (req.session.adminAuth === true) {

        const sidebarNav = {courses: 'active'};

        Course.find({}, (err, foundCourses) => {
            if (!err) {
                if (req.session.msg === 'DUPLICATE_COURSE') {

                    req.session.msg = 'NULL';
                    const error = {code: 'ERROR', msg: 'Course already exists!'};
                    res.render('admin/admin-courses', {foundCourses, sidebarNav, error});

                } else res.render('admin/admin-courses', {foundCourses, sidebarNav});
            } else console.log(err);
        });
    }
}

exports.admin_courses_post = (req, res) => {
    if (req.session.adminAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            // CREATE Course
            case 'ADMIN_CREATE_COURSE': {
                const {courseCode, courseDetails, courseCredit} = req.body;
                Course.findOne({courseCode: courseCode}, async (err, foundCourse) => {
                    if (!err) {
                        if (foundCourse === null) {
                            const course = new Course({
                                courseCode: courseCode,
                                courseDetails: courseDetails,
                                courseCredit: courseCredit
                            });
                            await course.save();
                            res.redirect('/admin-courses');
                        } else {
                            req.session.msg = 'DUPLICATE_COURSE';
                            res.redirect('/admin-courses');
                        }
                    } else console.log(err);
                });
            }
                break;

            // READ Course
            case 'ADMIN_READ_COURSE': {
                res.redirect('/admin-courses');
            }
                break;

            // UPDATE Course
            case 'ADMIN_UPDATE_COURSE': {
                const {_id, courseCode, courseDetails, courseCredit} = req.body;
                Course.updateOne(
                    {_id: _id},
                    {
                        $set: {
                            courseCode: courseCode,
                            courseDetails: courseDetails,
                            courseCredit: courseCredit
                        }
                    }, (err) => {
                        if (!err) {
                            res.redirect('/admin-courses');
                        } else console.log(err);
                    });

            }
                break;

            // DELETE Course
            case 'ADMIN_DELETE_COURSE': {
                Course.deleteOne({courseCode: req.body.courseCode}, (err) => {
                    if (!err) {
                        res.redirect('/admin-courses');
                    } else console.log(err);
                });
            }
                break;

            default:
                console.log("Error occurred in { admin_courses_post }");
        }
    }
}
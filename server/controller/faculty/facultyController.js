const Faculty = require("../../model/facultySchema.js");
const Course = require("../../model/courseSchema.js");
const Grade = require("../../model/gradeSchema.js");

// FACULTY ----------------------------------------------------------------------------------------------------- (Home)
exports.faculty_dashboard_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        const sidebarNav = {home: 'active'};
        res.render('faculty/faculty-dashboard', {sidebarNav});
    }
}

exports.faculty_dashboard_post = (req, res) => {
    if (req.session.facultyAuth === true) {
        res.redirect('/faculty-dashboard');
    }
}

// FACULTY -------------------------------------------------------------------------------------------------- (Profile)
exports.faculty_profile_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        Faculty.findOne({email: req.session.facultyEmail}, (err, foundFaculty) => {
            if (!err) {
                const sidebarNav = {profile: 'active'};
                res.render('faculty/faculty-profile', {foundFaculty, sidebarNav});
            } else {
                console.log(err);
            }
        });
    }
}

exports.faculty_profile_post = (req, res) => {
    if (req.session.facultyAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            case 'FACULTY_READ_PROFILE': {
                res.redirect('/faculty-profile');
            }
                break;

            case 'FACULTY_UPDATE_PROFILE': {
                const {_id, phone, dob, citizenship, address} = req.body;
                Faculty.updateOne(
                    {_id: _id},
                    {
                        $set: {
                            phone: phone,
                            dob: dob,
                            citizenship: citizenship,
                            address: address
                        }
                    }, (err) => {
                        if (!err) {
                            res.redirect('/faculty-profile');
                        } else console.log(err);
                    });
            }
                break;

            case 'FACULTY_UPDATE_PROFILE_STATUS': {

                Faculty.findOne({email: req.session.facultyEmail}, (err, foundFaculty) => {
                    if (!err) {
                        Faculty.updateOne(
                            {_id: req.body._id},
                            {
                                $set: {
                                    semesterStatus: !foundFaculty.semesterStatus
                                }
                            }, (err) => {
                                if (!err) {
                                    res.redirect('/faculty-profile');
                                } else console.log(err);
                            });
                    } else console.log(err);
                });
            }
                break;

            default:
                console.log("Error occurred in { faculty_profile_post }");
        }
    }
}

// FACULTY -------------------------------------------------------------------------------------------------- (Courses)
exports.faculty_courses_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        Faculty.findOne({email: req.session.facultyEmail}, (err, foundFaculty) => {
            if (!err) {
                Course.find({}, (err, foundCourses) => {
                    if (!err) {
                        Grade.find({courseFacultyEmail: foundFaculty.email}, (err, foundGrades) => {
                            const sidebarNav = {courses: 'active'};
                            res.render('faculty/faculty-courses', {
                                foundFaculty,
                                foundCourses,
                                foundGrades,
                                sidebarNav
                            });
                        });
                    } else console.log(err);
                });
            } else console.log(err);
        });
    }
}

exports.faculty_courses_post = (req, res) => {
    if (req.session.facultyAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            // ADD Course
            case 'FACULTY_ADD_COURSE': {
                const {courseCode, courseSemester, email, firstName, lastName} = req.body;
                Grade.findOne(
                    {
                        courseFacultyEmail: email,
                        courseCode: courseCode,
                        semesterName: courseSemester
                    },
                    (err, foundGrade) => {
                        if (!err) {
                            if (foundGrade === null) {
                                Course.findOne(
                                    {courseCode: courseCode},
                                    async (err, foundCourse) => {
                                        if (!err) {
                                            const grade = new Grade({
                                                semesterName: courseSemester,
                                                courseCode: courseCode,
                                                courseDetails: foundCourse.courseDetails,
                                                courseFacultyEmail: email,
                                                courseFacultyFirstName: firstName,
                                                courseFacultyLastName: lastName,
                                                courseFacultyStatus: true
                                            });
                                            await grade.save();
                                            res.redirect('/faculty-courses');
                                        } else console.log(err);
                                    });
                            } else {
                                res.redirect('/faculty-courses');
                            }
                        } else console.log(err);
                    });
            }
                break;

            // READ Course
            case 'FACULTY_READ_COURSES': {
                res.redirect('/faculty-courses');
            }
                break;

            // DELETE Course
            case 'FACULTY_DELETE_COURSE': {
                const {_id} = req.body;
                Grade.deleteOne({_id: _id}, (err) => {
                    if (!err) {
                        res.redirect('/faculty-courses');
                    } else console.log(err);
                });
            }
                break;

            default:
                console.log("Error occurred in { faculty_courses_post }");
        }
    }
}

// FACULTY --------------------------------------------------------------------------------------------------- (Grades)
exports.faculty_grades_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        Grade.find({courseFacultyEmail: req.session.facultyEmail}, (err, foundGrades) => {
            if (!err) {
                const sidebarNav = {grades: 'active'};
                res.render('faculty/faculty-grades', {
                    foundGrades,
                    sidebarNav
                });
            } else console.log(err);
        });
    }
}

exports.faculty_grades_post = (req, res) => {
    if (req.session.facultyAuth === true) {

        const {CRUD} = req.body;
        console.log(CRUD);

        switch (CRUD) {

            case 'FACULTY_READ_GRADES': {
                res.redirect('/faculty-grades');
            }
                break;

            case 'FACULTY_STUDENT_GRADES': {
                const sidebarNav = {grades: 'active'};
                res.render('faculty/faculty-btn/faculty-grades-btn/faculty-grade-student.ejs', {sidebarNav});
            }
                break;

            default:
                console.log("Error occurred in { admin_students_post }");
        }
    }
}
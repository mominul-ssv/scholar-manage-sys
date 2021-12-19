const Faculty = require("../../model/facultySchema.js");
const Course = require("../../model/courseSchema.js");

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
                } else {
                    console.log(err);
                }
            });
    }
}

// FACULTY -------------------------------------------------------------------------------------------------- (Courses)
exports.faculty_courses_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        Course.find({}, (err, foundCourses) => {
            if (!err) {
                const sidebarNav = {courses: 'active'};
                res.render('faculty/faculty-courses', {foundCourses, sidebarNav});
            } else {
                console.log(err);
            }
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
                    const {courseCode, courseSemester} = req.body;
                    console.log(req.body);
                    Faculty.findOne({email: req.session.facultyEmail}, (err, foundFaculty) => {
                        if (!err) {
                            Course.findOne({courseCode: courseCode}, (err, foundCourse) => {
                                if (!err) {
                                    Faculty.updateOne(
                                        {_id: foundFaculty._id},
                                        {
                                            $push: {
                                                course: [{
                                                    courseCode: courseCode,
                                                    courseDetails: foundCourse.courseDetails,
                                                    courseSemester: courseSemester
                                                }]
                                            }
                                        }, (err) => {
                                            if (!err) {
                                                res.redirect('/faculty-courses');
                                            } else {
                                                console.log(err);
                                            }
                                        });
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

                // READ Course (P-1)
                case 'FACULTY_READ_COURSE': {
                    res.redirect('/faculty-courses');
                }
                    break;

                // UPDATE Course
                case 'FACULTY_UPDATE_COURSE': {

                }
                    break;

                // DELETE Course
                case 'FACULTY_DELETE_COURSE': {

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
        const sidebarNav = {grades: 'active'};
        res.render('faculty/faculty-grades', {sidebarNav});
    }
}

exports.faculty_grades_post = (req, res) => {
    if (req.session.facultyAuth === true) {
        res.redirect('/faculty-grades');
    }
}
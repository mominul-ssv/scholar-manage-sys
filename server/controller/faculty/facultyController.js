const Faculty = require("../../model/facultySchema.js");
const Course = require("../../model/courseSchema.js");
const Grade = require("../../model/gradeSchema.js");
const Scholarship = require("../../model/scholarshipSchema.js");

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
            } else console.log(err);
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
                                                courseCredit: foundCourse.courseCredit,
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
                Grade.findOne(
                    {_id: req.body._id},
                    (err, found) => {
                        if (!err) {
                            const sidebarNav = {grades: 'active'};
                            res.render('faculty/faculty-btn/faculty-grades-btn/faculty-grade-student.ejs', {
                                found,
                                sidebarNav
                            });
                        } else console.log(err);
                    });
            }
                break;

            case 'FACULTY_STUDENT_GRADES_CHANGE': {

                const {_id, courseStudentId, letterGrade} = req.body;

                Grade.updateOne(
                    {
                        _id: _id,
                        'courseStudent.courseStudentId': courseStudentId
                    },
                    {
                        $set: {
                            'courseStudent.$.courseStudentGrade': letterGrade,
                            'courseStudent.$.courseStudentGradeStatus': true
                        }
                    }, (err) => {
                        if (!err) {
                            // Update information for CGPA calculation
                            Grade.findOne({_id: _id}, (err, foundGrade) => {
                                if (!err) {
                                    Scholarship.findOne(
                                        {studentId: courseStudentId},
                                        async (err, foundScholarship) => {
                                            if (!err) {

                                                // Searching for the course in the collection
                                                let objStatus = false;
                                                foundScholarship.courseCompleted.forEach((found) => {
                                                    if (found.courseCode === foundGrade.courseCode) {
                                                        objStatus = true;
                                                    }
                                                });

                                                if (objStatus === true) {
                                                    Scholarship.updateOne(
                                                        {
                                                            studentId: courseStudentId,
                                                            'courseCompleted.courseCode': foundGrade.courseCode
                                                        },
                                                        {
                                                            $set: {
                                                                'courseCompleted.$.courseGrade': letterGrade,
                                                            }
                                                        },
                                                        (err) => {
                                                            if (!err) {
                                                                refresh();
                                                            } else console.log(err);
                                                        });
                                                } else if (objStatus === false) {
                                                    Scholarship.updateOne(
                                                        {studentId: courseStudentId},
                                                        {
                                                            $push: {
                                                                courseCompleted: {
                                                                    courseCode: foundGrade.courseCode,
                                                                    courseDetails: foundGrade.courseDetails,
                                                                    courseCredit: foundGrade.courseCredit,
                                                                    courseGrade: letterGrade
                                                                }
                                                            }
                                                        }, (err) => {
                                                            if (!err) {
                                                                refresh();
                                                            } else console.log(err);
                                                        });
                                                }
                                            } else console.log(err);
                                        });
                                } else console.log(err);
                            });

                            // Refresh Webpage
                            function refresh() {
                                calculation();
                            }

                            // CGPA Calculation
                            function calculation() {
                                Scholarship.findOne(
                                    {studentId: courseStudentId},
                                    (err, foundScholarship) => {
                                        if (!err) {
                                            if (foundScholarship !== null) {
                                                let sumGradePoint = 0.0;
                                                let sumCredit = 0;
                                                let count = 0;
                                                let pureCGPA = 0.0;

                                                // Convert later grade to grade point
                                                foundScholarship.courseCompleted.forEach((found) => {
                                                    let gradePoint;
                                                    switch (found.courseGrade) {
                                                        case 'A': {
                                                            gradePoint = 4.0;
                                                            break;
                                                        }
                                                        case 'A-': {
                                                            gradePoint = 3.7;
                                                            break;
                                                        }
                                                        case 'B+': {
                                                            gradePoint = 3.3;
                                                            break;
                                                        }
                                                        case 'B': {
                                                            gradePoint = 3.0;
                                                            break;
                                                        }
                                                        case 'B-': {
                                                            gradePoint = 2.7;
                                                            break;
                                                        }
                                                        case 'C+': {
                                                            gradePoint = 2.3;
                                                            break;
                                                        }
                                                        case 'C': {
                                                            gradePoint = 2.0;
                                                            break;
                                                        }
                                                        case 'C-': {
                                                            gradePoint = 1.7;
                                                            break;
                                                        }
                                                        case 'D+': {
                                                            gradePoint = 1.3;
                                                            break;
                                                        }
                                                        case 'D': {
                                                            gradePoint = 1.0;
                                                            break;
                                                        }
                                                        default: {
                                                            gradePoint = 0.0;
                                                        }
                                                    }
                                                    // Count CGPA
                                                    sumGradePoint = sumGradePoint + gradePoint;
                                                    count++;

                                                    // Count credit
                                                    sumCredit = sumCredit + parseInt(found.courseCredit);
                                                });

                                                if (count !== 0) {

                                                    pureCGPA = sumGradePoint / count;
                                                    pureCGPA = pureCGPA.toFixed(2);

                                                    Scholarship.updateOne(
                                                        {studentId: courseStudentId},
                                                        {
                                                            $set: {
                                                                cgpa: pureCGPA,
                                                                creditsCompleted: sumCredit
                                                            }
                                                        },
                                                        (err) => {
                                                            if (!err) {
                                                                Grade.findOne(
                                                                    {_id: _id},
                                                                    (err, found) => {
                                                                        if (!err) {
                                                                            const sidebarNav = {grades: 'active'};
                                                                            res.render('faculty/faculty-btn/faculty-grades-btn/faculty-grade-student.ejs', {
                                                                                found,
                                                                                sidebarNav
                                                                            });
                                                                        } else console.log(err);
                                                                    });
                                                            } else console.log(err);
                                                        });
                                                }
                                            }
                                        } else console.log(err);
                                    });
                            }

                        } else console.log(err);
                    });
            }
                break;

            default:
                console.log("Error occurred in { faculty_grades_post }");
        }
    }
}
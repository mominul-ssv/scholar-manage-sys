const Student = require('../../model/studentSchema.js');

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

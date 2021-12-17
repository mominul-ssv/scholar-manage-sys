// FACULTY ----------------------------------------------------------------------------------------------------- (Home)
const Faculty = require("../../model/facultySchema.js");
const Student = require("../../model/studentSchema.js");
exports.faculty_home_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        const sidebarNav = {home: 'active'};
        res.render('faculty/faculty-home', {sidebarNav});
    }
}

exports.faculty_home_post = (req, res) => {
    if (req.session.facultyAuth === true) {
        res.redirect('/faculty-home');
    }
}

// FACULTY -------------------------------------------------------------------------------------------------- (Profile)
exports.faculty_profile_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        // READ Faculty (Student-Auth)
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
        const sidebarNav = {courses: 'active'};
        res.render('faculty/faculty-courses', {sidebarNav});
    }
}

exports.faculty_courses_post = (req, res) => {
    if (req.session.facultyAuth === true) {
        res.redirect('/faculty-courses');
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
// FACULTY ----------------------------------------------------------------------------------------------------- (Home)
exports.faculty_home_get = (req, res) => {
    const sidebarNav = {home: 'active'};
    res.render('faculty/faculty-home', {sidebarNav});
}

exports.faculty_home_post = (req, res) => {
    res.redirect('/faculty-home');
}

// FACULTY -------------------------------------------------------------------------------------------------- (Profile)
exports.faculty_profile_get = (req, res) => {
    if (req.session.facultyAuth === true) {
        const sidebarNav = {profile: 'active'};
        res.render('faculty/faculty-courses', {sidebarNav});
    }
}

exports.faculty_profile_post = (req, res) => {
    if (req.session.facultyAuth === true) {
        res.redirect('/faculty-profile');
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
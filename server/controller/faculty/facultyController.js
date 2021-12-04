// FACULTY ----------------------------------------------------------------------------------------------------- (Home)
exports.faculty_home_get = (req, res) => {
    const sidebarNav = {faculty: 'active'};
    res.render('faculty/faculty-home', {sidebarNav});
}

exports.faculty_home_post = (req, res) => {
    res.redirect('/faculty-home');
}
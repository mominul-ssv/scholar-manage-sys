// FACULTY ------------------------------------------------------------------------------------------------- (Register)
exports.faculty_register_get = (req, res) => {
    res.render('register/faculty/faculty-register');
}

exports.faculty_register_post = async (req, res) => {
    res.redirect('faculty-password-reset');
}

// FACULTY ------------------------------------------------------------------------------------------- (Password Reset)
exports.faculty_password_reset_get = (req, res) => {
    res.render('register/faculty/faculty-password-reset');
}

exports.faculty_password_reset_post = (req, res) => {
    res.redirect('faculty-password-reset');
}
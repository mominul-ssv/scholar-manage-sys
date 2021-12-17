// FACULTY ------------------------------------------------------------------------------------------------- (Register)
const Faculty = require("../../model/facultySchema.js");
const bcrypt = require("bcrypt");

exports.faculty_register_get = (req, res) => {
    res.render('register/faculty/faculty-register');
}

exports.faculty_register_post = async (req, res) => {

    const {email, facultyPassword, facultyPasswordConfirm} = req.body;

    if (facultyPassword !== facultyPasswordConfirm) {

        const error = {code: 'ERROR', msg: 'Password mismatch!'};
        res.render('register/faculty/faculty-register', {error});

    } else {
        // READ Faculty
        Faculty.findOne({email: email}, async (err, foundFaculty) => {
            if (!err) {
                if (foundFaculty !== null) {
                    if (foundFaculty.registrationStatus === false) {
                        // Hashing Faculty Password
                        const hashedPassword = await bcrypt.hash(facultyPassword, 10);
                        // UPDATE Faculty
                        Faculty.updateOne(
                            {email: email},
                            {
                                $set: {
                                    password: hashedPassword,
                                    registrationStatus: true
                                }
                            }, (err) => {
                                if (!err) {
                                    res.redirect('/');
                                } else {
                                    console.log(err);
                                }
                            });
                    } else {
                        const error = {code: 'ERROR', msg: 'Faculty is already registered!'};
                        res.render('register/faculty/faculty-register', {error});
                    }
                } else {
                    const error = {code: 'ERROR', msg: 'Faculty email is invalid!'};
                    res.render('register/faculty/faculty-register', {error});
                }
            } else {
                console.log(err);
            }
        });
    }
}

// FACULTY ------------------------------------------------------------------------------------------- (Password Reset)
exports.faculty_password_reset_get = (req, res) => {
    res.render('register/faculty/faculty-password-reset');
}

exports.faculty_password_reset_post = (req, res) => {
    res.redirect('faculty-password-reset');
}
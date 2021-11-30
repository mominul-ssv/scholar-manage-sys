exports.logout_post = (req, res) => {
    switch (req.body.auth) {
        case 'admin-auth': {
            if (req.session.studentAuth === true || req.session.facultyAuth === true) {
                console.log("admin-auth");
                req.session.adminAuth = false;
                res.redirect('/');
            } else {
                console.log("admin-auth-destroy");
                destroyAllSessions(req, res);
            }
        }
            break;
        case 'student-auth': {
            if (req.session.adminAuth === true || req.session.facultyAuth === true) {
                console.log("student-auth");
                req.session.studentAuth = false;
                res.redirect('/');
            } else {
                console.log("student-auth-destroy");
                destroyAllSessions(req, res);
            }
        }
            break;
        case 'faculty-auth': {
            if (req.session.studentAuth === true || req.session.adminAuth === true) {
                console.log("faculty-auth");
                req.session.facultyAuth = false;
                res.redirect('/');
            } else {
                console.log("faculty-auth-destroy");
                destroyAllSessions(req, res);
            }
        }
            break;
        default:
            console.log("Error occurred in { logout_post }");
    }
}

destroyAllSessions = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/');
        } else {
            console.log(err);
        }
    });
}
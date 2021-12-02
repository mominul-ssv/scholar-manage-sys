const express = require('express');
const router = express.Router();
const adminGenController = require('../controller/admin/adminGenController');
const adminController = require('../controller/admin/adminController');
const studentController = require('../controller/student/studentController');
const loginController = require('../controller/login/loginController');
const logoutController = require('../controller/logout/logoutController');

adminGenController.admin_generate();

// ======================= Login Portal ======================= //
router.route('/')
    .get(loginController.root_get)
    .post(loginController.root_post)

// ======================= Admin Portal ======================= //
router.route('/admin-dashboard')
    .get(adminController.admin_dashboard_get)
    .post(adminController.admin_dashboard_post)

router.route('/admin-student')
    .get(adminController.admin_student_get)
    .post(adminController.admin_student_post)

router.route('/admin-faculty')
    .get(adminController.admin_faculty_get)
    .post(adminController.admin_faculty_post)

// ======================= Student Portal ======================= //
router.route('/student-register')
    .get(studentController.student_register_get)
    .post(studentController.student_register_post)

router.route('/student-password-reset')
    .get(studentController.student_password_reset_get)
    .get(studentController.student_password_reset_post)

router.route('/student-home')
    .get(studentController.student_home_get)
    .post(studentController.student_home_post)

router.route('/student-profile')
    .get(studentController.student_profile_get)
    .post(studentController.student_profile_post)

router.route('/student-courses')
    .get(studentController.student_courses_get)
    .post(studentController.student_courses_post)

router.route('/student-grades')
    .get(studentController.student_grades_get)
    .post(studentController.student_grades_post)

router.route('/student-scholarship')
    .get(studentController.student_scholarship_get)
    .post(studentController.student_scholarship_post)

// ======================= Logout Portal ======================= //
router.route('/logout')
    .post(logoutController.logout_post)

module.exports = router;
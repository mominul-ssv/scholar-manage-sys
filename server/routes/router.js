const express = require('express');
const router = express.Router();

const studentController = require('../controller/student/studentController');
const studentRegController = require('../controller/student/studentRegController');

const facultyController = require('../controller/faculty/facultyController');
const facultyRegController = require('../controller/faculty/facultyRegController');

const adminController = require('../controller/admin/adminController');
const adminGenController = require('../controller/admin/adminGenController');

const loginController = require('../controller/login/loginController');
const logoutController = require('../controller/logout/logoutController');

adminGenController.admin_generate();

// ======================= Login Portal ======================= //
router.route('/')
    .get(loginController.root_get)
    .post(loginController.root_post)

// ======================= Student Portal ======================= //
router.route('/student-register')
    .get(studentRegController.student_register_get)
    .post(studentRegController.student_register_post)

router.route('/student-password-reset')
    .get(studentRegController.student_password_reset_get)
    .get(studentRegController.student_password_reset_post)

// ---------------------- Student Dashboard --------------------- //
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

// ======================= Faculty Portal ======================= //
router.route('/faculty-register')
    .get(facultyRegController.faculty_register_get)
    .post(facultyRegController.faculty_register_post)

router.route('/faculty-password-reset')
    .get(facultyRegController.faculty_password_reset_get)
    .get(facultyRegController.faculty_password_reset_post)

// ---------------------- Faculty Dashboard --------------------- //
router.route('/faculty-home')
    .get(facultyController.faculty_home_get)
    .post(facultyController.faculty_home_post)

router.route('/faculty-profile')
    .get(facultyController.faculty_profile_get)
    .post(facultyController.faculty_profile_post)

router.route('/faculty-courses')
    .get(facultyController.faculty_courses_get)
    .post(facultyController.faculty_courses_post)

router.route('/faculty-grades')
    .get(facultyController.faculty_grades_get)
    .post(facultyController.faculty_grades_post)


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

// ======================= Logout Portal ======================= //
router.route('/logout')
    .post(logoutController.logout_post)

module.exports = router;
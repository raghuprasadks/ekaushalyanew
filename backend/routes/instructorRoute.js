const express = require('express');
const { createInstructor,
    getInstructors,
    getInstructor,
    updateInstructors,
    deleteInstructors,
    getInstructorDetails,
} = require('../controllers/instructorController')

const router = express.Router();

router.route('/admin/instructor/new').post(createInstructor);
router.route('/admin/instructors').get(getInstructors);
router.route('/instructor/:id').get(getInstructor);
router.route('/admin/instructor/:id').put(updateInstructors);
router.route('/admin/instructor/:id').delete(deleteInstructors);
router.route('/instructor/:id').get(getInstructorDetails);

module.exports = router;
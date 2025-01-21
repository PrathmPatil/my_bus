const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getStudents)
  .post(protect, admin, createStudent);

router.route('/:id')
  .get(protect, getStudent)
  .put(protect, admin, updateStudent)
  .delete(protect, admin, deleteStudent);

router.route('/:id/status')
  .put(protect, updateStudentStatus);

module.exports = router;

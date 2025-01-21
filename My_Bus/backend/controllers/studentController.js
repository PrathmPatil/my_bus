const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const User = require('../models/userModel');
const Bus = require('../models/busModel');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find()
    .populate('parentId', 'name phone')
    .populate('busId', 'busNumber');
  res.status(200).json(students);
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate('parentId', 'name phone')
    .populate('busId', 'busNumber');

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  res.status(200).json(student);
});

// @desc    Create student
// @route   POST /api/students
// @access  Private/Admin
const createStudent = asyncHandler(async (req, res) => {
  const { name, parentId, busId, pickupLocation, dropLocation } = req.body;

  if (!name || !parentId || !busId || !pickupLocation || !dropLocation) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Validate parent
  const parent = await User.findOne({ _id: parentId, role: 'Parent' });
  if (!parent) {
    res.status(400);
    throw new Error('Invalid parent ID');
  }

  // Validate bus
  const bus = await Bus.findById(busId);
  if (!bus) {
    res.status(400);
    throw new Error('Invalid bus ID');
  }

  const student = await Student.create({
    name,
    parentId,
    busId,
    pickupLocation,
    dropLocation,
  });

  res.status(201).json(student);
});

// @desc    Update student pickup/drop status
// @route   PUT /api/students/:id/status
// @access  Private
const updateStudentStatus = asyncHandler(async (req, res) => {
  const { pickupStatus, dropStatus } = req.body;

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  if (typeof pickupStatus !== 'undefined') {
    student.pickupStatus = pickupStatus;
  }

  if (typeof dropStatus !== 'undefined') {
    student.dropStatus = dropStatus;
  }

  const updatedStudent = await student.save();

  res.status(200).json(updatedStudent);
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Validate parent if being updated
  if (req.body.parentId) {
    const parent = await User.findOne({ _id: req.body.parentId, role: 'Parent' });
    if (!parent) {
      res.status(400);
      throw new Error('Invalid parent ID');
    }
  }

  // Validate bus if being updated
  if (req.body.busId) {
    const bus = await Bus.findById(req.body.busId);
    if (!bus) {
      res.status(400);
      throw new Error('Invalid bus ID');
    }
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedStudent);
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  await student.remove();

  res.status(200).json({ message: 'Student removed' });
});

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
};

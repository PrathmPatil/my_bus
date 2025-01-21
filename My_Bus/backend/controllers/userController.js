const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, isActive } = req.body;
console.log(req.body)
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    isActive,
    role: role || 'user',
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const getAllProfiles=asyncHandler(async(req,res)=>{
  const users=await User.find()
  res.status(200).json(users)
})

const  getProfileById=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select('-password')
  res.status(200).json(user)
})

const updateProfileById=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(user){
    const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedUser)
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})
module.exports = {
  registerUser,
  loginUser,
  getAllProfiles,
  getProfileById,
  updateProfileById
};

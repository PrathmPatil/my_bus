const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfileById,
  updateProfileById,
  getAllProfiles,
} = require('../controllers/userController');
const { admin, protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id',protect,admin, getProfileById);
router.put('/:id', protect,admin, updateProfileById);

// router.post('/logout', logoutUser);
router.get('/',protect,admin,getAllProfiles)

module.exports = router;

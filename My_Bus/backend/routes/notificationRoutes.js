const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getUserNotifications)
  .post(protect, createNotification);

router.route('/:id')
  .put(protect, markNotificationAsRead)
  .delete(protect, deleteNotification);

module.exports = router;

const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .populate('relatedBus', 'busNumber');
  res.status(200).json(notifications);
});

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private
const createNotification = asyncHandler(async (req, res) => {
  const { userId, message, type, relatedBus } = req.body;

  if (!userId || !message) {
    res.status(400);
    throw new Error('Please provide user ID and message');
  }

  const notification = await Notification.create({
    userId,
    message,
    type: type || 'Regular',
    relatedBus,
  });

  res.status(201).json(notification);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  // Check if notification belongs to user
  if (notification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json(notification);
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  // Check if notification belongs to user
  if (notification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await notification.remove();

  res.status(200).json({ message: 'Notification removed' });
});

module.exports = {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
};

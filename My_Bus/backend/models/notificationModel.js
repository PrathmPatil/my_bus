const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Emergency', 'Regular'],
      default: 'Regular',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedBus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);

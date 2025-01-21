const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true,
    },
    pickupStatus: {
      type: Boolean,
      default: false,
    },
    dropStatus: {
      type: Boolean,
      default: false,
    },
    pickupLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    dropLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ pickupLocation: '2dsphere', dropLocation: '2dsphere' });

module.exports = mongoose.model('Student', studentSchema);

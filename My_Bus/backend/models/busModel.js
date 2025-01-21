const mongoose = require('mongoose');

const busSchema = mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    helperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fuelLevel: {
      type: Number,
      default: 100,
    },
    status: {
      type: String,
      enum: ['Active', 'In Maintenance', 'Idle'],
      default: 'Idle',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    capacity: {
      type: Number,
      required: true,
    },
    maintenanceHistory: [{
      date: Date,
      description: String,
      cost: Number,
    }],
  },
  {
    timestamps: true,
  }
);

busSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Bus', busSchema);

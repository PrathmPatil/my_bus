const asyncHandler = require('express-async-handler');
const Bus = require('../models/busModel');
const User = require('../models/userModel');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Private
const getBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find()
    .populate('driverId', 'name phone')
    .populate('helperId', 'name phone');
  res.status(200).json(buses);
});

// @desc    Get single bus
// @route   GET /api/buses/:id
// @access  Private
const getBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id)
    .populate('driverId', 'name phone')
    .populate('helperId', 'name phone');

  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }

  res.status(200).json(bus);
});

// @desc    Create bus
// @route   POST /api/buses
// @access  Private/Admin
const createBus = asyncHandler(async (req, res) => {
  const { busNumber, capacity, driverId, helperId } = req.body;

  if (!busNumber || !capacity) {
    res.status(400);
    throw new Error('Please provide bus number and capacity');
  }

  // Check if bus number already exists
  const busExists = await Bus.findOne({ busNumber });
  if (busExists) {
    res.status(400);
    throw new Error('Bus number already exists');
  }

  // Validate driver and helper if provided
  if (driverId) {
    const driver = await User.findOne({ _id: driverId, role: 'Driver' });
    if (!driver) {
      res.status(400);
      throw new Error('Invalid driver ID');
    }
  }

  if (helperId) {
    const helper = await User.findOne({ _id: helperId, role: 'Helper' });
    if (!helper) {
      res.status(400);
      throw new Error('Invalid helper ID');
    }
  }

  const bus = await Bus.create({
    busNumber,
    capacity,
    driverId,
    helperId,
  });

  res.status(201).json(bus);
});

// @desc    Update bus
// @route   PUT /api/buses/:id
// @access  Private/Admin
const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }

  // Validate driver and helper if being updated
  if (req.body.driverId) {
    const driver = await User.findOne({ _id: req.body.driverId, role: 'Driver' });
    if (!driver) {
      res.status(400);
      throw new Error('Invalid driver ID');
    }
  }

  if (req.body.helperId) {
    const helper = await User.findOne({ _id: req.body.helperId, role: 'Helper' });
    if (!helper) {
      res.status(400);
      throw new Error('Invalid helper ID');
    }
  }

  const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedBus);
});

// @desc    Update bus location
// @route   PUT /api/buses/:id/location
// @access  Private
const updateBusLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    res.status(400);
    throw new Error('Please provide latitude and longitude');
  }

  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }

  bus.location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  await bus.save();

  res.status(200).json(bus);
});

// @desc    Delete bus
// @route   DELETE /api/buses/:id
// @access  Private/Admin
const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    res.status(404);
    throw new Error('Bus not found');
  }

  await bus.remove();

  res.status(200).json({ message: 'Bus removed' });
});

module.exports = {
  getBuses,
  getBus,
  createBus,
  updateBus,
  updateBusLocation,
  deleteBus,
};

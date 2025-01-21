const express = require('express');
const router = express.Router();
const {
  getBuses,
  getBus,
  createBus,
  updateBus,
  updateBusLocation,
  deleteBus,
} = require('../controllers/busController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBuses)
  .post(protect, admin, createBus);

router.route('/:id')
  .get(protect, getBus)
  .put(protect, admin, updateBus)
  .delete(protect, admin, deleteBus);

router.route('/:id/location')
  .put(protect, updateBusLocation);

module.exports = router;

const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');

router.get('/', LocationController.getAllLocations);

router.post('/', LocationController.createLocation);

router.put('/:id', LocationController.updateLocation);

router.delete('/:id', LocationController.deleteLocation);

module.exports = router;
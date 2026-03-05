const express = require('express');
const router = express.Router();
const rolleController = require('../controllers/rolleController');

router.get('/', rolleController.getAllRollen);
router.post('/', rolleController.createRolle);
router.put('/:id', rolleController.updateRolle);
router.delete('/:id', rolleController.deleteRolle);

module.exports = router;
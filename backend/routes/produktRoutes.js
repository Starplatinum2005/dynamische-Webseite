const express = require('express');
const router = express.Router();
const produktController = require('../controllers/produktController');

router.get('/', produktController.getAllProdukte);

router.post('/', produktController.createProdukt);

router.put('/:id', produktController.updateProdukt);

router.delete('/:id', produktController.deleteProdukt);

module.exports = router;
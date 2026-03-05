const express = require('express');
const router = express.Router();
const bestellungController = require('../controllers/bestellungController');

router.get('/', bestellungController.getAllBestellungen);
router.post('/', bestellungController.createBestellung);
router.delete('/:id', bestellungController.deleteBestellung);

module.exports = router;
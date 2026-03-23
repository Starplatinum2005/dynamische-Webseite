const express = require('express');
const router = express.Router();
const bestellungController = require('../controllers/bestellungController');

router.get('/', bestellungController.getAllBestellungen);
router.post('/', bestellungController.createBestellung);
router.get('/user/:userId', bestellungController.getBestellungenByUserId);
router.delete('/:id', bestellungController.deleteBestellung);

module.exports = router;
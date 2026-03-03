const express = require('express');
const router = express.Router();
const kursController = require('../controllers/kursController');

router.get('/', kursController.getAllKurse);

router.post('/', kursController.createKurs);

router.put('/:id', kursController.updateKurs);

router.delete('/:id', kursController.deleteKurs);

module.exports = router;
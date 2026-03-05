const express = require('express');
const router = express.Router();
const benutzerController = require('../controllers/benutzerController');

router.get('/', benutzerController.getAllBenutzer);

router.post('/', benutzerController.createBenutzer);

router.put('/:id', benutzerController.updateBenutzer);

router.delete('/:id', benutzerController.deleteBenutzer);


router.post('/:id/rollen', benutzerController.assignRolle);
router.delete('/:id/rollen/:rollenId', benutzerController.removeRolle);

module.exports = router;
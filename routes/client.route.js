const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');

router.get('/test', clientController.test);
router.post('/create', clientController.createClient);
router.get('/:id', clientController.getClientDetails);
router.put('/:id/update', clientController.updateClient);
router.delete('/:id/delete', clientController.deleteClient);

module.exports = router;
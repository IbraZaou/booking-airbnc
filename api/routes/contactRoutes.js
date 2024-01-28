const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/send-message', contactController.sendMessage);
router.get('/messages', contactController.getAllMessages);

module.exports = router;

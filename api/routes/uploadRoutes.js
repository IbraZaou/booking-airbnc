const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Route pour l'upload d'images à partir d'un lien
router.post('/upload-by-link', uploadController.uploadByLink);
router.post('/upload', uploadController.uploadByComputer);

module.exports = router;

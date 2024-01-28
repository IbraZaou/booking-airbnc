const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.delete('/delete-place/:id', placeController.deletePlace);
router.post('/places', placeController.createPlace);
router.get('/user-places', placeController.getUserPlaces);
router.get('/places/:id', placeController.getPlaceById);
router.put('/places', placeController.updatePlace);
router.get('/places', placeController.getAllPlaces);
router.delete('/places/:id', placeController.deletePlaceById);

module.exports = router;

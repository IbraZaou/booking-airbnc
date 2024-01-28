const Place = require('../models/Place');
const jwt = require('jsonwebtoken');
const jwtSecret = 'lfmqjdlM4MIjkljf4fjfldksjf';

const deletePlace = async (req, res) => {
    const placeId = req.params.id;

    try {
        const deletedPlace = await Place.findByIdAndRemove(placeId);
        if (!deletedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json({ message: 'Place deleted successfully' });
    } catch (error) {
        console.error('Error deleting place:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Fonction de création de places
const createPlace = async (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    try {
        const userData = jwt.verify(token, jwtSecret);
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc);
    } catch (err) {
        console.error('Error creating place:', err);
        res.status(500).json({ message: 'Erreur lors de la création de la place' });
    }
};



// Fonction pour obtenir les places d'un utilisateur
const getUserPlaces = async (req, res) => {
    const { token } = req.cookies;

    try {
        const userData = jwt.verify(token, jwtSecret);
        const { id } = userData;
        const userPlaces = await Place.find({ owner: id });
        res.json(userPlaces);
    } catch (err) {
        console.error('Error fetching user places:', err);
        res.status(500).json({ message: "Erreur lors de la récupération des places de l'utilisateur" });
    }
};


// Fonction pour obtenir une place par ID
const getPlaceById = async (req, res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        console.error('Error fetching place by ID:', err);
        res.status(500).json({ message: "Erreur lors de la récupération de la place par ID" });
    }
};



// Créez une fonction pour gérer la mise à jour des places
const updatePlace = async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    try {
        const userData = jwt.verify(token, jwtSecret);

        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        } else {
            res.status(403).json({ message: 'You are not authorized to update this place.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Créez une fonction pour gérer la récupération de toutes les places
const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Créez une fonction pour gérer la suppression d'une place par ID
const deletePlaceById = async (req, res) => {
    const placeId = req.params.id;

    try {
        await Place.findByIdAndDelete(placeId);
        res.status(200).send({ message: 'Lieu supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de la suppression du lieu' });
    }
};


module.exports = { deletePlace, createPlace, getUserPlaces, getPlaceById, updatePlace, getAllPlaces, deletePlaceById };

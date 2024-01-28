const Booking = require('../models/Booking'); // Importez le modèle Booking
const { getUserDataFromReq } = require('../utils/jwtUtils'); // Importez la fonction pour obtenir les données de l'utilisateur

// Créez une fonction pour gérer la création d'une nouvelle réservation
const createBooking = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

        // Créez la réservation avec le statut initial
        const newBooking = await Booking.create({
            place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userData.id
        });

        res.json(newBooking);
    } catch (error) {
        console.error("Erreur lors de la création de la nouvelle réservation", error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};



const getUserBookings = async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const userBookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(userBookings);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations de l'utilisateur", error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};



// Fonction pour obtenir toutes les réservations
const getAllBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find();
        res.json(allBookings);
    } catch (error) {
        console.error("Erreur lors de la récupération de toutes les réservations", error);
        res.status(500).json({ message: "Erreur du serveur interne" });
    }
};

const deleteBookingById = async (req, res) => {
    const bookingId = req.params.id;

    try {
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).send({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(400).send({ message: "Erreur lors de la suppression de la réservation" });
    }
}

module.exports = { createBooking, getUserBookings, getAllBookings, deleteBookingById };

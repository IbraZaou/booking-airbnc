const stripe = require('../config/stripeConfig');
const BookingModel = require('../models/Booking');

const createStripeSession = async (req, res) => {
    try {
        const { price, bookingId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Booking Payment',
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5173/',
            metadata: { bookingId }
        });

        res.json({ sessionId: session.id, bookingId });
    } catch (error) {
        console.error("Error creating Stripe session", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const paymentSuccess = async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        console.log("Received session_id:", sessionId); // Pour vérifier l'ID de session reçu

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Stripe session retrieved successfully:", session);

        const bookingId = session.metadata.bookingId;
        console.log("Retrieved bookingId from metadata:", bookingId); // Confirmer la récupération de l'ID de réservation

        const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, { paymentStatus: 'payé' }, { new: true });
        console.log("Booking updated successfully:", updatedBooking); // Confirmer la mise à jour de la réservation

        res.redirect('http://localhost:5173/payment-success');
    } catch (error) {
        console.error("Error verifying Stripe session or updating payment status", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createStripeSession, paymentSuccess };
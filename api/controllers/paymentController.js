const stripe = require('../config/stripeConfig');

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

module.exports = { createStripeSession };
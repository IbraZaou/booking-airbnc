import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import AddressLink from '../components/AddressLink';
import { loadStripe } from '@stripe/stripe-js';




const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])


    if (!booking) {
        return '';
    }


    const stripePayment = async () => {
        const stripe = await loadStripe("pk_test_51OYYXzBmkOgBJ5DWFIcJgfFaHKk5kYOP3OSAeu2MWrCAaQbWDdI1h3Fjdmh8JEMkjUVEidT9YL7mVgzmrOZ5Rgmu00R6BAQeyo");

        try {
            const response = await axios.post('/api/create-stripe-session', {
                // Envoyer les données nécessaires pour la session de paiement
                price: booking.price,
                // ... Autres données nécessaires
            });

            const sessionId = response.data.sessionId;

            // Rediriger l'utilisateur vers la page de paiement Stripe
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                console.log(result.error.message);
            }
        } catch (error) {
            console.error("Error during payment", error);
        }
    };

    return (
        <div className="my-8">
            <h1 className="text-6xl mb-6 text-center">{booking.place.title}</h1>
            <AddressLink className="mt-2 m-auto block w-24 text-center">{booking.place.address}</AddressLink>

            <div className='w-4/12 m-auto'>
                <div onClick={stripePayment} className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between hover:border w-full border-primary cursor-pointer">
                    <div>
                        <h2 className="text-2xl mb-4">Information de réservation:</h2>
                        <BookingDates booking={booking} />
                    </div>
                    <div className="bg-primary p-6 text-white rounded-2xl">
                        <div>Prix total</div>
                        <div className="text-3xl">{booking.price} €</div>
                    </div>
                </div>
            </div>

            <PlaceGallery place={booking.place} />
        </div>
    );
};

export default BookingPage;
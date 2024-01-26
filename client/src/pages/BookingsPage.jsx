import React, { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';
import { Link, useParams } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';



const BookingsPage = () => {
    const { id } = useParams();

    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);


    useEffect(() => {
        axios.get('/bookings').then(response => {
            const foundBooking = response.data.find(({ _id }) => _id === id);
            if (foundBooking) {
                setBooking(foundBooking)
            }
            setBookings(response.data);

        })

    }, [id]);



    const cancelBooking = async (bookingId) => {
        // Trouver la réservation correspondante
        const bookingToCancel = bookings.find(booking => booking._id === bookingId);
        if (!bookingToCancel) {
            console.error("Réservation introuvable");
            return;
        }

        const confirmation = window.confirm('Etes-vous sûr de vouloir annuler la réservation pour ' + bookingToCancel.place.title + ' ?');
        if (!confirmation) {
            return; // Ne pas continuer si l'utilisateur annule la confirmation
        }

        try {
            await axios.delete(`/bookings/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
            toast.success('Votre réservation a bien été supprimée');
        } catch (error) {
            console.error("Error cancelling booking", error);
            // Gérer l'erreur comme vous le souhaitez
        }
    };


    const stripePayment = async (currentBooking) => {
        const stripe = await loadStripe("pk_test_51OYYXzBmkOgBJ5DWFIcJgfFaHKk5kYOP3OSAeu2MWrCAaQbWDdI1h3Fjdmh8JEMkjUVEidT9YL7mVgzmrOZ5Rgmu00R6BAQeyo");

        try {
            const response = await axios.post('/api/create-stripe-session', {
                // Envoyer les données nécessaires pour la session de paiement
                price: currentBooking.price,
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
        <div>
            <AccountNav />
            <ToastContainer />

            <div className='grid grid-cols-2'>
                {bookings?.length > 0 && bookings.map((booking, index) => (
                    <div key={index} className=' rounded-2xl flex justify-between bg-gray-200 p-6 mx-8 my-4'>
                        <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                            <div className="w-64">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl">{booking.place.title}</h2>
                                <div className="text-xl">
                                    <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />

                                    <div className='flex justify-start items-center mb-2 mt-2   text-gray-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                        </svg>

                                        <span>{booking.place.maxGuests}</span>
                                    </div>


                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                        <span className="text-2xl">
                                            Total price: {booking.price}€
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <div className='flex flex-col justify-between items-center ml-4'>
                            <button onClick={() => cancelBooking(booking._id)} className='bg-red-500 text-center text-white h-full px-4 rounded-xl mb-2' >Annuler la réservation</button>
                            <button className='bg-orange-300 text-center text-white h-full px-4 rounded-xl mt-2' >Modifier la réservation</button>
                            <button onClick={() => stripePayment(booking)} className='bg-green-500 text-center w-full text-white h-full px-4 rounded-xl mt-4' >Payer la réservation</button>
                        </div>

                    </div>

                ))}



            </div>
        </div>
    );
};

export default BookingsPage;    
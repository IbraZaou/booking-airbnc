import React, { useEffect, useState, useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);


    // Si la date de checkout est antérieur a la date de check-in 
    useEffect(() => {
        if (checkIn && checkOut) {
            const inDate = new Date(checkIn);
            const outDate = new Date(checkOut);

            if (inDate > outDate) {
                toast.error('La date de check-out ne peut pas être antérieure à la date de check-in.');
            } else if (checkIn === checkOut) {
                toast.info('Vous devez au minimum booker un jour.');

            }
        }
    }, [checkIn, checkOut]);


    // Nombre d'invité minimum
    useEffect(() => {
        if (parseInt(numberOfGuests) < 1) {
            toast.error('Vous devez mettre au minimum une personne');
        } else if (parseInt(numberOfGuests) > place.maxGuests) {
            toast.error(`Vous pouvez mettre au maximum ${place.maxGuests} personnes`);
        }
    }, [numberOfGuests, place.maxGuests]);


    useEffect(() => {

        if (user) {
            setName(user.name);
        }
    }, [user]);


    // Verifier que tout les champs ont bien été rempli
    function isFormValid() {
        return checkIn &&
            checkOut &&
            numberOfGuests >= 1 &&
            numberOfGuests <= place.maxGuests &&
            name &&
            phone.length === 10 &&
            numberOfNights > 0;
    }

    // Affichage du calcul pour les jours déposé
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {

        const response = await axios.post('/bookings', { place: place._id, checkIn, checkOut, numberOfGuests, name, phone, price: numberOfNights * place.price });

        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white grid-cols-1  md:p-4 rounded-2xl shadow'>
            <ToastContainer />
            <div className='text-2xl text-center'>
                {place.price} € / par nuit
            </div>


            <div className="border rounded-2xl mt-4">
                <div className="flex justify-center items-center">
                    <div className='p-4 flex flex-col items-center justify-center'>
                        <label>Jour d'arrivée</label>
                        <input
                            className='border border-black p-2 rounded-2xl'
                            type="date"
                            required
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>

                    <div className='p-4 flex flex-col items-center justify-center border-l'>
                        <label>Jour de départ</label>
                        <input
                            className='border border-black p-2 rounded-2xl'
                            type="date"
                            required
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
            </div>

            <div className='my-4 py-4 px-4 border-t'>
                <label>Nombre de personnes</label>
                <input
                    type="number"
                    min={1}
                    max={place.maxGuests}
                    required
                    value={numberOfGuests}
                    onChange={ev => setNumberOfGuests(ev.target.value)} />
            </div>
            {numberOfNights > 0 && (
                <div className='my-4 py-4 px-4 border-t'>
                    <label>Votre nom:</label>
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={ev => setName(ev.target.value)} />

                    <label>Numéro de téléphone:</label>
                    <input
                        max={10}
                        min={10}
                        type="tel"
                        required
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)} />
                </div>
            )}


            {numberOfNights > 0 && (
                <p className='text-center'>Total : <span className='font-bold'> {numberOfNights * place.price} €</span> </p>
            )}

            {
                user ? (
                    // Si tout les champs ne sons pas rempli mettre la class an cursor-not-allowed et grayscale
                    <button onClick={bookThisPlace} className={`primary mt-4 ${!isFormValid() ? 'cursor-not-allowed grayscale' : ''}`} disabled={!isFormValid()} >
                        Réserver
                    </button>
                ) : (

                    <div className='flex justify-center items-center'>
                        <a href={'/login'} className='primary text-center'>
                            Connectez vous pour pouvoir réserver
                        </a>
                    </div>

                )
            }

        </div >
    );
};

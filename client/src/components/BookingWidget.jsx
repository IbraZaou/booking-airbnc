import React, { useEffect, useState, useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';


export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {

        if (user) {
            setName(user.name);
        }
    }, [user])

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
            <div className='text-2xl text-center'>
                {place.price} € / par nuit
            </div>

            <div className="border rounded-2xl mt-4">
                <div className="flex justify-center items-center">
                    <div className='p-4 flex flex-col items-center justify-center'>
                        <label>Check In</label>
                        <input
                            className='border border-black p-2 rounded-2xl'
                            type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>

                    <div className='p-4 flex flex-col items-center justify-center border-l'>
                        <label>Check Out</label>
                        <input
                            className='border border-black p-2 rounded-2xl'
                            type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
            </div>

            <div className='my-4 py-4 px-4 border-t'>
                <label>Number of guests</label>
                <input
                    type="number"
                    min={1}
                    value={numberOfGuests}
                    onChange={ev => setNumberOfGuests(ev.target.value)} />
            </div>
            {numberOfNights > 0 && (
                <div className='my-4 py-4 px-4 border-t'>
                    <label>Your full name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />

                    <label>Phone number:</label>
                    <input
                        maxlength="10"
                        type="tel"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)} />
                </div>
            )}

            {
                user ? (
                    <button onClick={bookThisPlace} className='primary mt-4'>
                        Book this place for
                        {numberOfNights > 0 && (
                            <span> {numberOfNights * place.price} €</span>
                        )}
                    </button>
                ) : (

                    <div className='flex justify-center items-center'>
                        <a href={'/login'} className='primary text-center'>
                            Connectez vous pour pouvoir réserver
                        </a>
                    </div>

                )
            }

        </div>
    );
};

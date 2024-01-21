import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PlacesPages = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        })
    }, []);


    const cancelPlace = async (placeId) => {
        // Trouver la place correspondante
        const placeToCancel = places.find(place => place._id === placeId);
        if (!placeToCancel) {
            console.error("Place introuvable");
            return;
        }

        const confirmation = window.confirm('Etes-vous sûr de vouloir annuler la place pour ' + placeToCancel.title + ' ?');
        if (!confirmation) {
            return; // Ne pas continuer si l'utilisateur annule la confirmation
        }

        try {
            await axios.delete(`/places/${placeId}`);
            setPlaces(places.filter(place => place._id !== placeId));
            toast.success('La place a bien été supprimée');
        } catch (error) {
            console.error("Erreur lors de l'annulation de la place", error);
            // Gérer l'erreur comme vous le souhaitez
        }
    };


    return (
        <div>
            <AccountNav />

            <div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new place
                </Link>
            </div>


            <div className='mt-4 grid grid-cols-2'>
                {places.length > 0 && places.map((place, index) => (
                    <div className=' rounded-2xl flex justify-between bg-gray-200 p-6 mx-8 my-4' >
                        <Link to={'/account/places/' + place._id} className='flex cursor-pointer bg-gray-200 p-4 gap-4 mt-6 rounded-2xl' key={index}>
                            <div className='rounded-2xl  flex w-32 h-32 bg-gray-300'>
                                <PlaceImg place={place} />
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>

                        <div className='flex h-full justify-center items-center'>


                            <div className='flex flex-col justify-between h-min items-center ml-4'>
                                <button onClick={() => cancelPlace(place._id)} className='bg-red-500 text-center text-white w-full py-2 px-4 rounded-xl mb-2' >Supprimer la place</button>
                                <a href={'/account/places/' + place._id} className='bg-orange-300 text-center text-white py-2 px-4 w-full rounded-xl mt-2' >Modifier la place</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlacesPages;
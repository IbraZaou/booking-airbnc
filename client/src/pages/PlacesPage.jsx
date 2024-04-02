import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




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

        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Etes-vous sûr de vouloir annuler la place pour ' + placeToCancel.title + ' ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try {
                            await axios.delete(`/places/${placeId}`);
                            setPlaces(places.filter(place => place._id !== placeId));
                            toast.success('La place a bien été supprimée');
                        } catch (error) {
                            toast.error(error.response.data.message);
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => { }
                }
            ]
        });
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
                    <div key={index} className=' flex-col rounded-2xl flex justify-between bg-gray-200 p-6 mx-8 my-4 hover:border border-primary' >
                        <Link to={'/account/places/' + place._id} className='flex flex-col cursor-pointer bg-gray-200 p-4 gap-4 mt-6 rounded-2xl ' key={index}>
                            <h2 className='text-2xl font-semibold text-center mb-4'>{place.title}</h2>
                            <div className='rounded-2xl flex w-45 h-45 bg-gray-300'>
                                <PlaceImg place={place} />
                            </div>
                            <div>
                                <h3 className='text-center text-2xl font-semibold'>les atouts</h3>
                                <div className='grid grid-cols-4 justify-between my-5'>
                                    {place.perks && place.perks.map((perk, perkIndex) => (
                                        <div key={perkIndex} className='border my-3 border-black rounded-2xl w-3/4 p-2 text-center hover:bg-primary hover:text-white duration-300'>
                                            {perk}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='grow-0 shrink'>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>
                        <div className='flex h-full justify-center items-center'>
                            <div className='flex w-3/4 flex-col justify-between h-min items-center my-5 ml-4'>
                                <a href={'/account/places/' + place._id} className='bg-orange-300 text-center text-white py-2 px-4 w-full rounded-xl mb-2' >Modifier</a>
                                <button onClick={() => cancelPlace(place._id)} className='bg-red-500 text-center text-white w-full py-2 px-4 rounded-xl mt-2' >Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlacesPages;
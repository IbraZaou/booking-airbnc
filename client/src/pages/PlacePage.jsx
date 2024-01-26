import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import { UserContext } from '../components/UserContext';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';


const PlacePage = () => {

    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [position, setPosition] = useState(null);
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
            geocodePlace(response.data.address);
        });
    }, [id]);


    // Poser les positions avec geocodePlace grace a leaflet-geosearch
    const geocodePlace = (address) => {
        const provider = new OpenStreetMapProvider();
        provider.search({ query: address }).then(results => {
            if (results && results.length > 0) {
                const { x, y } = results[0];
                setPosition([y, x]);
            }
        });
    };

    if (!place || !position) return '';

    return (
        <div className='mt-4 bg-gray-100 px-8 pt-8'>
            <h1 className='text-2xl'>{place.title}</h1>
            <a target='_blank'
                href={'https://maps.google.com/?q=' + place.address}
                className='flex gap-1 block font-semibold underline my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>

            {/* PHOTOS */}
            <PlaceGallery place={place} />


            {/* Check / Price / Guests */}

            <div className='mt-8 mb-8 gap-8 grid grid-cols-[2fr_1fr]' >

                <div>

                    {/* Description */}

                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl' >Description</h2>
                        {place.description}
                    </div>

                    <div>
                        <h2 className='font-semibold text-2xl'>Les atouts</h2>
                        <div className='grid grid-cols-5 justify-between my-5'>
                            {place.perks && place.perks.map((perk, perkIndex) => (
                                <div key={perkIndex} className='border my-3 border-black rounded-2xl w-3/4 p-2 text-center hover:bg-primary hover:text-white duration-300'>
                                    {perk}
                                </div>

                            ))}
                        </div>
                    </div>

                    Heure d'arrivée : {place.checkIn}<br />
                    Heure de départ : {place.checkOut}<br />
                    Nombre de personnes max: {place.maxGuests}
                </div>

                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className='font-semibold text-2xl' >Info supplémentaire</h2>

                </div>
                <div className='text-sm mb-4 mt-1 leading-5'>{place.extraInfo}</div>
                <div className="maps">
                    <h2 className='font-semibold text-2xl my-3' >Endroit sur la map</h2>
                    {/* iframe dynamique pour Maps */}
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '450px', width: '100%', zIndex: '0' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>

            </div>

        </div>
    );
};

export default PlacePage;   
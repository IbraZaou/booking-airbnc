import React, { useEffect, useState } from 'react';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PlacesFormPage = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    // const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description)
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })

    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        if (id) {
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);

        } else {
            // create
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    // Verifier que tout les champs ont bien été rempli
    function isFormValid() {
        return title &&
            address &&
            addedPhotos.length >= 1 &&
            description &&
            perks &&
            extraInfo &&
            checkInTimeIsValid(checkIn) &&
            checkOutTimeIsValid(checkOut) &&
            maxGuests >= 1 &&
            maxGuests <= 10 &&
            price >= 100;
    }

    // Fonctions de validation des heures
    function checkInTimeIsValid(checkIn) {
        return checkIn >= "10:00" && checkIn <= "12:00";
    }

    function checkOutTimeIsValid(checkOut) {
        return checkOut >= "12:00" && checkOut <= "18:00";
    }

    return (
        <div className='w-1/2 mx-auto'>
            <AccountNav />
            <form onSubmit={savePlace}>
                {/* TITLE */}
                {preInput('Titre', 'le tritre de votre lieu doit être court et accrocheur')}
                <input
                    type="text"
                    placeholder="Titre, par exemple, mon superbe appartement"
                    value={title}
                    required
                    onChange={ev => setTitle(ev.target.value)} />

                {/* ADDRESS */}
                {preInput('Adresse', 'Adresse de votre lieu')}
                <input
                    type="text"
                    placeholder='Adresse'
                    value={address}
                    required
                    onChange={ev => setAddress(ev.target.value)} />

                {/* UPLOAD PICS */}
                {preInput('Photos', 'De belles photos pour donner envie !')}
                <PhotosUploader required addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {/* DESCRIPTION */}
                {preInput('Description', 'Description de votre lui soyez le plus précis possible')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {/* PERKS */}
                {preInput('Atout', 'Selectionné les atouts que vous avez dans votre lieu')}
                <div className=' mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} required onChange={setPerks} />
                </div>

                {/* EXTRA INFO */}
                {preInput('Info supplémentaire', 'Règles, horaires etc ...')}
                <textarea value={extraInfo} required onChange={ev => setExtraInfo(ev.target.value)} />

                {/* CHECK IN&OUT / MAX GUESTS */}
                {preInput("Heure d'arrivé et de départ / nombre de personne / prix par nuit", "ajoutez les heures d'arrivée et de départ, n'oubliez pas de prévoir un créneau horaire pour nettoyer la chambre entre les invités")}

                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        {preInput("Heure d'arrivée", "seulement entre 10:00 et 12:00")}
                        <input
                            type="time"
                            value={checkIn}
                            required
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                    {preInput("Heure de départ", "seulement entre 12:00 et 18:00")}
                        <input type="time"
                            value={checkOut}
                            required
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Nombre maximum de personne</h3>
                        <input
                            type="number"
                            placeholder='2'
                            value={maxGuests}
                            max={10}
                            min={1}
                            required
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Prix par nuit (€)</h3>
                        <input
                            type="number"
                            value={price}
                            min={100}
                            required
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className={`primary mt-4 ${!isFormValid() ? 'cursor-not-allowed grayscale' : ''}`} disabled={!isFormValid()}>Enregistrer</button>
            </form>
        </div>
    );
};

export default PlacesFormPage;
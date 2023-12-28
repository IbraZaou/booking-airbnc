import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../components/Perks';
import axios from 'axios';


const PlacesPages = () => {

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
          const { data: { imagePath } } = await axios.post('/upload-by-link', { link: photoLink });
          setAddedPhotos(prev => {
            return [...prev, imagePath];
          });
        } catch (error) {
          // Handle error if the request fails
          console.error('Failed to add photo:', error);
        }
        setPhotoLink('');
      }

      function uploadPhoto(ev) {
        const files = ev.target.files;
        console.log(files);
        const data = new FormData();
    
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
    
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
        .then(response => {
            const { data: filenames } = response;
            // Assuming response.data is an array of filenames
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
        .catch(error => {
            // Handle any errors from the server
            console.error('Error uploading files:', error);
        });
    }

    return (
        <div>
            {action !== 'new' && (
                            <div className='text-center'>
                            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
             Add new place
             </Link>
            </div>
            )}

            {action == 'new' && (
                <div>
                    <form>
                        {/* TITLE */}
                        {preInput('Title', 'title for your place, should be short and catchy as in advertisement')}
                        <input 
                        type="text" 
                        placeholder="title, for example : My lovely apt" 
                        value={title} 
                        onChange={ev => setTitle(ev.target.value)} />

                        {/* ADDRESS */}
                        {preInput('Address', 'Address to this place')}
                        <input 
                        type="text" 
                        placeholder='address'
                        value={address}
                        onChange={ev => setAddress(ev.target.value)} />

                        {/* UPLOAD PICS */}
                        {preInput('Photos', 'More = better')}

                        <div className='flex gap-2'>
                            <input 
                            type="text" 
                            placeholder={'Add using a link ....jpg'} 
                            value={photoLink} 
                            onChange={ev => setPhotoLink(ev.target.value)}/>
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl' >Add&nbsp;photo</button>
                        </div>


                        <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div key={index}>
                                    <img className='rounded-2xl' src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                        <label className='cursor-pointer flex gap-1 items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>
<input 
type="file" 
className='hidden'
multiple
onChange={uploadPhoto} />

 Upload</label>
                        </div>
                     
                        {/* DESCRIPTION */}
                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                        {/* PERKS */}
                        {preInput('Perks', 'Select all the perks you have')}
                        <div className=' mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks} />
                        </div>

                        {/* EXTRA INFO */}
                        {preInput('Extra Info', 'house rules, etc ...')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {/* CHECK IN&OUT / MAX GUESTS */}
                        {preInput('Check in & Out times, max guests', 'add check in and ou times, remember to have some time window for cleaning the room between guests')}

                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input 
                                type="text" 
                                placeholder='14:00' 
                                value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check out time</h3>
                                <input type="text" 
                                placeholder='19:00'
                                value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)} />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                <input 
                                type="number"
                                placeholder='2'
                                value={maxGuests}
                                onChange={ev => setMaxGuests(ev.target.value)} />
                            </div>
                        </div>
                            <button className='primary m-y-4'>Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PlacesPages;
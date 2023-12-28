import React, { useState } from 'react';
import axios from 'axios';


const PhotosUploader = () => {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');


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
        <>
        
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
                                <div className='h-64 flex' key={index}>
                                    <img className=' w-full object-cover  rounded-2xl' src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                        <label className='h-64 cursor-pointer flex gap-1 items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>
<input 
type="file" 
className='hidden'
multiple
onChange={uploadPhoto} />

 Upload</label>
                        </div>

        </>
    );
};

export default PhotosUploader;          
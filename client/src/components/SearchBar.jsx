import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [places, setPlaces] = useState([]);
    const [searchResults, setSearchResults] = useState([]);


    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        // Filter places based on the search term in both title and address
        const filteredPlaces = places.filter((place) =>
            place.title.toLowerCase().includes(term.toLowerCase()) ||
            place.address.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredPlaces);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            {/* Search Bar */}
            <div className='flex gap-2 border m-auto border-gray-300 px-4 py-2 rounded-2xl w-2/4 shadow-md shadow-gray-300 relative bottom-9 bg-white'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} // Changed from onPress to onKeyPress
                    className='flex-grow p-2 rounded-full'
                    placeholder='Rechercher un endroit...'
                />
            </div>

            <h1 className=' px-12 text-4xl font-bold'>Les hébergements</h1>
            <p className='px-12'>Découvrez les appartements et maisons juste ici</p>

            {/* Places Grid or "Nothing found" message */}
            <div className='mt-4 grid h-screen p-12 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {(searchTerm ? searchResults : places).length > 0 ? (
                    (searchTerm ? searchResults : places).map((place) => (
                        <Link to={'/place/' + place._id} key={place._id}>
                            <div className='bg-gray-500 rounded-2xl'>
                                {place.photos?.[0] && (
                                    <img className='rounded-2xl object-cover h-80 w-full aspect-square' src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt='' />
                                )}
                            </div>
                            <h2 className='text-sm truncate leading-4'>{place.title}</h2>
                            <h3 className='font-bold leading-4'>{place.address}</h3>
                            <div className='mt-2'>
                                <span className='font-bold'>{place.price}€</span> per night
                            </div>
                        </Link>

                    ))
                ) : (
                    <div className="w-screen flex flex-col justify-center items-center">
                        <p className='text-center text-4xl mb-4'>Aucun appartement trouvé...</p>

                        < a href={'/'} className='primary text-center ' > Go back to home</a >

                    </div>

                )}
            </div>
        </div>
    );
};

export default SearchBar;
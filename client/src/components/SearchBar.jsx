import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";

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
            <div className='grid h-screen my-24 p-12 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {(searchTerm ? searchResults : places).length > 0 ? (
                    (searchTerm ? searchResults : places).map((place) => (
                        <Card className="w-full max-w-[26rem] shadow-lg">
                            <CardHeader floated={false} color="blue-gray">
                                {place.photos?.[0] && (
                                    <img
                                        src={'http://localhost:4000/uploads/' + place.photos?.[0]}
                                    />
                                )}
                                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                                <IconButton
                                    size="sm"
                                    color="red"
                                    variant="text"
                                    className="!absolute top-4 right-4 rounded-full"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </IconButton>
                            </CardHeader>
                            <CardBody>
                                <div className="mb-3 flex items-center justify-between">
                                    <Typography variant="h5" color="blue-gray" className="font-medium">
                                        {place.title} / <span className='font-bold'>{place.price}€</span> per night
                                    </Typography>

                                </div>
                                <br />
                                <Typography variant="h5" color="blue-gray" className="font-medium">
                                    {place.address}
                                </Typography>

                            </CardBody>
                            <CardFooter className="pt-3 ">
                                <Link to={'/place/' + place._id} key={place._id} className='primary'>
                                    Réserver
                                </Link>
                            </CardFooter>
                        </Card>

                    ))
                ) : (
                    <div className="w-screen flex flex-col justify-center items-center">
                        <p className='text-center text-4xl mb-4'>Aucun appartement trouvé...</p>

                        < a href={'/'} className='primary text-center ' > Go back to home</a >

                    </div>

                )}
            </div>






        </div >
    );
};

export default SearchBar;
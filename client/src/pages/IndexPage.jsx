import axios from 'axios';
import React, { useEffect, useState } from 'react';

const IndexPage = () => {


    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places').then(response => {
            response.data
        })
    }, [])

    return (
        <div>
            {places.length > 0 && places.map(place => (
                <div>
                    {place.title}
                </div>
            ))}
        </div >
    );
};

export default IndexPage;
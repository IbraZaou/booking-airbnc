import React from 'react';
import { useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';

const BookingPage = () => {

    const { id } = useParams();

    return (
        <div>
            <AccountNav />
            <div>booking number : {id}</div>
        </div>
    );
};

export default BookingPage;
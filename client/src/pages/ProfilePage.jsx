import React, { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import PlacesPages from './PlacesPage';
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {

    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);



    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }


    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');

    }


    if (!ready) {
        return 'Loading...';
    }


    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>

            <AccountNav />

            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className='primary max-w-sm mt-2' >Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPages />
            )}

        </div>
    );
};

export default ProfilePage;
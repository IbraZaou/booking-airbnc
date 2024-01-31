import React, { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import PlacesPages from './PlacesPage';
import AccountNav from '../components/AccountNav';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {

    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);



    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function deleteAccount() {
        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'êtes vous sûr de vouloir supprimer votre compte, cette action est irréversible',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        try {
                            await axios.delete('/delete-account');
                            setUser(null);
                            setRedirect('/');
                            toast.success('Votre compte a bien été supprimé');
                        } catch (err) {
                            toast.error('Une erreur est survenue');
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () => { }
                }
            ]
        });
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

                    <input className='cursor-not-allowed' type="text"
                        disabled
                        placeholder={user.name}
                    />

                    <input className='cursor-not-allowed' type="text" disabled
                        placeholder={user.email} />


                    <div className='flex flex-col justify-center items-center mt-24 mb-24'>
                        <button onClick={logout} className='primary max-w-sm mt-2' >Logout</button>
                        <Link to={'/reset-password'} className='w-96 mt-2 py-2 px-4 rounded-2xl text-white text-center bg-primary'>Changer votre mot de passe</Link>
                        <button onClick={deleteAccount} className='bg-red-500 mt-2 text-white rounded-2xl w-96 py-2 px-4'>Supprimer votre compte</button>
                    </div>

                </div>
            )}

            {subpage === 'places' && (
                <PlacesPages />
            )}

        </div>
    );
};

export default ProfilePage;
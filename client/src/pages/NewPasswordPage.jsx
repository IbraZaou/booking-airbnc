import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Importer Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const { id, token } = useParams(); // Récupérer id et token de l'URL
    const [inputType, setInputType] = useState('password');

    const handleMouseEnter = () => {
        setInputType('text');
    };

    const handleMouseLeave = () => {
        setInputType('password');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const CustomToastWithLink = () => (
            <div>
                <Link to="/login">Votre mot de passe a bien été modifié, cliquez ici pour vous connectez</Link>
            </div>
        );

        try {
            // Effectuer une requête POST avec Axios
            const response = await axios.post(`/new-password/${id}/${token}`, { newPassword });
            console.log(response);
            toast.success(CustomToastWithLink);
            // Rediriger l'utilisateur ou afficher un message de succès
        } catch (error) {
            toast.error('Le mot de passe doit contenir au moins 5 caractères, dont une majuscule, un chiffre et un caractère spécial.');
            // Gérer les erreurs ici
        }
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <ToastContainer />
                <h1 className='text-4xl text-center mb-4'>Réinitialiser votre mot de passe</h1>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    <div className='flex justify-center items-center'>
                        <input
                            type={inputType}
                            placeholder='mot de passe'
                            value={newPassword}
                            autocomplete='off'
                            onChange={ev => setNewPassword(ev.target.value)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="lightgray" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>

                    <div className='text-xs text-gray-500 my-2'>
                        Le mot de passe doit contenir au moins 5 caractères, dont une majuscule, un chiffre et un caractère spécial.
                    </div>

                    <button type='submit' className='primary'>Réinitialiser</button>
                    <div className='bg-primary mt-2 text-center p-2 w-full text-white rounded-2xl'>
                        <a href={'/login'} className='text-center'>Connexion</a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;

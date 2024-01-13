import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Importer Axios

const NewPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const { id, token } = useParams(); // Récupérer id et token de l'URL

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Préparer l'URL et les données pour la requête
        const url = `http://localhost:4000/new-password/${id}/${token}`;
        const data = { newPassword };

        try {
            // Effectuer une requête POST avec Axios
            const response = await axios.post(url, data);

            console.log('Password reset successfully:', response.data);
            // Rediriger l'utilisateur ou afficher un message de succès
        } catch (error) {
            console.error('Error resetting password:', error.response ? error.response.data : error);
            // Gérer les erreurs ici
        }
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Reset your password</h1>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder='New Password'
                        value={newPassword}
                        onChange={ev => setNewPassword(ev.target.value)}
                    />

                    <button type='submit' className='primary'>Reset</button>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;

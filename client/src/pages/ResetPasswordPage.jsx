import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState(''); // Ajout d'un état pour les messages
    const { user, setUser } = useContext(UserContext);

    const handleResetPassSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoie de la demande de réinitialisation du mot de passe
            const response = await axios.post('http://localhost:4000/forgot-password', { email });
            toast.success("Email envoyé, n'oublié pas de vérifier vos spams");
            // Message de succès
            // Autres actions en cas de succès (par exemple, redirection ou mise à jour de l'état)
        } catch (error) {
            setMessage('An error occurred. Please try again later.'); // Message d'erreur
            toast.error('Un problème est survenu');

        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <ToastContainer />

                <h1 className='text-4xl text-center mb-4'>Réinitialisation du mot de passe</h1>
                <form className='max-w-md mx-auto' onSubmit={handleResetPassSubmit}>
                    <input
                        type="email"
                        placeholder='votre@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <button className='primary'>Envoyer</button>
                    {message && <p className='text-center py-2 text-gray-500'>{message}</p>}
                    <p className='text-center py-2 text-gray-500'>Vous n'avez pas encore de compte?
                        <br />
                        <Link className='underline text-black' to={'/register'}> Inscrivez-vous maintenant !</Link>
                    </p>

                </form>
            </div>
        </div >
    );
};

export default ResetPasswordPage;

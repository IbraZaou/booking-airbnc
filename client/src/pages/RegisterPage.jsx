import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [inputType, setInputType] = useState('password');

    const handleMouseEnter = () => {
        setInputType('text');
    };

    const CustomToastLink = () => (
        <div>
            <Link to="/login">Vous êtes bien inscrit cliquez ici pour vous connectez</Link>
        </div>
    );

    const handleMouseLeave = () => {
        setInputType('password');
    };

    async function registerUser(ev) {
        ev.preventDefault();

        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            toast.success(CustomToastLink);
        } catch (err) {
            toast.error('Votre mot de passe doit contenir au moins 5 caractères, dont une majuscule, un chiffre et un caractère spécial.');
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <ToastContainer />
                <h1 className='text-4xl text-center mb-4'>Registration</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        type="text"
                        required
                        placeholder='John Doe' />
                    <input
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        type="email"
                        placeholder='your@email.com'
                        required
                        autoComplete='off' />

                    <div className='flex justify-center items-center'>
                        <input
                            type={inputType}
                            placeholder='password'
                            value={password}
                            required
                            onChange={ev => setPassword(ev.target.value)}
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

                    <button className='primary'>Register</button>
                    <p className='text-center py-2 text-gray-500'>Already have an account?
                        <Link className='underline text-black' to={'/login'}> Login</Link>
                    </p>
                </form>
            </div>
        </div >
    );
};

export default RegisterPage;
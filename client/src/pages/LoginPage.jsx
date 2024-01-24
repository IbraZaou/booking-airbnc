import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import GOOGLE from '../assets/google.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [inputType, setInputType] = useState('password');

    const handleMouseEnter = () => {
        setInputType('text');
    };

    const handleMouseLeave = () => {
        setInputType('password');
    };

    const CustomToastLink = () => (
        <div>
            <Link to="/">Voir les différents appartements ?</Link>
        </div>
    );



    async function handleLoginSubmit(ev) {
        ev.preventDefault();

        try {
            const response = await axios.post('/login', { email, password });
            setUser(response.data);
            toast.success('Vous êtes bien connecté :)');
            toast.info(CustomToastLink);
            // setRedirect(true);
        } catch (err) {
            toast.error('Email ou mot de passe incorrect');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    function handleGoogleLogin() {
        window.location.href = 'http://localhost:4000/auth/google';
    }

    return (

        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <ToastContainer />

                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <div className='flex justify-center items-center'>
                        <input
                            type={inputType}
                            placeholder='password'
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="lightgray" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                        </svg>
                    </div>



                    <button className='primary'>Login</button>
                    <button
                        className='flex py-2 bg-white border border-black rounded-2xl my-2 items-center w-full justify-center' onClick={handleGoogleLogin}>
                        <img className='w-6 mx-2' src={GOOGLE} alt="" />
                        Login with Google
                    </button>
                    <p className='text-center py-2 text-gray-500'>Don't have an account yet?
                        <Link className='underline text-black mx-1' to={'/register'}>Register now</Link>
                    </p>

                    <p className='text-center py-2 text-gray-500'>Maybe your forgot your password?
                        <Link className='underline text-black mx-1' to={'/reset-password'}>Reset it</Link>
                    </p>

                </form>
            </div>
        </div >
    );
};

export default LoginPage;
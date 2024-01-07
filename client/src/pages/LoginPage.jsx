import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import GOOGLE from '../assets/google.png';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { user, setUser } = useContext(UserContext);


    async function handleLoginSubmit(ev) {
        ev.preventDefault();

        try {
            const response = await axios.post('/login', { email, password });
            setUser(response.data);
            alert('Login successful');
            setRedirect(true);
        } catch (err) {
            alert('Login failed')
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
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className='primary'>Login</button>
                    <button
                        className='flex py-2 bg-white border border-black rounded-2xl my-2 items-center w-full justify-center' onClick={handleGoogleLogin}>
                        <img className='w-6 mx-2' src={GOOGLE} alt="" />
                        Login with Google
                    </button>
                    <p className='text-center py-2 text-gray-500'>Don't have an account yet?
                        <Link className='underline text-black' to={'/register'}> Register now</Link>
                    </p>

                </form>
            </div>
        </div >
    );
};

export default LoginPage;
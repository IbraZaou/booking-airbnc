import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();

        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert('Registration successful. Now you can log in')
        } catch (err) {
            alert('Registration failed. Please try again later')
        }

    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Registration</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        type="text"
                        placeholder='John Doe' />

                    <input
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        type="email"
                        placeholder='your@email.com'
                        autoComplete='off' />

                    <input
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} type="password"
                        placeholder='password'
                        autoComplete='off' />

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
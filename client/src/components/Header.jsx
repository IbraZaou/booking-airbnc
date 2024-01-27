import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';


const Header = () => {

    const { user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    return (
        <div>
            <header className='flex justify-between p-4'>

                <Link to={user ? '/account' : '/login'} className="flex flex-col justify-center items-center gap-2 border border-gray-300 p-6 rounded-2xl">


                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                    <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>

                    </div>
                </Link>



                <Link to={'/'} className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold text-xl'>Airbnc</span>
                </Link>



                <div className='flex flex-col'>
                    {!user ? (
                        <>
                            <Link to={'/login'} className='border border-primary py-2 px-4 rounded-2xl text-center text-primary mb-2'>Se connecter</Link>
                            <Link to={'/register'} className='bg-primary py-2 rounded-2xl text-white text-center px-4'>S'inscrire</Link>
                        </>
                    ) : (
                        <div>
                            <button onClick={logout} className='bg-primary py-2 rounded-2xl text-white text-center px-4'>Logout</button>
                        </div>
                    )}
                </div>

            </header >
        </div>
    );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className='w-full p-8 mt-2 h-48 bg-gray-200'>
            <div className="w-9/12 m-auto">
                <div className='flex justify-between'>

                    <Link to={'/'} className="flex items-start gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        <div className='flex flex-col'>
                            <span className='font-bold text-xl'>Airbnc</span>
                            <span>HumanBooster</span>
                        </div>
                    </Link>

                    <div>
                        <ul className='flex flex-col'>
                            <Link to={'/about'}>About</Link>
                            <Link to={'/Contact'}>Contact</Link>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li>Condition général de vente</li>
                            <li>Plan du site</li>
                        </ul>
                    </div>

                </div>
                <div className='text-center mt-8'>
                    &copy; {currentYear} Airbnc. All rights reserved.
                </div>
            </div>

        </div>
    );
};

export default Footer;
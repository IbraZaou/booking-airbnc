import React from 'react';
import TEL from '../assets/img/tel.png';
import ILLU from '../assets/img/illu.jpg';

const SecondHeroSection = () => {
    return (
        <div>
            <div className='relative rounded-l-full bg-gradient flex items-center h-96 ml-96 mb-64'>
                <img src={TEL} alt="Téléphone" className="w-96 -rotate-[17deg] absoluten border border-transparent" />
                <div className='ml-auto p-12 text-left'>
                    <h3 className='text-bold text-white text-4xl mb-4'> Profitez des avantages de AMA (Airbnc Management App)</h3>
                    <p className='text-bold text-white text-2xl w-5/6'>Téléchargez l'application pour suivre vos réservations, connectez-vous en un clique et gérez rapidement vos réservations</p>
                </div>
            </div>

            <div className='relative rounded-r-full bg-gradient flex items-center h-96 mr-96 mb-64 border border-transparent'>
                <div className='mr-auto p-12 text-left'>
                    <h3 className='text-bold text-white text-4xl mb-4 w-4/5 sm:3/5'> Vous êtes propriétaire d'une maison ou un appartement?</h3>
                    <p className='text-bold text-white text-2xl w-3/5'>Gagner un revenu supplémentaire en partageant votre espace</p>
                </div>
                <img src={ILLU} alt="Téléphone" className="w-4/12 right-0 rotate-[17deg] absolute border-8 border-white shadow-2xl" />
            </div>
        </div>
    );
};

export default SecondHeroSection;
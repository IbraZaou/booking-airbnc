import React from 'react';

const SuccessPaymentPage = () => {

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="flex-col flex items-center justify-around h-96 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-24 h-24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <h1 className='text-center font-bold text-6xl '>Votre réservation c'est bien effectuée</h1>

                <h3 className='text-2xl' >
                    Vérifiez votre e-mail pour trouver votre confirmation de commande</h3>

                < a href={'/'} className='primary text-center' >Retourner a l'accueil</a >
            </div>
        </div >
    );
};

export default SuccessPaymentPage;
import React from 'react';
import IMG from '../assets/img/bg_img.png'

const HeroSection = () => {
    return (
        <div>

            <div className="relative">
                <img src={IMG} alt="Description de l'image" className="w-full brightness-50" />
                <p className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold px-10">
                    Les meilleurs offres d'hébergement partout dans le monde
                </p>
            </div>

            <div className='bg-gradient py-20'>
                <div className='py-20'>
                    <h2 className='text-white text-center text-6xl mb-2 font-bold'>Pourquoi réserver sur Airbnc</h2>
                    <p className='text-white text-center text-2xl'>Réserver un appartement ou une maison n'aura jamais été aussi simple avec Airbnc</p>
                </div>

                <div className='flex justify-around w-4/6 mx-auto my-24'>
                    <div className=' text-white w-1/4 flex flex-col justify-center items-center text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='my-4 w-12 h-12' viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>

                        <p className='my-4 text-center text-3xl'>Disponibilité et confirmation immédiate</p>
                        <p className='text-center'>Trouvez des appartements disponibles à la date recherchée et réservez en 3 clics avec confirmation immédiate</p>
                    </div>

                    <div className='text-white w-1/4 flex flex-col justify-center items-center text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='my-4 w-12 h-12' viewBox="0 0 576 512"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" /></svg>

                        <p className='my-4 text-center text-3xl'>Meilleurs Tarifs Garantis</p>
                        <p className='text-center'>Airbnc vous garantit que les tarifs proposés par nos plages partenaires sont dans tous les cas inférieurs ou égaux à ceux pratiqués sur la place</p>
                    </div>

                    <div className='text-white w-1/4 flex flex-col justify-center items-center text-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='my-4 w-12 h-12' viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM305 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z" /></svg>

                        <p className='my-4 text-center text-3xl'>Annulation en 1 clique</p>
                        <p className='text-center'>Toutes les réservations effectuées sur Airbnc sont annulables en clique, les réservations annulées seront remboursées intégralement</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
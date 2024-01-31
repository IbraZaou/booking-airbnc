import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';


const fakeReviews = [
    { id: 1, name: "Alice Smith", review: "L'application est très facile à utiliser et l'hébergement est fiable." },
    { id: 2, name: "Bob Johnson", review: "Excellent service client, ils ont rapidement résolu mon problème." },
    { id: 3, name: "Charlie Brown", review: "Très satisfait de la vitesse et de la stabilité de l'hébergement." },
    { id: 4, name: "Diana Prince", review: "Interface intuitive et performances solides, je recommande !" },
    { id: 5, name: "Edward King", review: "Bon rapport qualité-prix, l'hébergement répond à mes attentes." },
    { id: 6, name: "Fiona Green", review: "Impressionnée par la sécurité et la disponibilité du service." },
    { id: 7, name: "George White", review: "Facile à configurer, et l'assistance est toujours disponible." },
    { id: 8, name: "Hannah Young", review: "Excellente performance pour mon site e-commerce, très satisfait." },
    { id: 9, name: "Ian Scott", review: "L'application manque de certaines fonctionnalités, mais reste bonne." },
    { id: 10, name: "Julie King", review: "Support réactif et hébergement fiable, je recommande sans hésiter." }
];

const ReviewClient = () => {
    return (
        <div className='bg-gradient h-auto py-20'>
            <h2 className='text-white text-4xl font-bold mx-20 mb-10'>Ce que disent nos clients</h2>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode, Pagination]}
                className="mySwiper mx-20"
            >
                {fakeReviews.map(review => (
                    <SwiperSlide className='bg-white rounded-2xl flex flex-col justify-between h-52 p-10' key={review.id}>
                        <p>{review.review}</p>

                        <div className='flex justify-start items-center'>
                            <img className='rounded-full w-10 mr-4' src="https://randomuser.me/api/portraits/women/2.jpg" alt="" />
                            <strong>{review.name}</strong>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewClient;

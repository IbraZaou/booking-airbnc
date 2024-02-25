import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import SecondHeroSection from '../components/SecondHeroSection';
import ReviewClient from '../components/ReviewClient';

const IndexPage = () => {
    return (
        <div>
            <HeroSection />
            <SearchBar />
            <SecondHeroSection />
            <ReviewClient />
        </div>
    );
};

export default IndexPage;

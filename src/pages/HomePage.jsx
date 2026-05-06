import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import ThemeSelector from '../components/ThemeSelector';

import Testimonial from '../components/Testimonial';
import Partners from '../components/Partners';
import News from '../components/News';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ThemeSelector />
            <Banner />
            <Partners />
            <News />
            <Testimonial />
        </>
    );
};

export default HomePage;

import React from 'react';
import AboutSection from './AboutSection/AboutSection';
import ImageSection from './ImageSection/ImageSection';
import MainSection from './MainSection/MainSection';
import TariffSection from './TariffSection/TariffSection';

function Home() {
    return (
        <>
            <MainSection />
            <AboutSection />
            <ImageSection />
            <TariffSection />
        </>
    );
}

export default Home;

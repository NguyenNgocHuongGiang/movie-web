import React, { useEffect } from 'react';
import Header from './../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './../../components/Footer/Footer';

interface HomeTemplateProps {
    Component: React.ComponentType; 
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ Component }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default HomeTemplate
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />

            <main style={{ height: 'auto' }}>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Layout;

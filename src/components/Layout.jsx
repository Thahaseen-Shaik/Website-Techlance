import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

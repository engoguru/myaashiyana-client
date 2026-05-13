import React from 'react';
import Navbar from  "../header/Navbar"
import { Outlet } from 'react-router-dom';
import Footer from '../header/Footer';


const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    )
}

export default Layout
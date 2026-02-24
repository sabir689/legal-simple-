import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Banner from '../pages/home/Banner';

const RootLayOut = () => {
    return (
        <div>
            <Banner></Banner>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayOut;
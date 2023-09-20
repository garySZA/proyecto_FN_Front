import React from 'react';
import { Navbar } from '../components';
import { navbarItemsMedic } from '../helpers/navbar-items';
import { Home } from '../views/Medic/Home';

export const MedicRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsMedic }/>
            <Home />
        </>
    )
}

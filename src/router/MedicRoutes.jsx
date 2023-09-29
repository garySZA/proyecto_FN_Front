import React, { useContext } from 'react';
import { Navbar } from '../components';
import { navbarItemsMedic } from '../helpers/navbar-items';
import { Home } from '../views/Medic/Home';
import { AuthContext } from '../context/AuthContext';

export const MedicRoutes = () => {
    const { logout } = useContext(AuthContext);
    
    const sesionUserOptions = [
        {
            label: 'Cerrar sesión',
            route: '/login',
            action: logout
        }
    ]
    
    return (
        <>
            <Navbar items={ navbarItemsMedic } sesionUserOptions={ sesionUserOptions }/>
            <Home />
        </>
    )
}

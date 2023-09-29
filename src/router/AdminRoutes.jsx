import React, { useContext } from 'react';

import { Navbar } from '../components/Navbar';
import { navbarItemsAdmin } from '../helpers/navbar-items';
import { Home } from '../views/Admin/Home';
import { AuthContext } from '../context/AuthContext';

export const AdminRoutes = () => {    
    const { logout } = useContext( AuthContext );
    
    const sesionUserOptions = [
        {
            label: 'Cerrar sesión',
            route: '/login',
            action: logout
        }
    ]

    return (
        <>
            <Navbar items={ navbarItemsAdmin } sesionUserOptions={ sesionUserOptions }/>
            <Home />
        </>
    )
}

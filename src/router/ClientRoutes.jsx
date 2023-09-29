import React, { useContext } from 'react'

import { Navbar } from '../components'
import { navbarItemsClient } from '../helpers/navbar-items'
import { Home } from '../views/Clients/Home'
import { AuthContext } from '../context/AuthContext'

export const ClientRoutes = () => {
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
            <Navbar items={ navbarItemsClient } sesionUserOptions={ sesionUserOptions }/>
            <Home />
        </>
    )
}

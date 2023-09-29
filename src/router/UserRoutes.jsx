import React, { useContext } from 'react'

import { Navbar } from '../components'
import { navbarItemsUser } from '../helpers/navbar-items'
import { Home } from '../views/Users/Home'
import { AuthContext } from '../context/AuthContext'

export const UserRoutes = () => {
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
            <Navbar items={ navbarItemsUser } sesionUserOptions={ sesionUserOptions }/>
            <Home />
        </>
    )
}

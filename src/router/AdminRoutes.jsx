import React from 'react'

import { Navbar } from '../components/Navbar'
import { navbarItemsAdmin } from '../helpers/navbar-items'
import { Home } from '../views/Admin/Home'

export const AdminRoutes = () => {    
    return (
        <>
            <Navbar items={ navbarItemsAdmin }/>
            <Home />
        </>
    )
}

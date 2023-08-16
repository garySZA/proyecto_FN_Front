import React from 'react'

import { Navbar } from '../components'
import { navbarItemsUser } from '../helpers/navbar-items'
import { Home } from '../views/Users/Home'

export const UserRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsUser }/>
            <Home />
        </>
    )
}

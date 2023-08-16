import React from 'react'

import { Navbar } from '../components'
import { navbarItemsClient } from '../helpers/navbar-items'
import { Home } from '../views/Clients/Home'

export const ClientRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsClient }/>
            <Home />
        </>
    )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components'
import { navbarItemsClient } from '../helpers/navbar-items'
import { Clients } from '../views/clients/Clients'

export const ClientRoutes = () => {
    return (
        <>

            <Navbar items={ navbarItemsClient }/>

            <Routes>
                <Route path='/' element={ <Clients /> }/>
            </Routes>
        </>
    )
}

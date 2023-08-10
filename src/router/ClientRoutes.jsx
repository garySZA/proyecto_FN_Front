import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Navbar } from '../components'
import { navbarItemsClient } from '../helpers/navbar-items'
import { Clients } from '../views/Clients/Clients'
import { StateContext } from '../context/stateProvider'
import { Home } from '../views/Clients/Home'

export const ClientRoutes = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            <Navbar items={ navbarItemsClient }/>
            <Home />
        </>
    )
}

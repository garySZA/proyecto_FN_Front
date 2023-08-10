import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Navbar } from '../components'
import { navbarItemsUser } from '../helpers/navbar-items'
import { User } from '../views/Users/User'
import { StateContext } from '../context/stateProvider'
import { Home } from '../views/Users/Home'

export const UserRoutes = () => {
    const { state } = useContext( StateContext );

    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            <Navbar items={ navbarItemsUser }/>
            <Home />
        </>
    )
}

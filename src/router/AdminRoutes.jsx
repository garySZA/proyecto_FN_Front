import React, { useContext } from 'react'

import { Navbar } from '../components/Navbar'
import { navbarItemsAdmin } from '../helpers/navbar-items'
import { Home } from '../views/Admin/Home'
import { StateContext } from '../context/stateProvider'
import LoaderScreen from '../components/Loader/LoaderScreen'
import { ModalGeneric } from '../components/Modal/Modal'

export const AdminRoutes = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            <Navbar items={ navbarItemsAdmin }/>
            <Home />
        </>
    )
}

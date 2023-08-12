import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Navbar } from '../components'
import { FooterHome } from '../components/FooterHome'
import { navbarItemsHome } from '../helpers/navbar-items'
import { About } from '../views/publicAccess/About'
import { Home } from '../views/publicAccess/Home'
import { PageNotFound } from '../views/publicAccess/PageNotFound'
import { StateContext } from '../context/stateProvider'
import LoaderScreen from '../components/Loader/LoaderScreen'
import { ModalGeneric } from '../components/Modal/Modal'

export const PublicRoutes = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            <Navbar items={ navbarItemsHome } isPublic={ true } />

            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/about' element={ <About/> }/>
                <Route path="*" element={ <PageNotFound /> }/>
            </Routes>

            <FooterHome />
        </>
    )
}

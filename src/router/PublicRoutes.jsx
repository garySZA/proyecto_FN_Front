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
    
    const sesionUserOptions = [
        {
            label: 'Crear cuenta',
            route: '/new_account',
        },
        {
            label: 'Iniciar sesión',
            route: '/login',
        }
    ]

    return (
        <>
            <Navbar items={ navbarItemsHome } isPublic={ true } sesionUserOptions={ sesionUserOptions }/>

            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/about' element={ <About/> }/>
                <Route path="*" element={ <PageNotFound /> }/>
            </Routes>

            <FooterHome />
        </>
    )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components'
import { navbarItemsHome } from '../helpers/navbar-items'
import { About } from '../views/publicAccess/About'
import { Home } from '../views/publicAccess/Home'
import { PageNotFound } from '../views/publicAccess/PageNotFound'

export const PublicRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsHome } isPublic={ true } />

            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/about' element={ <About/> }/>
                <Route path="*" element={ <PageNotFound /> }/>
            </Routes>
        </>
    )
}

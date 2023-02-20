import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components'
import { navbarItemsUser } from '../helpers/navbar-items'
import { User } from '../views/Users/User'

export const UserRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsUser }/>

            <Routes>
                <Route path='/' element={ <User /> }/>
            </Routes>
        </>
    )
}

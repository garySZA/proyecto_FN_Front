import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { navbarItemsAdmin } from '../helpers/navbar-items'
import { Clients } from '../views/Admin/clients/Clients'
import { Profile } from '../views/Admin/profile/Profile'
import { Users } from '../views/Admin/users/Users'

export const AdminRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsAdmin }/>

            <Routes>
                <Route path="clients" element={ <Clients /> }/>
                <Route path="profile" element={ <Profile /> }/>
                <Route path='users' element={ <Users /> } />
            </Routes>
        </>
    )
}

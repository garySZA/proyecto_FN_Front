import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { navbarItemsAdmin } from '../helpers/navbar-items'
import { Home } from '../views/Admin/Home'
import { Profile } from '../views/Admin/profile/Profile'
import { Users } from '../views/Admin/users/Users'
import { Clients } from '../views/clients/Clients'

export const AdminRoutes = () => {
    return (
        <>
            <Navbar items={ navbarItemsAdmin }/>
            <Home />
        </>
    )
}

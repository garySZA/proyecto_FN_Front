import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Menu } from '../../components/Menu/Menu'
import { Clients } from './clients/Clients'
import { Profile } from './profile/Profile'
import { Users } from './users/Users'

export const Home = () => {
    return (
        <>
            <div className='d-flex'>
                <Menu />
                <div className='container'>
                    <div className="row">
                        <div className="col">
                        <Routes>
                            <Route path="clients" element={ <Clients /> }/>
                            <Route path="profile" element={ <Profile /> }/>
                            <Route path='users' element={ <Users /> } />
                        </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Menu } from '../../components/Menu/Menu'
import { Clients } from './clients/Clients'
import { Users } from './users/Users'
import { Accounts } from './Accounts/Accounts'
import { EditAccount } from './Accounts/EditAccount'
import { menuItemsAdmin } from '../../helpers/menu-items'
import { CreateAccount } from './Accounts/CreateAccount'
import { Contacts } from './Contacts/Contacts'
import { Stadistics } from './stadistics/Stadistics'
import { Medics } from './Medics/Medics'
import { ResetPWD } from './Profile/ResetPWD'
import { Profile } from './profile/Profile'

export const Home = () => {
    return (
        <>
            <div className='d-flex mx-3 mx-sm-0'>
                <Menu menuItems={ menuItemsAdmin }/>
                <div className='container'>
                    <div className="row">
                        <div className="col">
                        <Routes>
                            <Route path="accounts" element={ <Accounts /> }/>
                            <Route path="accounts/create_account" element={ <CreateAccount /> }/>
                            <Route path="accounts/:id" element={ <EditAccount /> }/>
                            <Route path="clients" element={ <Clients /> }/>
                            <Route path="contacts" element={ <Contacts /> }/>
                            <Route path="medics" element={ <Medics /> }/>
                            <Route path="profile" element={ <Profile /> }/>
                            <Route path='profile/change_pass' element={ <ResetPWD /> }/>
                            <Route path="stadistics" element={ <Stadistics /> }/>
                            <Route path='users' element={ <Users /> } />
                        </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

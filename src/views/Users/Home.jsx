import React from 'react'

import { Menu } from '../../components/Menu/Menu'
import { menuItemsUser } from '../../helpers/menu-items'
import { Route, Routes } from 'react-router-dom'
import { Profile } from './Profile/Profile'
import { Clients } from './Clients/Clients'
import { ResetPWD } from './Profile/ResetPWD'
import { HistoryClient } from './Clients/History/HistoryClient'


export const Home = () => {
    return (
        <>
        <div className="d-flex mx-3 mx-sm-0">
            <Menu menuItems={ menuItemsUser }/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Routes>
                            <Route path='clients' element={ <Clients /> }/>
                            <Route path='clients/:idClient' element={ <HistoryClient /> }/>
                            <Route path='profile' element={ <Profile /> }/>
                            <Route path='profile/change_pass' element={ <ResetPWD /> }/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

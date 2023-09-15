import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Menu } from '../../components/Menu/Menu'
import { Profile } from './Profile/Profile'
import { Content } from './Content/Content'
import { menuItemsClient } from '../../helpers/menu-items'
import { ResetPWD } from './Profile/ResetPWD'
import { Item } from '../Users/Clients/History/Item'

export const Home = () => {
    return (
        <>
            <div className="d-flex mx-3 mx-sm-0">
                <Menu menuItems={ menuItemsClient }/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Routes>
                                <Route path='home' element={ <Content /> }/>
                                <Route path='home/item/:idItem' element={ <Item /> }/>
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

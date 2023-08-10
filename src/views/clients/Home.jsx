import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Menu } from '../../components/Menu/Menu'
import { Profile } from './Profile/Profile'
import { Content } from './Content/Content'
import { menuItemsClient } from '../../helpers/menu-items'

export const Home = () => {
    return (
        <>
            <div className="d-flex">
                <Menu menuItems={ menuItemsClient }/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Routes>
                                <Route path='/' element={ <Content /> }/>
                                <Route path='profile' element={ <Profile /> }/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

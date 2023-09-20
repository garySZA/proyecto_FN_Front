import React from 'react'
import { Menu } from '../../components/Menu/Menu'
import { menuItemsMedic } from '../../helpers/menu-items'
import { Route, Routes } from 'react-router-dom'
import { Patients } from './Patients/Patients'
import { Profile } from './Profile'
import { Item } from '../Users/Clients/History/Item'

export const Home = () => {
    return (
        <>
            <div className='d-flex mx-3 mx-sm-0'>
                <Menu menuItems={ menuItemsMedic }/>
                <div className='container'>
                    <div className="row">
                        <div className="col">
                        <Routes>
                            <Route path='patients' element={ <Patients /> }/>
                            <Route path='patients/item/:idItem' element={ <Item /> }/>
                            <Route path='profile' element={ <Profile /> }/>
                        </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

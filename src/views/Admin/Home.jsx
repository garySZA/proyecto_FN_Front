import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Menu } from '../../components/Menu/Menu'
import { Clients } from './clients/Clients'
import { Profile } from './profile/Profile'
import { Users } from './users/Users'
import { Accounts } from './Accounts/Accounts'
import { EditAccount } from './Accounts/EditAccount'

export const Home = () => {
    const location = useLocation();
    const path = location.pathname;
    const [title, setTitle] = useState('');

    useEffect(() => {
        switch (path) {
            case '/admin/clients':
                setTitle('Clientes')
                break;
            default:
                setTitle('asdas');
        }

        document.title = title;
    }, [])
    
    
    return (
        <>
            <div className='d-flex'>
                <Menu />
                <div className='container'>
                    <div className="row">
                        <div className="col">
                        <Routes>
                            <Route path="accounts" element={ <Accounts /> }/>
                            <Route path="accounts/:id" element={ <EditAccount /> }/>
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

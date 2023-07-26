import React, { useState } from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaBars, FaHome, FaUser, FaCog, FaTimes } from 'react-icons/fa'

import './Menu.css'
import { menuItemsAdmin } from '../../helpers/menu-items'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const handleMenuToggle = () => {
        setMenuCollapsed( !menuCollapsed );
    }

    const { userOptions } = menuItemsAdmin;

    console.log(userOptions)

    return (
        <div className={`container-fluid ${ menuCollapsed ? 'container-collapsed' : 'container-expand' }`}>
            <div className="row">
                <div className={`col-12 sidebar ${ menuCollapsed ? 'collapsed' : '' } bg-letters`}>
                    <ul>
                        <li className=''>
                            <div className="menu-toggle">
                                <button className='text-primary' onClick={ handleMenuToggle }>
                                    { menuCollapsed ? <FaBars size={20}/> : <FaTimes size={20}/> }
                                </button>
                            </div>
                        </li>
                        {
                            userOptions.map(( item, i ) => {
                                const IconComponent = eval(item.icon);
                                
                                return <li>
                                            
                                            <NavLink
                                                className='menu-icon d-flex w-100 text-primary'
                                                to={ item.route }
                                            >
                                                <IconComponent className='mx-2 mt-1 text-primary' size={20}/>
                                                <span className='menu-text text primary'>{ item.label }</span>
                                            </NavLink>
                                            
                                        </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

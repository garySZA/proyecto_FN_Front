import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

import './Menu.css'
import { AuthContext } from '../../context/AuthContext'
import { Icon } from '../Icon'

export const Menu = ({ menuItems }) => {
    const [menuCollapsed, setMenuCollapsed] = useState(true);
    const navigate = useNavigate();
    const { logout } = useContext( AuthContext );

    const handleMenuToggle = () => {
        setMenuCollapsed( !menuCollapsed );
    }

    const onLogout = ( route ) => {
        logout();
        navigate( route, {
            replace: true
        });
    }

    const { userOptions, sesionUserOptions } = menuItems;

    return (
        <div className={`container-fluid ${ menuCollapsed ? 'container-collapsed' : 'container-expand' } position-fixed top-50 start-0 translate-middle-y`} style={{ zIndex: 999 }}>
            <div className="row">
                <div className={`col-12 sidebar ${ menuCollapsed ? 'collapsed' : '' } bg-letters shadow`}>
                    <ul className='list_menu'>
                        <li className='item_menu'>
                            <div className="menu-toggle">
                                <button className={`text-primary ${ !menuCollapsed ? 'me-3' : '' }`} onClick={ handleMenuToggle }>
                                    { menuCollapsed ? <FaIcons.FaBars size={20}/> : <FaIcons.FaTimes size={20}/> }
                                </button>
                            </div>
                        </li>
                        {
                            userOptions.map(( item, i ) => {
                                return <li className='item_menu' key={i}>
                                            
                                            <NavLink
                                                className={ `menu-icon d-flex w-100 text-primary ${ menuCollapsed && 'justify-content-center' } ` }
                                                to={ item.route }
                                                activeclassname='active'
                                            >
                                                <Icon icon={ item.icon } color='primary' size={ item.size } title={ item.label } />
                                                <span className='menu-text text-primary py-1'>{ item.label }</span>
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

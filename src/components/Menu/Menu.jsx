import React, { useContext, useState } from 'react'
import { FaBars, FaUserMd, FaHome, FaUser, FaCog, FaTimes, FaUserCog } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdSupervisorAccount } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'

import './Menu.css'
import { AuthContext } from '../../context/AuthContext'

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
        <div className={`container-fluid ${ menuCollapsed ? 'container-collapsed' : 'container-expand' } z-1 position-fixed top-50 start-0 translate-middle-y`}>
            <div className="row">
                <div className={`col-12 sidebar ${ menuCollapsed ? 'collapsed' : '' } bg-letters shadow`}>
                    <ul className='list_menu'>
                        <li className='item_menu'>
                            <div className="menu-toggle">
                                <button className={`text-primary ${ !menuCollapsed ? 'me-3' : '' }`} onClick={ handleMenuToggle }>
                                    { menuCollapsed ? <FaBars size={20}/> : <FaTimes size={20}/> }
                                </button>
                            </div>
                        </li>
                        {
                            userOptions.map(( item, i ) => {
                                const IconComponent = eval(item.icon);
                                
                                return <li className='item_menu' key={i}>
                                            
                                            <NavLink
                                                className={ `menu-icon d-flex w-100 text-primary ${ menuCollapsed && 'justify-content-center' } ` }
                                                to={ item.route }
                                                activeclassname='active'
                                            >
                                                <IconComponent className='mx-2 mt-1 text-primary' title={ item.label } size={ item.size }/>
                                                <span className='menu-text text-primary py-1'>{ item.label }</span>
                                            </NavLink>
                                            
                                        </li>
                            })
                        }
                        {/* {
                            sesionUserOptions.map(( item, i ) => {
                                const IconComponent = eval(item.icon);
                                
                                return <li className='item_menu' key={i}>
                                            
                                            <button
                                                className={ `menu-icon d-flex w-100 text-primary ${ menuCollapsed && 'justify-content-center' }` }
                                                onClick={ () => onLogout( item.route ) }
                                            >
                                                <IconComponent className='mx-2 mt-1 text-primary' title={ item.label } size={ item.size }/>
                                                <span className='menu-text text-primary text-start'>{ item.label }</span>
                                            </button>
                                            
                                        </li>
                            })
                        } */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

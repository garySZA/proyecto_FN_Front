import { useContext, useState } from 'react';
import { NavLink, useNavigate, useRoutes } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { Navbar as BootstrapNavBar } from 'react-bootstrap';

import { AuthContext } from '../context/AuthContext';
import { getLabelRole } from '../helpers/getLabels';


export const Navbar = ({ items = [], isPublic = false, sesionUserOptions }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [navbarExpanded, setNavbarExpanded] = useState(false);

    const { userOptions } = items;

    console.log(user.uid, 'adadas')

    const handleGoTo = ( route ) => {
        navigate(route);
        localStorage.getItem('user_tkn') && logout() 
    }

    const toggleNavbar = () => {
        setNavbarExpanded( !navbarExpanded );
    }

    return (
        <BootstrapNavBar expand='lg' expanded={ navbarExpanded } className="bg-primary shadow-sm sticky-top mb-3">
            <div className="container">
                <BootstrapNavBar.Toggle aria-controls='navbarTogglerDemo01' className=" table-letters ms-auto" onClick={ toggleNavbar }>
                    <span className='text-letters border-letters '>
                        <IoMenu size={35}/>
                    </span>
                </BootstrapNavBar.Toggle>
                <BootstrapNavBar.Collapse id="navbarTogglerDemo01">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        { userOptions && isPublic &&
                            userOptions.map(( item, i ) => (
                                <li key={i} className='mx-auto mx-md-0 text-center'>
                                    <NavLink 
                                        className={ ({ isActive }) => `nav-item nav-link text-letters ${ isActive  ? 'border-bottom border-3 border-letters' : 'no active'}` }
                                        to={ item.route }
                                    >
                                        { item.label }
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <hr /> 
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        {
                            !isPublic && (
                                <span className='mx-auto mx-md-0 nav-item nav-link text-letters'>
                                    { `${ user.first_name } - ${ getLabelRole( user.role ) }` }
                                </span>
                            )
                        }
                        {
                            sesionUserOptions &&
                            sesionUserOptions.map(( item, i ) => (
                                <li key={ i } className='mx-auto mx-md-0'>
                                    <button 
                                        className='nav-item nav-link text-letters'
                                        onClick={ () => handleGoTo( item.route ) }
                                    >
                                        <span className='text-letters'>
                                            { item.label }
                                        </span>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </BootstrapNavBar.Collapse>
            </div>
        </BootstrapNavBar>
    )
}
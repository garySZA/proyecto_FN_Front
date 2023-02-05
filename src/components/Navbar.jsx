import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Navbar = ({ items, isPublic }) => {

    const navigate = useNavigate();
    const { userOptions, sesionUserOptions } = items;

    const onLogout = ( route ) => {
        
        navigate(route, {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            {/* <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link> */}

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    {
                        userOptions ? 
                        userOptions.map(( item, i ) => (
                            <NavLink 
                                className="nav-item nav-link text-letters" 
                                to={ item.route }
                                key={ i }
                            >
                                { item.label }
                            </NavLink>
                        ))
                        : ''
                    }
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    {
                        !isPublic ? 
                            <span className="nav-item nav-link text-letters">
                                Gary - Admin
                            </span>
                        : ''
                    }
                    
                    {
                        sesionUserOptions ? 
                        sesionUserOptions.map((item, i) => (
                            <button
                                className='nav-item nav-link btn btn-letters'
                                key={ i }
                                onClick={ () => onLogout( item.route ) }
                            >
                                { item.label }
                            </button>
                        ))
                        : ''
                    }
                </ul>
            </div>
        </nav>
    )
}
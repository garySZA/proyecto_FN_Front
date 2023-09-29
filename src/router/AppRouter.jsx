import { useContext } from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useRoutes, } from "react-router-dom";

import { Login, NewAccount } from "../views";
import { AdminRoutes, PublicRoutes } from "./";
import { ClientRoutes } from "./ClientRoutes";
import { UserRoutes } from "./UserRoutes";
import { ForgotPassword } from "../views/publicAccess/ForgotPassword";
import { CodeVerification } from "../views/publicAccess/CodeVerification";
import { ResetPWD } from "../views/publicAccess/ResetPWD";
import { AuthContext } from "../context/AuthContext";
import { MedicRoutes } from "./MedicRoutes";
import { StateContext } from "../context/stateProvider";
import { redirectToHome } from "../helpers/redirects";

export const AppRouter = () => {
    const { user, role } = useContext( AuthContext );
    const { pathname } = useLocation();
    const { dispatch } = useContext( StateContext );

    const isShareLink = () => {
        const regexp = new RegExp('/medic/patients/');
        
        regexp.test( pathname ) ? localStorage.setItem( 'goto', pathname ) : '';
    }

    useEffect(() => {
        isShareLink();

        const session_expired = localStorage.getItem('session_expired') === 'true';

        if( session_expired ){
            const modalContent = {
                title: 'Sesión Expirada',
                content: 'Su sesión ha expirado. Por favor vuelve a iniciar sesión',
                buttons: [{
                    title: 'Entendido',
                    letter_color: 'primary',
                    color: 'letters',
                }],
                session_expired: true
            }

            dispatch({ type: 'showModalScreen', payload: true })
            dispatch({ type: 'setDataModal', payload: modalContent })
        }

    }, [pathname])

    return useRoutes([
        { 
            path: 'new_account', 
            element: !user.uid ? <NewAccount /> : <Navigate to={ redirectToHome( user.role ) }/>
        },
        { 
            path: 'login', 
            element: !user.uid ? <Login /> : <Navigate to={ redirectToHome( user.role ) }/>
        },
        { path: 'forgot_password',  element: <ForgotPassword /> },
        { path: 'forgot_password/:idPetition', element: <CodeVerification /> },
        { path: 'forgot_password/:idPetition/reset_pwd', element: <ResetPWD /> },
        {
            path: 'admin/*',
            element: role === 'ADMIN_ROLE' ? <AdminRoutes /> : <Navigate to='/login'/>
        },
        {
            path: 'client/*',
            element: role === 'CLIENT_ROLE' ? <ClientRoutes /> : <Navigate to='/login'/>
        },
        {
            path: 'medic/*',
            element: role === 'MEDIC_ROLE' ? <MedicRoutes /> : <Navigate to='/login'/>
        },
        {
            path: 'user/*',
            element: role === 'USER_ROLE' ? <UserRoutes /> : <Navigate to='/login'/>
        },
        { path: '*', element: <PublicRoutes /> },
    ])
}

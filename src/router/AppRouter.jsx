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

export const AppRouter = () => {
    const { role } = useContext( AuthContext );
    const { pathname } = useLocation();

    const isShareLink = () => {
        const regexp = new RegExp('/medic/patients/');
        
        regexp.test( pathname ) ? localStorage.setItem( 'goto', pathname ) : '';
    }

    useEffect(() => {
        isShareLink();
    }, [pathname])
    

    return useRoutes([
        { path: 'login', element: <Login /> },
        { path: 'new_account', element: <NewAccount /> },
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

import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen  from "../components/Loader/LoaderScreen";
import { StateContext } from "../context/stateProvider";

import { Login, NewAccount } from "../views";
import { AdminRoutes, PublicRoutes } from "./";
import { ClientRoutes } from "./ClientRoutes";
import { UserRoutes } from "./UserRoutes";
import { ModalGeneric } from "../components/Modal/Modal";
import { ForgotPassword } from "../views/publicAccess/ForgotPassword";

export const AppRouter = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>

            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }

            <Routes>
                <Route path='login' element={ <Login /> } />
                <Route path="new_account" element={ <NewAccount /> }/>
                <Route path="forgot_password" element={ <ForgotPassword /> }/>

                <Route path="admin/*" element={ <AdminRoutes /> }/>

                <Route path="client/*" element={ <ClientRoutes /> } />

                <Route path="user/*" element={ <UserRoutes /> } />
                
                <Route path="*" element={ <PublicRoutes /> }/>
            </Routes>
        </>
    )
}

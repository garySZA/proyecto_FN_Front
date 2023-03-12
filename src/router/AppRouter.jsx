import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderScreen  from "../components/Loader/LoaderScreen";
import { ModalInfo } from "../components/ModalInfo";
import { StateContext } from "../context/stateProvider";

import { Login, NewAccount, RestartPassword } from "../views";
import { AdminRoutes, PublicRoutes } from "./";
import { ClientRoutes } from "./ClientRoutes";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>

            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalInfo /> }

            <Routes>
                <Route path='login' element={ <Login /> } />
                <Route path="new_account" element={ <NewAccount /> }/>
                <Route path="restart_pwd" element={ <RestartPassword /> }/>

                <Route path="admin/*" element={ <AdminRoutes /> }/>

                <Route path="client/*" element={ <ClientRoutes /> } />

                <Route path="user/*" element={ <UserRoutes /> } />
                
                <Route path="*" element={ <PublicRoutes /> }/>
            </Routes>
        </>
    )
}

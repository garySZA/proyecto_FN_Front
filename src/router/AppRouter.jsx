import { Route, Routes } from "react-router-dom";

import { Login, NewAccount, RestartPassword } from "../views";
import { AdminRoutes, PublicRoutes } from "./";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='login' element={ <Login /> } />
                <Route path="new_account" element={ <NewAccount /> }/>
                <Route path="restart_pwd" element={ <RestartPassword /> }/>

                <Route path="admin/*" element={ <AdminRoutes /> }/>
                
                <Route path="*" element={ <PublicRoutes /> }/>
            </Routes>
        </>
    )
}

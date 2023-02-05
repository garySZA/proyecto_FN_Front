import { useEffect, useState } from "react"

import config from '../config/variables';
import AuthService from "../services/authService";
import { AuthContext } from "./AuthContext";

const userDefaultValues = {
    id: '',
    firts_name: '',
    last_name: '',
    email: '',
    user_role: '',
    access_token: '',
    profile_picture: ''
}

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem(config.sessions.tokenName) ? 
            localStorage.getItem( config.sessions.tokenName ) : ''
    );

    const [user, setUser] = useState(userDefaultValues);

    const [role, setRole] = useState(
        localStorage.getItem('role') ? 
            String( localStorage.getItem('role') ) : ''
    );

    const [menu, setMenu] = useState(
        localStorage.getItem('menu') ?
            String( localStorage.getItem('menu') ) : ''
    );

    useEffect(() => {
        if( token ){
            localStorage.setItem( config.sessions.tokenName, token );
            getUser();
        } else {
            localStorage.removeItem( config.sessions.tokenName );
        }
    }, [token])
    
    const getUser = async() => {
        await AuthService.getUser().then( response => {
            if( response.data.role === 'USER_ROLE' ){
                setUser({ ...response.data })
            } else {
                setUser(response.data);
            }
        } )
    }

    const login = async ( data ) => {
        const response = await AuthService.login( data );

        if( response.data ){
            setUser( response.data );

            setToken( response.data.access_token );
            setRole( response.data.role );
            localStorage.setItem('role', reponse.data.role);
    
            if( response.data.role === 'ADMIN_ROLE' ){
                changeAdmin();
            } else {
                changeClient();
            }
        }

        return response.data;
    }

    const logout = () => {
        localStorage.clear();
        setUser( userDefaultValues );
        setToken( '' );
        setRole( '' );
        setMenu( '' );
    };

    if( token ){
        localStorage.setItem(config.sessions.tokenName, token);
    }

    const changeAdmin = () => {
        setMenu('ADMIN_ROLE');
        localStorage.setItem( 'menu', 'admin' );
    }
    
    const changeClient = () => {
        setMenu('CLIENT_ROLE');
        localStorage.setItem('menu', 'client')
    }

    const propsMethods = {
        login,
        logout,
        changeClient
    }

    return (
        <AuthContext.Provider value={{ ...propsMethods, user, role, token, menu }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;



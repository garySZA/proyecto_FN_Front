import { apiPublic } from "./api"
import authHeader from "./authHeader";

const login = async ( user ) => {
    const response = await apiPublic.post('auth/login', user);

    return response;
}

const getUser = async () => {
    const response = await apiPublic.post('auth/user', {}, {
        headers: authHeader()
    });

    return response;
}

const logout = async() => {

}

const verifyPassword = async ( data ) => {
    const response = await apiPublic.post('auth/verify_password', data, {
        headers: authHeader()
    });

    return response
}

const AuthService = {
    login,
    getUser,
    logout,
    verifyPassword
}

export default AuthService;
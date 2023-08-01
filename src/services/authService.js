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

const AuthService = {
    login,
    getUser,
    logout
}

export default AuthService;
import { apiUser } from "../api"
import authHeader from "../authHeader"

const getProfile = async () => {
    const response = await apiUser.get('/', {
        headers: authHeader(),
    });

    return response.data;
}

const updateProfile = async ( data ) => {
    const response = await apiUser.put('/', data, {
        headers: authHeader()
    });

    return response.data;
}

const UserService = {
    getProfile,
    updateProfile,
}

export default UserService
import { apiAdmin } from "../api";
import authHeader from "../authHeader";

const getProfile = async ()  => {
    const response = await apiAdmin.get('profile', {
        headers: authHeader()
    });

    return response.data;
}

const updateProfile = async ( data ) => {
    const response = await apiAdmin.put('profile', data, {
        headers: authHeader()
    });

    return response.data;
}

const changePassword = async ( data ) => {
    const response = await apiAdmin.post('profile', data, {
        headers: authHeader()
    });

    return response.data;
}

const ProfileService = {
    changePassword,
    getProfile,
    updateProfile,
}

export default ProfileService;
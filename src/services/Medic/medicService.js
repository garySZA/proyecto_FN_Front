import { apiMedic } from "../api";
import authHeader from "../authHeader";

const getProfile = async () => {
    const response = await apiMedic.get('profile', {
        headers: authHeader()
    });

    return response.data;
}

const updateProfile = async ( data ) => {
    const response = await apiMedic.put('profile', data, {
        headers: authHeader()
    });

    return response.data;
}

const changePassword = async ( data ) => {
    const response = await apiMedic.post('profile', data, {
        headers: authHeader()
    });

    return response.data;
}

const MedicService = {
    changePassword,
    getProfile,
    updateProfile,
}

export default MedicService;
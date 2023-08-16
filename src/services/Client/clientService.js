import { apiClient } from "../api"
import authHeader from "../authHeader"

const getProfile = async ( id ) => {
    const response = await apiClient.get(`/${id}`, {
        headers: authHeader(),
    });

    return response.data;
}

const updateProfile = async ( id, data ) => {
    const response = await apiClient.put(`/${id}`, data, {
        headers: authHeader(),
    });

    return response.data;
}

const ClientService = {
    getProfile,
    updateProfile
}

export default ClientService
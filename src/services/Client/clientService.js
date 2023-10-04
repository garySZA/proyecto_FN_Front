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

const resetPassword = async ( data ) => {
    const response = await apiClient.post('/', data, {
        headers: authHeader()
    });

    return response.data;
}

const getHistoryItems = async ( idHistory ) => {
    const response = await apiClient.get(`history/${idHistory}/items`, {
        headers: authHeader()
    });

    return response.data;
}

const getItem = async ( id ) => {
    const response = await apiClient.get(`history/item/${ id }`, {
        headers: authHeader()
    });

    return response.data;
}

const downloadPDF = async ( idItem, idValoration ) => {
    const response = await apiClient.get(`history/item/${idItem}/download_pdf/${idValoration}`, {
        responseType: 'blob',
    });

    return response.data;
}

const getValoration = async ( id ) => {
    const response = await apiClient.get(`valoration/${id}`, {
        headers: authHeader()
    });

    return response.data
}

const ClientService = {
    downloadPDF,
    getHistoryItems,
    getItem,
    getProfile,
    getValoration,
    resetPassword,
    updateProfile,
}

export default ClientService
import { apiUser } from "../api";
import authHeader from "../authHeader";

const getAll = async ( params ) => {
    const response = await apiUser.get('clients', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const getClient = async ( id ) => {
    const response = await apiUser.get(`clients/client/${ id }`, {
        headers: authHeader()
    });

    return response.data;
}

const getHistoryItems = async ( idHistory ) => {
    const response = await apiUser.get(`clients/history/${ idHistory }/items`, {
        headers: authHeader(),
    });

    return response.data;
}

const createHistory = async ( data ) => {
    const response = await apiUser.post('clients', data, {
        headers: authHeader()
    });

    return response.data;
}

const createItem = async ( idHistory, data ) => {
    const response = await apiUser.post(`clients/history/create/item/${ idHistory }`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(),
        },
    });

    return response.data;
}


const ClientService = {
    getAll,
    getClient,
    getHistoryItems,
    createHistory,
    createItem,
}

export default ClientService;
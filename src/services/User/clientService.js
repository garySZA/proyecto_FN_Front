import { apiUser } from "../api";
import authHeader from "../authHeader";

const getAll = async ( params ) => {
    const response = await apiUser.get('clients', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const createHistory = async ( data ) => {
    const response = await apiUser.post('clients', data, {
        headers: authHeader()
    });

    return response.data;
}

const ClientService = {
    getAll,
    createHistory,
}

export default ClientService;
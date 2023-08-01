import { apiAdmin } from './api';
import authHeader from './authHeader';

const getAll = async ( params ) => {
    const response = await apiAdmin.get('admin/users', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const ClientService = {
    getAll,
}

export default ClientService;
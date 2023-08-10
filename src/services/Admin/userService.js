import  { apiAdmin }  from "../api";
import authHeader from "../authHeader";

const getAll = async ( params ) => {
    const response = await apiAdmin.get('/users', {
        headers: authHeader(),
        params: params
    });

    return response.data
}

const create = async( data ) => {

    const response = await apiAdmin.post('/users', data);

    return response.data;
}

const UserService = {
    create,
    getAll
}

export default UserService;
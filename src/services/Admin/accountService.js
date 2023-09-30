import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const getAll = async ( params ) => {
    const response = await apiAdmin.get('/accounts', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const getAccount = async ( id ) => {
    const response = await apiAdmin.get(`/accounts/${id}`, {
        headers:authHeader()
    });

    return response.data;
}

const createAccount = async ( data ) => {
    const response = await apiAdmin.post('/accounts', data, {
        headers:{
            ...authHeader(),
        }
    });

    return response.data;
}

const putAccount = async ( id, data ) => {
    const response = await apiAdmin.put(`accounts/${id}`, data, {
        headers: authHeader(),
    })

    return response.data;
}

const changeStatus = async ( id, data ) => {
    const response = await apiAdmin.put(`accounts/change_status/${id}`, data, {
        headers: authHeader()
    });

    return response.data;
}

const getPendings = async ( params ) => {
    const response = await apiAdmin.get('/pendings', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const changePending = async ( data ) => {
    const response = await apiAdmin.put('pendings', data, {
        headers: authHeader()
    });

    return response.data;
}

const AccountService = {
    getAll,
    getAccount,
    getPendings,
    changePending,
    changeStatus,
    createAccount,
    putAccount,
}

export default AccountService
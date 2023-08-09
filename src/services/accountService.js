import { apiAdmin } from "./api"
import authHeader from "./authHeader"

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

const putAccount = async ( id, data ) => {
    const response = await apiAdmin.put(`accounts/${id}`, data, {
        headers: authHeader(),
    })

    return response.data;
}

const changeStatus = async ( id ) => {
    const response = await apiAdmin.put(`accounts/change_status/${id}`, {
        headers: authHeader()
    });

    return response.data;
}

const AccountService = {
    getAll,
    getAccount,
    putAccount,
    changeStatus,
}

export default AccountService
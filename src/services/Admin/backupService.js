import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const getAll = async ( params ) => {
    const response = await apiAdmin.get('/backup/get_all', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const generateBackup = async () => {
    const response = await apiAdmin.post('/backup/new_backup', {}, {
        headers: {
            ...authHeader(),
        }
    });

    return response.data;
}

const downloadBackup = async ( params ) => {
    const response = await apiAdmin.get('/backup', {
        headers: authHeader(),
        params: params,
        responseType: 'blob'
    });

    return response;
}

const changeBackup = async ( data ) => {
    const response = await apiAdmin.put('/backup', data, {
        headers: authHeader()
    });

    return response.data;
}

const BackupService = {
    changeBackup,
    downloadBackup,
    generateBackup,
    getAll,
}

export default BackupService;
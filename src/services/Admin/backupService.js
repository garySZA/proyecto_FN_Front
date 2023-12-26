import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const getBackupsRegistered = async ( params ) => {
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

const getAllBackups = async ( params ) => {
    const response = await apiAdmin.get('/backup/all', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const uploadBackup = async ( data ) => {
    const response = await apiAdmin.post('/backup/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(),
        },
    });

    return response.data;
}

const BackupService = {
    changeBackup,
    downloadBackup,
    generateBackup,
    getAllBackups,
    getBackupsRegistered,
    uploadBackup,
}

export default BackupService;
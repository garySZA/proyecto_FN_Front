import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const generateBackup = async () => {
    const response = await apiAdmin.post('/backup/new_backup', {}, {
        headers: {
            ...authHeader(),
        }
    });

    return response.data;
}

const BackupService = {
    generateBackup,
}

export default BackupService;
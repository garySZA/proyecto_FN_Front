import { apiPublic } from './api';

const create = async ( data ) => {
    const response = await apiPublic.post('forgot_pwd', data);

    return response.data;
}

const PasswordService = {
    create
}

export default PasswordService;
import { apiPublic } from './api';

const create = async ( data ) => {
    const response = await apiPublic.post('forgot_pwd', data);

    return response.data;
}

const verifyCode = async ( data ) => {
    const response = await apiPublic.post('forgot_pwd/verify_code', data);

    return response.data;
}


const PasswordService = {
    create,
    verifyCode,
}

export default PasswordService;
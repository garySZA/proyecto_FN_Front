import { apiPublic } from './api';

const create = async ( data ) => {
    const response = await apiPublic.post('forgot_pwd', data);

    return response.data;
}

const verifyCode = async ( data ) => {
    const response = await apiPublic.post('forgot_pwd/verify_code', data);

    return response.data;
}

const resetPWD = async ( data ) => {

    console.log(data, 'data')

    const response = await apiPublic.post('forgot_pwd/reset_pwd', data);

    return response.data;
}

const PasswordService = {
    create,
    verifyCode,
    resetPWD,
}

export default PasswordService;
import { apiPublic } from './api';

const create = async ( data ) => {
    const response = await apiPublic.post('/contact', data);

    return response.data;
}

const ContactService = {
    create,
}

export default ContactService;
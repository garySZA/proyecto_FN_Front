import api from './api';

const create = async ( data ) => {
    const response = await api.post('/contact', data);

    return response.data;
}

const ContactService = {
    create,
}

export default ContactService;
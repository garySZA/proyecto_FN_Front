import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const getAll = async ( params ) => {
    const response = await apiAdmin.get('/contact', {
        headers: authHeader(),
        params: params
    });

    return response.data
}

const changeStatus = async ( id, data ) => {
    const response = await apiAdmin.put(`/contact/${ id }`, data, {
        headers: authHeader()
    });

    return response.data;
}

const ContactService = {
    getAll,
    changeStatus,
}

export default ContactService;
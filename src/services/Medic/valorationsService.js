import { apiMedic } from "../api"
import authHeader from "../authHeader";

const getAll = async ( params ) => {
    const response = await apiMedic.get('items', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const getItem = async ( id ) => {
    const response = await apiMedic.get(`item/${ id }`, {
        headers: authHeader()
    });

    return response.data;
}

const getValoration = async ( id ) => {
    const response = await apiMedic.get(`valoration/${id}`, {
        headers: authHeader()
    });

    return response.data
}

const createValoration = async ( data ) => {
    const response = await apiMedic.post('valorations/', data, {
        headers: authHeader()
    });

    return response.data;
}

const ValorationsService = {
    getAll,
    getItem,
    getValoration,
    createValoration,
}

export default ValorationsService;
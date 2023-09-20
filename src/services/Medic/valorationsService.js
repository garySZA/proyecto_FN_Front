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

const ValorationsService = {
    getAll,
    getItem
}

export default ValorationsService;
import { apiAdmin } from "../api";
import authHeader from "../authHeader";

const getAll = async ( params ) => {
    const response = await apiAdmin.get('medics', {
        headers: authHeader(),
        params: params
    });

    return response.data;
}

const MedicService = {
    getAll,
}

export default MedicService;
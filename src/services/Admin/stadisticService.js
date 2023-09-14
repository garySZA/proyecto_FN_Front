import { apiAdmin } from "../api"
import authHeader from "../authHeader"

const getStadistics = async () => {
    const response = await apiAdmin.get('stadistics', {
        headers: authHeader()
    })

    return response.data;
}

const StadisticsService = {
    getStadistics,
}

export default StadisticsService;
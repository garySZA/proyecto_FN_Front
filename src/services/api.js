import axios from "axios";

import config from '../config/variables';

const api = axios.create({
    baseURL: config.api_admin_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
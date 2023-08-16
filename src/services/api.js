import axios from "axios";

import config from '../config/variables';

const apiPublic = axios.create({
    baseURL: config.api_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiAdmin = axios.create({
    baseURL: config.api_admin_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiClient = axios.create({
    baseURL: config.api_client_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiUser = axios.create({
    baseURL: config.api_user_url,
    headers: {
        'Content-Type': 'application/json',
    },
})

export { 
    apiPublic, 
    apiAdmin,
    apiClient,
    apiUser
}
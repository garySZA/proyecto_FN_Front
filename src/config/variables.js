export default {
    api_admin_url: import.meta.env.VITE_API_ADMIN_URL,
    api_client_url: import.meta.env.VITE_API_CLIENT_URL,
    api_medic_url: import.meta.env.VITE_API_MEDIC_URL,
    api_user_url: import.meta.env.VITE_API_USER_URL,
    api_public: import.meta.env.VITE_API_PUBLIC,
    sessions: {
        tokenName: 'user_tkn',
        clientProducerID: 'client_producer_id'
    },
    urls: {
        host_url: import.meta.env.VITE_HOST_URL,
    }
}
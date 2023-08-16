export default {
    api_admin_url: import.meta.env.VITE_API_ADMIN_URL,
    api_client_url: import.meta.env.VITE_API_CLIENT_URL,
    api_user_url: import.meta.env.VITE_API_USER_URL,
    sessions: {
        tokenName: 'user_tkn',
        clientProducerID: 'client_producer_id'
    },
    api_public: import.meta.env.VITE_API_PUBLIC
}
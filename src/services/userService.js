import api from "./api";

const create = async( data ) => {

    const response = await api.post('/users', data);

    return response.data;
}

const UserService = {
    create,
}

export default UserService;
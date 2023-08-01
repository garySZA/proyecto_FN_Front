import  { apiAdmin }  from "./api";

const create = async( data ) => {

    const response = await apiAdmin.post('/users', data);

    return response.data;
}

const UserService = {
    create,
}

export default UserService;
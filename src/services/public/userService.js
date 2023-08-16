import  { apiPublic }  from "../api";

const create = async( data ) => {

    const response = await apiPublic.post('/create_account', data);

    return response.data;
}

const UserService = {
    create,
}

export default UserService;
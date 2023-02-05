import { createContext } from "react";

const userValues = {
    id: '',
    firts_name: '',
    last_name: '',
    email: '',
    user_role: '',
    access_token: '',
    profile_picture: ''
}

export const authContextDefaults = {
    user: userValues,
    token: '',
    menu: '',
    role: '',
    login: async () => {},
    logout: () => null
};

export const AuthContext = createContext(authContextDefaults);
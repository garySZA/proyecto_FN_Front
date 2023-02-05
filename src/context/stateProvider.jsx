import { createContext, useReducer } from "react"
import { stateReducer } from "./stateReducer";

const initialState = {
    listClients: [],
    listUsers: []
}

export const StateContext = createContext({
    state: initialState,
    dispatch: () => null
});

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            { children }
        </StateContext.Provider>
    );
};
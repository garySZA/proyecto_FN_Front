import { createContext, useReducer } from "react"
import { stateReducer } from "./stateReducer";

const initialState = {
    listClients: [],
    listUsers: [],
    showLoaderScreen: false,
    showModalScreen: false,
    showModalConfirmPWDScreen: false,
    dataModal: {},
    showModalFullScreenRadio: false,
    dataModalFullScreenRadio: {},
    showModalShareLink: false,
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
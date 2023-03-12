export const stateReducer = ( state, action ) => {
    
    switch (action.type) {
        case 'setClients':
            return  {...state, listClients: action.payload }
        case 'showLoaderScreen':
            return  {...state, showLoaderScreen: !!action.payload };
        case 'showModalScreen':
            return  {...state, showModalScreen: !!action.payload };
        case 'setDataModal':
            return  {...state, dataModal: action.payload }
        default:
            return state;
            
    }
}
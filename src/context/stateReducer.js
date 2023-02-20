export const stateReducer = ( state, action ) => {
    
    switch (action.type) {
        case 'setClients':
            return  {...state, listClients: action.payload }
        case 'showLoaderScreen':
            return  {...state, showLoaderScreen: !!action.payload };
    
        default:
            return state;
            
    }
}
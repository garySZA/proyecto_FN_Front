export const stateReducer = ( state, action ) => {
    
    switch (action.type) {
        case 'setClients':
            return  {...state, listClients: action.payload }
        case 'showLoaderScreen':
            return  {...state, showLoaderScreen: !!action.payload };
        case 'showModalScreen':
            return  {...state, showModalScreen: !!action.payload };
        case 'showModalConfirmPWDScreen':
            return  {...state, showModalConfirmPWDScreen: !!action.payload };
        case 'setDataModal':
            return  {...state, dataModal: action.payload }
        case 'showModalFullScreenRadio':
            return  {...state, showModalFullScreenRadio: !!action.payload };
        case 'setDataModalFullScreenRadio':
            return  {...state, dataModalFullScreenRadio: action.payload }
        case 'showModalShareLink':
            return  {...state, showModalShareLink: !!action.payload };
        default:
            return state;
            
    }
}
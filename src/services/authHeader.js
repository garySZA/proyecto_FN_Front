import config from '../config/variables';

const authHeader = () => {
    let token = localStorage.getItem( config.sessions.tokenName );
    let header = {};

    if( token ){
        header = { 'Authorization': 'Bearer' + token };
    }

    return header;
}

export default authHeader;
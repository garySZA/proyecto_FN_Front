export const getLabelRole = ( role ) => {
    switch (role) {
        case 'ADMIN_ROLE':
            return 'Administrador';
        case 'CLIENT_ROLE':
            return 'Cliente';
        case 'USER_ROLE':
            return 'Usuario';
        default:
            return 'NoVálido'
    }
}
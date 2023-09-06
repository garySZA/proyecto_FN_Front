export const getLabelRole = ( role ) => {
    switch (role) {
        case 'ADMIN_ROLE':
            return 'Administrador';
        case 'CLIENT_ROLE':
            return 'Cliente';
        case 'USER_ROLE':
            return 'Radiólogo';
        default:
            return 'NoVálido'
    }
}

export const getLabelGender = ( gender ) => {
    switch ( gender ) {
        case 'Male':
            return 'Masculino';
        case 'Female':
            return 'Femenido';
        case 'Other':
            return 'Otro';
        default:
            return 'NoVálido'
    }
}
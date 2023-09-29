export const redirectToHome = ( role ) => {
    switch (role) {
        case 'ADMIN_ROLE':
            return '/admin/stadistics';
            break;
        case 'CLIENT_ROLE':
            return '/client/home';
            break;
        case 'USER_ROLE':
            return '/user/clients';
            break;
        case 'MEDIC_ROLE':
            return '/medic/patients';
    }
}
export const menuItemsAdmin = {
    userOptions: [
        {
            label: 'Cuentas',
            route: 'accounts',
            icon: 'MdSupervisorAccount'
        },
        {
            label: 'Clientes',
            route: 'clients',
            icon: 'FaUser'
        },
        {
            label: 'Radiólogos',
            route: 'users',
            icon: 'FaUserMd'
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog'
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login'
        }
    ]
};

export const menuItemsClient = {
    userOptions: [
        {
            label: 'Home',
            route: '',
            icon: 'FaHome'
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog'
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login',
            icon: 'IoLogOut'
        }
    ]
};

export const menuItemsUser = {
    userOptions: [
        {
            label: 'Home',
            route: 'clients',
            icon: 'FaHome'
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog'
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login',
            icon: 'IoLogOut'
        }
    ]
};
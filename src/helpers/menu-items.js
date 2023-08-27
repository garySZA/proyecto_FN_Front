export const menuItemsAdmin = {
    userOptions: [
        {
            label: 'Cuentas',
            route: 'accounts',
            icon: 'FaUsers',
            size: 26,
        },
        {
            label: 'Clientes',
            route: 'clients',
            icon: 'FaUser',
            size: 20,
        },
        {
            label: 'Radiólogos',
            route: 'users',
            icon: 'FaUserMd',
            size: 20,
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog',
            size: 20,
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login',
            icon: 'IoLogOut',
            size: 25,
        }
    ]
};

export const menuItemsClient = {
    userOptions: [
        {
            label: 'Home',
            route: 'home',
            icon: 'FaHome',
            size: 20,
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog',
            size: 20,
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login',
            icon: 'IoLogOut',
            size: 25,
        }
    ]
};

export const menuItemsUser = {
    userOptions: [
        {
            label: 'Home',
            route: 'clients',
            icon: 'FaHome',
            size: 20,
        },
        {
            label: 'Perfil',
            route: 'profile',
            icon: 'FaUserCog',
            size: 20,
        },
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login',
            icon: 'IoLogOut',
            size: 25,
        }
    ]
};
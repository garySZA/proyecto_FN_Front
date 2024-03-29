export const menuItemsAdmin = {
    userOptions: [
        {
            label: 'Inicio',
            route: 'stadistics',
            icon: 'FaHome',
            size: 26,
        },
        {
            label: 'Cuentas',
            route: 'accounts',
            icon: 'FaUsers',
            size: 26,
        },
        {
            label: 'Cuentas Pendientes',
            route: 'pendings',
            icon: 'GiPlayerTime',
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
            icon: 'FaHospitalUser',
            size: 25,
        },
        {
            label: 'Médicos',
            route: 'medics',
            icon: 'FaUserMd',
            size: 20,
        },
        {
            label: 'Contactos',
            route: 'contacts',
            icon: 'MdContactMail',
            size: 20,
        },
        {
            label: 'Backups',
            route: 'backups',
            icon: 'FaDatabase',
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
export const menuItemsMedic = {
    userOptions: [
        {
            label: 'Inicio',
            route: 'patients',
            icon: 'FaHome',
            size: 26,
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
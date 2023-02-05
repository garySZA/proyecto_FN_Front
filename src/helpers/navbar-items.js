export const navbarItemsAdmin = {
    userOptions: [
        {
            label: 'Clientes',
            route: 'clients'
        },
        {
            label: 'Perfil',
            route: 'profile'
        },
        {
            label: 'Usuarios',
            route: 'users'
        }
    ],

    sesionUserOptions: [
        {
            label: 'Cerrar sesión',
            route: '/login'
        }
    ]
};

export const navbarItemsHome = {
    userOptions: [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'About',
            route: '/about'
        },
    ],

    sesionUserOptions: [
        {
            label: 'Iniciar sesión',
            route: '/login'
        },
        {
            label: 'Crear cuenta',
            route: '/new_account'
        }
    ]
}
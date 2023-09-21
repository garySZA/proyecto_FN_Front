const cardsList = [
    {
        icon: {
            icon: 'GiSmartphone',
            color: 'primary',
            size: 70,
            title: 'smartphone'
        },
        title: 'Acceso desde tu Smarth',
        text: 'Podrás acceder a tu historial médico desde cualquier lugar y en cualquier momento'
    },
    {
        icon: {
            icon: 'TbPdf',
            color: 'primary',
            size: 70,
            title: 'Descarga en PDF'
        },
        title: 'Descarga tu historial',
        text: 'Te ofecemos la opción de poder descargar tu historial en formato PDF'
    },
    {
        icon: {
            icon: 'FiDownload',
            color: 'primary',
            size: 70,
            title: 'Descarga una radiografía'
        },
        title: 'Descarga tu radiografía',
        text: 'Ahora podrás descargar la radiografía que necesites'
    },
];

const getStadisticsList = ( stadistics ) => {
    const { cantUsers, cantClients, cantMedics, cantAccountsBlocked, cantHistories, cantItems, cantContacts, valorations } = stadistics;

    return [
        {
            cant: cantUsers,
            text: 'Usuarios registrados',
            icon: 'FaHospitalUser',
            size: 50
        },
        {
            cant: cantClients,
            text: 'Clientes registrados',
            icon: 'FaUser',
            size: 50
        },
        {
            cant: cantMedics,
            text: 'Médicos registrados',
            icon: 'FaUserMd',
            size: 50
        },
        {
            cant: cantHistories,
            text: 'Historiales registrados',
            icon: 'AiFillFolder',
            size: 50
        },
        {
            cant: cantItems,
            text: 'Radiografías registradas',
            icon: 'FaXRay',
            size: 50
        },
        {
            cant: valorations,
            text: 'Valoraciones realizadas',
            icon: 'FaFileSignature',
            size: 50
        },
        {
            cant: cantContacts,
            text: 'Contactos registrados',
            icon: 'BsFillEnvelopeFill',
            size: 50
        },
        {
            cant: cantAccountsBlocked,
            text: 'Cuentas bloqueadas',
            icon: 'HiUserRemove',
            size: 50
        },
    ]
}
export {
    cardsList,
    getStadisticsList,
}
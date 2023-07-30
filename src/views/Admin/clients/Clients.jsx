import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import ClientService from '../../../services/clientService';
import { Table } from '../../../components/Table/Table'
import { defaultFilters } from '../../../helpers/defaultValues';

export const Clients = () => {
    const [filters, setFilters] = useState({...defaultFilters});

    //? Bloque para hacer peticiones a la bd y llenar la tabla
    //? getItems cumple la funcion de hacer la peticion a la url correcta para llenar la tabla
    const getItems = useMutation(
        () => ClientService.getAll( filters )
    );

    const handleDeleteClient = (id) => {
        console.log( 'id a eliminar desde client', id);
    }

    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    <h2 className='text-letters'>Clientes Registrados</h2>
                    <hr />
                    <Table 
                        deleteFunc={ handleDeleteClient } 
                        getItems={ getItems }
                        filters={ filters }
                        setFilters={ setFilters }
                    />
                </div>
            </div>
        </div>
    </>
    )
}

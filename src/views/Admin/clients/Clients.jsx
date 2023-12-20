import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';

import ClientService from '../../../services/Admin/clientService';
import { Table } from '../../../components/Table/Table'
import { defaultFilters, defaultResult } from '../../../helpers/defaultValues';
import { headerTableClientsAdmin } from '../../../helpers/tableContents';
import { DropdownFilter } from '../../../components/Dropdown/DropdownFilter';

export const Clients = () => {
    const [filters, setFilters] = useState({...defaultFilters});
    const [result, setResult] = useState( defaultResult );

    //? Bloque para hacer peticiones a la bd y llenar la tabla
    //? getItems cumple la funcion de hacer la peticion a la url correcta para llenar la tabla
    const getItems = useMutation(
        () => ClientService.getAll( filters )
    );

    const handleDeleteClient = (id) => {
        console.log( 'id a eliminar desde client', id);
    }

    const handleEditAccount = ( item ) => {
        const { uid } = item;
        
        console.log('id de cuenta a editar', uid)
    }

    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col col-md-12 mx-auto">
                    <div className='d-flex'>
                        <h2 className='text-letters'>Clientes Registrados</h2>
                        <DropdownFilter
                            filters={ filters }
                            setFilters={ setFilters }
                            setResult={ setResult }
                            getItems={ getItems }
                        />
                    </div>
                    <hr />
                    <Table 
                        result={ result }
                        setResult={ setResult }
                        deleteFunc={ handleDeleteClient } 
                        getItems={ getItems }
                        filters={ filters }
                        setFilters={ setFilters }
                        editFunc={ handleEditAccount }
                        options={ false }
                        headers={ headerTableClientsAdmin }
                    />
                </div>
            </div>
        </div>
    </>
    )
}

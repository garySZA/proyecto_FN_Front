import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { Table } from '../../../components/Table/Table'
import UserService from '../../../services/Admin/userService'
import { defaultFilters, defaultResult } from '../../../helpers/defaultValues'
import { headerTableUsersAdmin } from '../../../helpers/tableContents'

export const Users = () => {
    const [filters, setFilters] = useState({ ...defaultFilters });
    const [result, setResult] = useState( defaultResult )
    
    const getItems = useMutation(
        () => UserService.getAll( filters )
    );

    const handleDeleteUser = ( id ) => {
        console.log('id de usuario a eliminar desde users', id);
    }

    const handleEditUser = ( item ) => {
        const { uid } = item;

        console.log('id de cuenta a editar', id)
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-md-12 mx-auto">
                        <h2 className='text-letters'>Radiólogos Registrados</h2>
                        <hr />
                        <Table 
                            deleteFunc={ handleDeleteUser }
                            getItems={ getItems }
                            filters={ filters }
                            setFilters={ setFilters }
                            editFunc={ handleEditUser }
                            options={ false }
                            headers={ headerTableUsersAdmin }
                            result={ result }
                            setResult={ setResult }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

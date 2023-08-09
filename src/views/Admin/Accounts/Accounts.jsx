import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { Table } from '../../../components/Table/Table';
import AccountService from '../../../services/accountService'
import { defaultFilters } from '../../../helpers/defaultValues';

export const Accounts = () => {
    const [filters, setFilters] = useState({ ...defaultFilters });
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const getItems = useMutation(
        () => AccountService.getAll( filters )
    );
    
    const handleDeleteAccount = ( id ) => {
        console.log('id de cuenta a eliminar', id)
    }

    const handleEditAccount = ( item ) => {
        const { uid } = item;
        
        navigate(`${path}/${uid}`)
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col col-md-10 mx-auto">
                        <h2 className='text-letters'>Cuentas Registradas</h2>
                        <hr />
                        <Table 
                            deleteFunc={ handleDeleteAccount } 
                            getItems={ getItems }
                            filters={ filters }
                            setFilters={ setFilters }
                            editFunc={ handleEditAccount }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

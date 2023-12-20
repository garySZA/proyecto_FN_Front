import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export const DropdownFilter = ({ setResult, filters, setFilters, getItems, isUpdate, setIsUpdated }) => {
    const [usersActives, setUsersActives] = useState(true);
    const handleFilter = ( value ) => {
        setFilters({
            ...filters,
            sort: {
                status: value
            }
        });
        setUsersActives(value);
        getItems.mutateAsync().then( res => setResult( res ) );
    }
    
    return (
        <div className='ms-auto d-flex align-items-center'>
            <Dropdown >
                <Dropdown.Toggle variant='primary' id='dropdown-basic-menu'>
                    { `Cuentas ${ usersActives ? 'Activas' : 'Bloqueadas' }` }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={ () => handleFilter(true) }>Activos</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={ () => handleFilter(false) }>Bloqueados</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

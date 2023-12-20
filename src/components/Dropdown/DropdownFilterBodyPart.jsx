import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { bodyParts } from '../../helpers/bodyParts';

export const DropdownFilterBodyPart = ({ setResult, filters, setFilters, getItems, setTotal=()=> {} }) => {
    const [bodyPart, setbodyPart] = useState({ label: 'Todos', value: 'all' });
    
    const handleFilterBodyPart = ( value ) => {
        setFilters({
            ...filters,
            sort: {
                bodyPart: value.value
            }
        })
        setbodyPart(value);
        getItems.mutateAsync().then( response => {
            const { items } = response;
            setResult( items );
            setTotal(response.total)
        })
        
    }
    
    return (
        <div className='col-12 col-sm-5 col-md-4 col-lg-3 col-xl-auto me-2 d-flex align-items-center justify-content-center'>
            <Dropdown className='w-75'>
                <Dropdown.Toggle size='md' className='border border-letters shadow-sm' variant='primary' id='dropdown-basic-body-part'>
                    { bodyPart.label }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        bodyParts.map(( part, i ) => (
                            <React.Fragment key={ i }>
                                <Dropdown.Item 
                                    onClick={ () => handleFilterBodyPart( part ) } 
                                >
                                    { part.label }
                                </Dropdown.Item>
                            </React.Fragment>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

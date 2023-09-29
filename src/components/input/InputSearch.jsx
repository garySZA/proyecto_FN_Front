import React, { useEffect, useMemo, useState } from 'react'
import { Icon } from '../Icon';

export const InputSearch = ({ margin, filters, getItems, setResult }) => {
    const [search, setSearch] = useState('');

    const handleInputChange = ( event ) => {
        const value = event.target.value;
        setSearch( value );
        filters.find = value
    };

    useEffect(() => {
        getItems.mutateAsync().then( res => {
            setResult( res );
        });
    }, [filters.find])    

    return (
        <div className={`col-2 m${ margin }-auto`}>
            <div className="input-group">
                <input
                    id='search'
                    type='text'
                    placeholder='Buscar...'
                    className='form-control'
                    value={ search }
                    onChange={ handleInputChange }
                />
                <div className="float-end">
                    <Icon icon='ImSearch' title='Buscar' color='letters' size='18'/>

                </div>

            </div>
        </div>
    )
}

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
    }, [search])

    return (
        <div className={`col-7 col-sm-5 col-md-4 col-lg-3 col-xl-2 m${ margin }-auto mb-2`}>
            <form action='#' autoComplete='offasdasdasdasd'>
                <div className="input-group">
                    <input
                        id='search'
                        type='search'
                        placeholder='Buscar...'
                        className='form-control'
                        value={ search }
                        onChange={ handleInputChange }
                        autoComplete='new-inputq'
                    />
                    <div className="float-end">
                        <Icon icon='ImSearch' title='Buscar' color='letters' size='18'/>

                    </div>

                </div>
            </form>
            
        </div>
    )
}

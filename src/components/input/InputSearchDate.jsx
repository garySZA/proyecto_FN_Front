import moment from 'moment/moment';
import React, { useState } from 'react'

export const InputSearchDate = ({ setResult, filters, setFilters, getItems, setTotal=()=>{} }) => {
    const [limitDate, setLimitDate] = useState('')

    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('YYYY-MM-DD');
    
    const getDate = ( value ) => {
        if( value ){
            return value.toString().substring(0,10);
        }

        return value
    }

    const onChange = (e) => {
        
        if( e.target.value ){
            const dateChange = moment(e.target.value)
                .utcOffset(0)
                .format('YYYY-MM-DD');
            
            setLimitDate(dateChange);
            
            setFilters({
                ...filters,
                sort: {
                    ...filters.sort,
                    date: dateChange
                }
            })

            getItems.mutateAsync().then( response => {
                const { items, total } = response;
                setResult( items );
                setTotal( total )
            })
        }else{
            setFilters({
                ...filters,
                sort: {
                    ...filters.sort,
                    date: undefined
                }
            })

            getItems.mutateAsync().then( response => {
                const { items, total } = response;
                setResult( items );
                setTotal( total )
            })
        }

    }

    return (
        <div className='col-2 d-flex ms-auto'>
            <div className='w-auto  me-2 d-flex align-items-center h-100' >
                <label
                    className='form-label m-0'
                >
                    { 'Fecha' }
                </label>
            </div>
            <input 
                type="date"
                placeholder='20-12-2023'
                spellCheck={ false } 
                max={ dateMax }
                onChange={ (e) => { onChange( e ) }}
                className='w-100 form-control'
            />
        </div>
    )
}

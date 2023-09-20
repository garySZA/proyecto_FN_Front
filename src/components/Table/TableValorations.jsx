import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import 'moment/locale/es';

import { HeaderTable } from './HeaderTable';
import { defaultResult } from '../../helpers/defaultValues';
import { Paginator } from './Paginator';
import { DropdownGeneric } from '../Dropdown/DropdownGeneric';

export const TableValorations = ({ headers, getItems, filters, setFilters, isUpdated, setIsUpdated, optionsDrop }) => {
    const [result, setResult] = useState(defaultResult);
    
    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res);
        })
    }, [])
    
    return (
        <div className="table-responsive" style={{ minHeight: '300px' }}>
            <table className='table border-letters'>
                <HeaderTable listHeader={ headers }/>
                <tbody className='border-letters'>
                    {
                        result.rows.length ? result.rows.map((item, i) => (
                            <tr key={ i }>
                                <td>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                <td>{ item.patient.first_name } { item.patient.last_name }</td>
                                <td>{ item.item.id }</td>
                                <td>{ moment(item.createdAt).locale('es').fromNow() }</td>
                                <td>
                                    <DropdownGeneric element={ item.item } options={ optionsDrop(item) }/>
                                </td>
                            </tr>
                        ))
                        : <></>
                    }
                </tbody>
            </table>
            <Paginator 
                result={ result }
                setResult={ setResult }
                filters={ filters }
                setFilters={ setFilters }
                getItems={ getItems }
                isUpdated={ isUpdated }
                setIsUpdated={ setIsUpdated }
            />
        </div>
    )
}

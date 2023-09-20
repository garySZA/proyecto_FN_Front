import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';

import { HeaderTable } from './HeaderTable';
import { defaultResult } from '../../helpers/defaultValues';
import { DropdownGeneric } from '../Dropdown/DropdownGeneric';
import { Paginator } from './Paginator';

export const TableClients = ({ deleteFunc, getItems, filters, setFilters, editFunc, isUpdated, setIsUpdated, options, headers, optionsDrop, createHistory }) => {
    const [result, setResult] = useState(defaultResult);

    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res);
        })
    }, [isUpdated]);

    return (
        <>
            <div className="table-responsive" style={{ minHeight: '300px' }}>
                <table className='table border-letters'>
                    <HeaderTable listHeader={ headers }/>
                    <tbody className='border-letters'>
                        {
                            result.rows.length ? result.rows.map(( item, i ) => (
                                <tr key={ i }>
                                    <td>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                    <td className='w-25'>{ item.first_name } { item.last_name }</td>
                                    <td className='w-25'>{ moment.utc(item.date).format('L') }</td>
                                    <td className='w-25'>{ item.email }</td>
                                    <td className=''>{ item?.history ?? 'No cuenta con historial' }</td>
                                    <td>
                                        <DropdownGeneric element={ item } options={ optionsDrop( item ) }/>
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
        </>
    )
}

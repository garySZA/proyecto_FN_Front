import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import 'moment/locale/es';

import { defaultResult } from '../../helpers/defaultValues'
import { HeaderTable } from './HeaderTable';
import { Paginator } from './Paginator';
import { DropdownOptions } from '../Dropdown/DropdownOptions';

export const TableContacts = ({ getItems, filters, setFilters, isUpdated, setIsUpdated, headers, sendEmail, changeStatus, isDataUpdated }) => {
    const [result, setResult] = useState( defaultResult );

    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult( res );
        })
    }, [ isDataUpdated ]);
    

    return (
        <>
            <div className="table-responsive" style={{ minHeight: '300px' }}>
                <table className='table border-letters'>
                    <HeaderTable listHeader={ headers }/>
                    <tbody className='border-letters'>
                        {
                            result.rows.length ? result.rows.map(( item, i ) => (
                                <tr key={i}>
                                    <td>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                    <td className='w-25'>{ item.emailClient } { item.last_name }</td>
                                    <td className='w-25'>{ item.text }</td>
                                    <td>
                                        { moment(item.createdAt).locale('es').fromNow() }
                                    </td>
                                    <td>
                                        { moment(item.updatedAt).locale('es').fromNow() }
                                    </td>
                                    <td>{ item.status ? 'Atendido' : 'Pendiente' }</td>
                                    <td>
                                        <DropdownOptions item={item} goToEmail={ sendEmail } changeStatus={ changeStatus }/>
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

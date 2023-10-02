import React, { useEffect, useState } from 'react';
import moment from 'moment/moment'
import 'moment/locale/es';

import { InputSearch } from '../input/InputSearch';
import { HeaderTable } from './HeaderTable';
import { Paginator } from './Paginator';
import { defaultResult } from '../../helpers/defaultValues';
import { getLabelRole } from '../../helpers/getLabels';
import { DropdownGeneric } from '../Dropdown/DropdownGeneric';

export const TablePendings = ({ changePending, getItems, filters, setFilters, isUpdated, setIsUpdated, options, headers, optionsDrop, showSearch}) => {
    const [result, setResult] = useState(defaultResult);
    
    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res)
        })
    }, []);
    

    return (
        <>
            { showSearch && <InputSearch margin='s' filters={ filters } getItems={ getItems } setResult={ setResult }/> }
            <div 
                className="table-responsive" 
                style={{ minHeight: '300px' }}
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
            >
                <table className='table border-letters'>
                    <HeaderTable listHeader={ headers }/>
                    <tbody className='border-letters'>
                        {
                            result.rows.length ? result.rows.map(( item, i ) => (
                                <tr key={i}>
                                    <td>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                    <td className=''>{ item.first_name } { item.last_name }</td>
                                    <td className=''>{ item.email }</td>
                                    <td className='px-auto'>{ item.pending ? 'Pendiente de aprobación' : 'Bloqueado' }</td>
                                    <td className='px-auto'>{ getLabelRole(item.role) }</td>
                                    <td className='px-auto'>{ moment(item.createdAt).locale('es').fromNow() }, { moment(item.createdAt).locale('es').format('LLL') }</td>
                                    { options && <td>
                                                    <DropdownGeneric element={ item } options={ optionsDrop(item) }/>
                                                </td>
                                    }
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

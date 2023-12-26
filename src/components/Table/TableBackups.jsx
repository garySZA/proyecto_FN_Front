import React from 'react';
import { InputSearch } from '../input/InputSearch';
import { HeaderTable } from './HeaderTable';
import { DropdownGeneric } from '../Dropdown/DropdownGeneric';
import { Paginator } from './Paginator';

export const TableBackups = ({ showSearch, filters, setFilters, getItems, result, setResult, headers, options, optionsDrop, isUpdated, setIsUpdated }) => {
    return (
        <>
            { showSearch && <InputSearch margin='s' filters={ filters } getItems={ getItems } setResult={ setResult }/> }
            <div
                className='table-responsive'
                style={{ minHeight: '300px' }}
                data-aos='fade-up'
                data-aos-anchor-placement='bottom-bottom'
            >
                <table className='table border-letters'>
                    <HeaderTable center listHeader={ headers }/>
                    <tbody className='border-letters'>
                        {
                            result.rows.length ? result.rows.map(( item, i ) => (
                                <tr key={ i }>
                                    <td style={{ textAlign: 'center' }}>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                    <td>{ item.file }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.user }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.medic }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.patient }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.history }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.item }</td>
                                    <td style={{ textAlign: 'center' }}>{ item.valorations }</td>
                                    {
                                        options && <td style={{ textAlign: 'center' }}>
                                                        <DropdownGeneric element={ item } options={ optionsDrop( item ) }/>
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

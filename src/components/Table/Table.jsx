import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment/moment'
import 'moment/locale/es';

import { StateContext } from '../../context/stateProvider'
import { headerTableClientsAdmin } from '../../helpers/tableContents'
import { HeaderTable } from './HeaderTable'
import { Paginator } from './Paginator'
import { defaultResult } from '../../helpers/defaultValues'
import { getLabelRole } from '../../helpers/getLabels'
import { DropdownGeneric } from '../Dropdown/DropdownGeneric'

export const Table = ({ deleteFunc, getItems, filters, setFilters, editFunc, isUpdated, setIsUpdated, options, headers, optionsDrop }) => {
    const [result, setResult] = useState( defaultResult );
    const { dispatch } = useContext(StateContext);

    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res);
        })
    }, [])

    const handleDeleteItem = ( item ) => {
        const modalData = {
            title: item.status ? 'Deshabilitar' : 'Habilitar',
            content: `¿Estás seguro que deseas ${ item.status ? 'deshabilitar' : 'habilitar' } la cuenta seleccionada? \nUna vez realizada la acción, esta cuenta ${ item.status ? 'no' : '' } tendrá acceso al sistema.`,
            buttons: [{
                title: 'Cancelar',
                color: '',
                letter_color: 'letters',
                action: null
            },{
                title: item.status ? 'Deshabilitar' : 'Habilitar',
                color: item.status ? 'danger' : 'letters',
                letter_color: 'primary',
                action: deleteFunc
            }]
        }

        dispatch({ type: 'showModalScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: {...modalData, element: item} });
    }


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
                                    <td className='w-25'>{ item.first_name } { item.last_name }</td>
                                    <td className=''>{ item.email }</td>
                                    <td className='px-auto'>{ item.status ? 'Activo' : 'Bloqueado' }</td>
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

import React, { useContext, useEffect, useState } from 'react'
import { FaTrash, FaPen } from 'react-icons/fa'

import { StateContext } from '../../context/stateProvider'
import { headerTableClientsAdmin } from '../../helpers/tableContents'
import { HeaderTable } from './HeaderTable'
import { Paginator } from './Paginator'
import { defaultResult } from '../../helpers/defaultValues'

export const Table = ({ deleteFunc, getItems, filters, setFilters, editFunc }) => {
    const [result, setResult] = useState( defaultResult );
    const { dispatch } = useContext(StateContext);

    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res);
        })
    }, [])

    const handleDeleteItem = ( item ) => {
        dispatch({ type: 'showModalScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: {...modalData, _id: item.uid} });
    }

    const modalData = {
        title: 'Eliminar',
        content: '¿Estás seguro que deseas eliminar el elemento seleccionado? \nUna vez realizada la acción, esta cuenta no tendrá mas acceso al sistema.',
        buttons: [{
            title: 'Cancelar',
            color: '',
            letter_color: 'letters',
            action: null
        },{
            title: 'Eliminar',
            color: 'danger',
            letter_color: 'primary',
            action: deleteFunc
        }]
    }

    return (
        <>
            <div className="table-responsive">
                <table className='table border-letters'>
                    <HeaderTable listHeader={ headerTableClientsAdmin }/>
                    <tbody className='border-letters'>
                        {
                            result.rows.length ? result.rows.map(( item, i ) => (
                                <tr key={i}>
                                    <td>{ filters.limit != 'all' ? (filters.page - 1) * filters.limit + i + 1 : i+1 }</td>
                                    <td className='w-25'>{ item.first_name } { item.last_name }</td>
                                    <td className='w-25'>{ item.email }</td>
                                    <td className='w-25 px-auto'>{ item.status ? 'Activo' : 'Bloqueado' }</td>
                                    <td>
                                        <div className=''>
                                            <button className='text-danger mx-2' onClick={ () => handleDeleteItem(item) }>
                                                <FaTrash  size={ 18 }/>
                                            </button>
                                            <button className='text-warning mx-2' onClick={ () => editFunc(item) }>
                                                <FaPen size={ 18 }/>
                                            </button>
                                        </div>
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
                />
            </div>
        </>
    )
}

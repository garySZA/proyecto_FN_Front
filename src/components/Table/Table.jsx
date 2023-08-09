import React, { useContext, useEffect, useState } from 'react'
import { FaCheckCircle, FaBan, FaPen } from 'react-icons/fa'

import { StateContext } from '../../context/stateProvider'
import { headerTableClientsAdmin } from '../../helpers/tableContents'
import { HeaderTable } from './HeaderTable'
import { Paginator } from './Paginator'
import { defaultResult } from '../../helpers/defaultValues'

export const Table = ({ deleteFunc, getItems, filters, setFilters, editFunc, isUpdated, setIsUpdated }) => {
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
        dispatch({ type: 'setDataModal', payload: {...modalData, _id: item.uid} });
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
                                            <button className={`text-${ item.status ? 'danger' : 'success' } mx-2`} onClick={ () => handleDeleteItem(item) }>
                                                { item.status ? <FaBan title='Deshabilidar cuenta' size={18}/> : <FaCheckCircle title='Habilitar cuenta' size={18}/> }
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
                    isUpdated={ isUpdated }
                    setIsUpdated={ setIsUpdated }
                />
            </div>
        </>
    )
}

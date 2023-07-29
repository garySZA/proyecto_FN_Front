import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaTrash, FaPen, FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'
import { StateContext } from '../../context/stateProvider'

const defaultResult = {
    total: 0,
    pages: 10,
    rows: []
}

export const Table = ({ deleteFunc, getItems, filters, setFilters }) => {
    const [result, setResult] = useState( defaultResult );
    const selectedItemRef = useRef(5);
    const { dispatch } = useContext(StateContext);

    useEffect(() => {
        getItems.mutateAsync().then(( res ) => {
            setResult(res);
        })
    }, [])

    const handleSelect = async (eventKey, e) => {
        selectedItemRef.current = eventKey;
        await setFilters({
            ...filters,
            limit: selectedItemRef.current,
            page: 1
        })

        getItems.mutateAsync().then( res => setResult( res ) );
    }

    const handlePrevPage = async () => {
        await setFilters({
            ...filters,
            page: filters.page <= 1 ? 1 : filters.page - 1
        });

        getItems.mutateAsync().then( res => setResult( res ) );
    }

    const handleNextPage = async () => {
        await setFilters({
            ...filters,
            page: filters.page < result.pages ? filters.page + 1 : filters.page
        });

        getItems.mutateAsync().then( res => setResult( res ) );
    }

    const handleDeleteItem = ( item ) => {
        dispatch({ type: 'showModalScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: {...modalData, _id: item.uid} });
    }

    const handleEditItem = () => {
        console.log('editar elemento');
    }

    const modalData = {
        title: 'Eliminar',
        content: '¿Estás seguro que deseas eliminar el elemento seleccionado?, una vez realizada la acción, esta cuenta no tendrá mas acceso al sistema.',
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
                    <thead>
                        <tr className='text-letters'>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
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
                                            <button className='text-warning mx-2' onClick={ handleEditItem }>
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
                <div className='d-flex justify-content-center align-items-center'>
                    <span className='fs-5'>Total: { result.total }</span>
                    <button className='mx-2 text-letters' onClick={ handlePrevPage }>
                        <FaAngleLeft size={25}/>
                    </button>
                    <span className='fs-5'>{ filters.page }</span>
                    <button className='mx-2 text-letters' onClick={ handleNextPage }>
                        <FaAngleRight size={25}/>
                    </button>
                    <Dropdown className='my-2' onSelect={ handleSelect }>
                        <Dropdown.Toggle variant='letters' id='dropdown-basic' style={{ color: 'white' }}>
                            { selectedItemRef.current === 'all' ? 'todo' : selectedItemRef.current }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='5'>5</Dropdown.Item>
                            <Dropdown.Item eventKey='10'>10</Dropdown.Item>
                            <Dropdown.Item eventKey='15'>15</Dropdown.Item>
                            <Dropdown.Item eventKey='all'>Todo</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

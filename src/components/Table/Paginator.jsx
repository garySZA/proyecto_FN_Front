import React, { useEffect, useRef } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown'

export const Paginator = ({ result, setResult, filters, setFilters, getItems, isUpdated, setIsUpdated }) => {
    const selectedItemRef = useRef(5);

    const handleSelect = async (eventKey, e) => {
        selectedItemRef.current = eventKey;
        await setFilters({
            ...filters,
            limit: selectedItemRef.current,
            page:1
        });

        getItems.mutateAsync().then( res => setResult( res ) );
    }
    
    const handlePrevPage = async () => {
        await setFilters({
            ...filters,
            page: filters.page <= 1 ? 1 : filters.page -1
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

    useEffect(() => {
        if( isUpdated ){
            getItems.mutateAsync().then( res => {
                setResult( res );
                setIsUpdated( false )
            });
        }
            
    }, [isUpdated])
    

    const styles = {
        zIndex: 1000
    };

    return (
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
    )
}

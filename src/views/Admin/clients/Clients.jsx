import React, { useContext, useEffect, useState } from 'react'
import { Table } from '../../../components/Table/Table'
import { StateContext } from '../../../context/stateProvider'

export const Clients = () => {
    const { state } = useContext( StateContext );
    
    const handleDeleteClient = (id) => {
        console.log( 'id a eliminar desde client', id);
    }

    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    <h2 className='text-letters'>Clientes Registrados</h2>
                    <hr />
                    <Table deleteFunc={ handleDeleteClient }/>
                </div>
            </div>
        </div>
    </>
    )
}

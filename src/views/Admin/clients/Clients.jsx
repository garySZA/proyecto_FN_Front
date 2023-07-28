import React from 'react'
import { Table } from '../../../components/Table/Table'

export const Clients = () => {
    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col col-md-10 mx-auto">
                    <h2 className='text-letters'>Clientes Registrados</h2>
                    <hr />
                    <Table />
                </div>
            </div>
        </div>
    </>
    )
}

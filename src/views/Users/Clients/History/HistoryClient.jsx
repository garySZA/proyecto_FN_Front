import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'
import 'moment/locale/es';

import ClientService from '../../../../services/User/clientService'
import { getLabelGender } from '../../../../helpers/getLabels'

export const HistoryClient = () => {
    const { idClient } = useParams();
    const [client, setClient] = useState({});
    const [history, setHistory] = useState({});

    const getItem = useMutation(
        () => ClientService.getClient( idClient )
    );

    useEffect(() => {
        getItem.mutateAsync().then((response) => {
            const { user } = response;
            setClient( user );

            const { history } = user;
            setHistory( history )
        });

        console.log(client, 'cliente')
        console.log(history, 'history')

    }, [])
    

    return (
        <div className="container">
            <ToastContainer 
                position='top-right'
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="row">
                <div className="col-12">
                    <h2 className='text-letters'>
                        Historial Médico
                    </h2>
                    <hr />
                </div>
                <div className="col-4 text-letters d-flex flex-column my-3">
                    <h3>Datos del paciente</h3>
                    <strong>Paciente:</strong> { client.first_name } { client.last_name }
                    <strong>Fecha de nacimiento:</strong> { moment.utc(client.date).format('l') }
                    <strong>Género:</strong> { getLabelGender( client.gender ) }
                </div>
                <div className="col-4 text-letters d-flex flex-column my-3">
                    <h3>Datos del historial</h3>
                    <strong>Código:</strong> { history._id }
                    <strong>Fecha de creación:</strong> { moment(history.createdAt).locale('es').fromNow() }, { moment(history.createdAt).locale('es').format('LLL') }
                    <strong>Número de elementos:</strong> 0
                </div>
                <hr />
            </div>
            <div className="row text-letters">
                <h3>Historial vacío</h3>
                <p>No existen documentos registrados en ese historial médico</p>
            </div>
        </div>
    )
}

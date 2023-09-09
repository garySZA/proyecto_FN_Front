import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import 'moment/locale/es';

import ClientService from '../../../../services/User/clientService'
import { getLabelGender } from '../../../../helpers/getLabels'
import { CardXRay } from '../../../../components/Card/CardXRay'
import { Icon } from '../../../../components/Icon'

export const HistoryClient = () => {
    const { idClient } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [client, setClient] = useState({});
    const [history, setHistory] = useState({});
    const [historyItems, setHistoryItems] = useState([]);
    const [isClientReady, setIsClientReady] = useState(false);

    const getHistory = useMutation(
        () => ClientService.getClient( idClient )
    );

    const getHistoryItems = useMutation(
        () => ClientService.getHistoryItems(history._id)
    )

    useEffect(() => {
        
        !isClientReady && getHistory.mutateAsync().then((response) => {
            const { user } = response;
            setClient( user );

            const { history } = user;
            setHistory( history );

            setIsClientReady(true);
        });

        isClientReady && historyItems.length === 0 && getHistoryItems.mutateAsync().then((response => {
                            const { items } = response;
                            setHistoryItems( items )
                        }));
    }, [isClientReady]);

    const handleCreateIem = (  ) => {
        navigate(`${pathname}/new_item/${ history._id }`)
    }

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
                        Historial Radiológico
                    </h2>
                    <hr />
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-letters d-flex flex-column my-3 ms-lg-4">
                    <h3>Datos del paciente</h3>
                    <strong>Paciente:</strong> { client.first_name } { client.last_name }
                    <strong>Fecha de nacimiento:</strong> { moment.utc(client.date).format('l') }
                    <strong>Género:</strong> { getLabelGender( client.gender ) }
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-letters d-flex flex-column my-3">
                    <h3>Datos del historial</h3>
                    <strong>Código:</strong> { history._id }
                    <strong>Fecha de creación:</strong> { moment(history.createdAt).locale('es').fromNow() }, { moment(history.createdAt).locale('es').format('LLL') }
                    <strong>Número de elementos:</strong> { historyItems.length }
                </div>
                <hr />
            </div>
            <div className="row text-letters mb-5">
                {
                    historyItems.length === 0 ? (
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4">
                                    <h3>Historial vacío</h3>
                                    <p>El historial no cuenta con items</p>
                                </div>
                                <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 ms-auto">
                                    <Button onClick={ () => handleCreateIem() } className='text-primary w-100' variant='letters' >
                                        <Icon className='mt-0' icon='MdOutlineNoteAdd' size={25}/>
                                        <small>Nuevo item</small>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4">
                                    <h3>{ historyItems.length } elementos</h3>
                                </div>
                                <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 ms-auto">
                                    <Button onClick={ () => handleCreateIem() } className='text-primary w-100' variant='letters' >
                                        <Icon className='mt-0' icon='MdOutlineNoteAdd' size={25}/>
                                        <small>Nuevo item</small>
                                    </Button>
                                </div>
                            </div>
                            <Row
                                xs={ 1 }
                                md={ 2 }
                                lg={ 2 }
                                xl={ 3 }
                                className='g-2 g-lg-4'
                            >
                                {
                                    historyItems.map(( item, i ) => (
                                        <CardXRay history={ history } item={ item } key={ i }/>
                                    ))
                                }
                            </Row>
                        </>
                    )
                }
            </div>
        </div>
    )
}

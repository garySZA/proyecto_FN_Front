import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row } from 'react-bootstrap'

import ClientService from '../../../../services/User/clientService'
import { CardXRay } from '../../../../components/Card/CardXRay'
import { Icon } from '../../../../components/Icon'
import { HistoryInfo } from '../../../../components/HistoryInfo'
import { HeaderSection } from '../../../../components/HeaderSection'
import { AuthContext } from '../../../../context/AuthContext'

export const HistoryClient = () => {
    const { user } = useContext( AuthContext );
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

    const handleGoToBack = () => {
        navigate('/user/clients');
    }

    const handleGoToItem = ( id ) => {
        navigate(`${pathname}/item/${id}`)
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
                <HeaderSection title='Historial Médico' goTo={ handleGoToBack }/>
                { !user.pending && <HistoryInfo client={ client } history={ history } historyItems={ historyItems }/> }
                <hr />
            </div>
            <div className="row text-letters mb-5">
                {
                    !user.pending ? (
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-4">
                                    <h3>{ historyItems.length === 0 ? 'Historial vacío' : `${ historyItems.length } elementos` }</h3>
                                    { historyItems.length === 0 && <p>El historial no cuenta con items</p> }
                                </div>
                                <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 ms-auto">
                                    <Button onClick={ () => handleCreateIem() } className='text-primary w-100' variant='letters' >
                                        <Icon className='mt-0' icon='MdOutlineNoteAdd' size={25} title='Nuevo item'/>
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
                                        <CardXRay history={ history } item={ item } key={ i } goTo={ handleGoToItem }/>
                                    ))
                                }
                            </Row>
                        </>
                    ) : (
                        <p>Tu cuenta aún no ha sido autorizada, por favor intenta más tarde.</p>
                    )
                }
            </div>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { AuthContext } from '../../../context/AuthContext';
import { HistoryInfo } from '../../../components/HistoryInfo';
import { CardXRay } from '../../../components/Card/CardXRay';
import ClientService from '../../../services/Client/clientService';

export const Content = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext)
    const { history } = user;
    const navigate = useNavigate()

    useEffect(() => {
        if( history ) {
            ClientService.getHistoryItems(history._id).then((response) => {
                setHistoryItems(response.items)
            })
        }
    }, [ history ])

    const handleGoToItem = ( id ) => {
        navigate(`${pathname}/item/${id}`)
    }
    
    return user && (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <h2 className='text-letters'>Tu Historial Radiográfico</h2>
                    </div>
                    <hr />
                    { history && <HistoryInfo client={ user } history={ history } historyItems={ historyItems } isClient /> }
                    <hr />
                </div>
                <div className="row text-letters mb-5">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <h3>{ historyItems.length === 0 ? 'Historial vacío' : `${ historyItems.length } elementos` }</h3>
                        { historyItems.length === 0 && <p>El historial no cuenta con items</p> }
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
            </div>
            </div>
        </>
    )
}

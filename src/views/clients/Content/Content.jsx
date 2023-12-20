import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { AuthContext } from '../../../context/AuthContext';
import { HistoryInfo } from '../../../components/HistoryInfo';
import { CardXRay } from '../../../components/Card/CardXRay';
import ClientService from '../../../services/Client/clientService';
import { DropdownFilterBodyPart } from '../../../components/Dropdown/DropdownFilterBodyPart';
import { useMutation } from '@tanstack/react-query';
import { defaultFilters } from '../../../helpers/defaultValues';
import { InputSearchDate } from '../../../components/input/InputSearchDate';

export const Content = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const [total, setTotal] = useState(0)
    const [filters, setFilters] = useState({ ...defaultFilters })
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext)
    const { history } = user;
    const navigate = useNavigate()
    const getHistoryItems = useMutation(
        () => ClientService.getHistoryItems( history._id, filters )
    )

    useEffect(() => {
        if( history ) {
            ClientService.getHistoryItems(history._id, filters).then((response) => {
                setHistoryItems(response.items)
                setTotal(response.total)
            })
        }
    }, [ history ])

    const handleGoToItem = ( id ) => {
        navigate(`${pathname}/item/${id}`)
    }
    
    const titleSection = () => {
        if( historyItems.length === 0 ){
            if( total > 0 ){
                return 'Sin resultados'
            }else{
                return'Historial vacio'
            }
        }else{
            return `${ historyItems.length } elementos`
        }
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
                        <h3>{ titleSection() }</h3>
                    </div>
                    <InputSearchDate 
                        setResult={ setHistoryItems }
                        filters={ filters }
                        setFilters={ setFilters }
                        getItems={ getHistoryItems }
                        setTotal={ setTotal }
                    />
                    <DropdownFilterBodyPart 
                        setResult={ setHistoryItems }
                        filters={ filters }
                        setFilters={ setFilters }
                        getItems={ getHistoryItems }
                        setTotal={ setTotal }
                    />
                    
                </div>
                <div>
                    { historyItems.length === 0 && total === 0&& <p>El historial no cuenta con items</p> }
                    { historyItems.length === 0 && total > 0 && <p>No se encontraron resultados</p> }
                </div>
                <Row
                    xs={ 1 }
                    md={ 2 }
                    lg={ 2 }
                    xl={ 4 }
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

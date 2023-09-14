import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';

import StadisticsService from '../../../services/Admin/stadisticService';
import { getStadisticsList } from '../../../helpers/cards-list';
import { CardStadistics } from '../../../components/Card/CardStadistics';

export const Stadistics = () => {
    const [stadistics, setStadistics] = useState({});

    const getStadistics = useMutation(
        () => StadisticsService.getStadistics()
    );

    useEffect(() => {
        !stadistics.cantUsers && getStadistics.mutateAsync().then((response) => {
            setStadistics(response);
            console.log(response, 'response');
        })

    }, [])
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className='text-letters'>Estadísticas del laboratorio</h2>
                    <hr />
                </div>
            </div>
            <Row
                xs={ 1 }
                sm={ 2 }
                md={ 3 }
                xl={ 5 }
                className='g-4 g-col-4'
            >
                {
                    getStadisticsList( stadistics ).map(( item, i ) => (
                        <CardStadistics 
                            item={ item } 
                            key={ i }
                            styles='bg-letters text-primary text-center shadow'
                        />
                    ))
                }
            </Row>
        </div>
    )
}

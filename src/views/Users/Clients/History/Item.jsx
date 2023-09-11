import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment';
import 'moment/locale/es';

import { HeaderSection } from '../../../../components/HeaderSection';
import ClientService from '../../../../services/User/clientService';
import noImage from '../../../../assets/img/no_image.jfif'
import { Icon } from '../../../../components/Icon';

const defaultItem = {
    img: noImage,
    default: true,
    creator: {}
}

export const Item = () => {
    const [item, setItem] = useState(defaultItem);
    const [creator, setCreator] = useState({})
    const { idItem } = useParams();
    const navigate = useNavigate();
    
    const getItem = useMutation(
        () => ClientService.getItem( idItem )
    );

    useEffect(() => {
        item.default && getItem.mutateAsync().then((response) => {
            setItem(response.item);
            setCreator( response.item.creator )
        })
    }, []);

    const handleGoToBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <div className="row">
                <HeaderSection title='Detalle de item' goTo={ handleGoToBack }/>
                <div className="col-12">
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-8">
                                <img src={item.img} className="img-fluid rounded-start" alt='test' />
                                <div class="card-img-overlay">
                                    <button class=" pb-2 p-1 btn btn-letters border border-letters rounded-circle">
                                        <Icon icon='BsArrowsFullscreen' size={15} color='primary' className='m-0 p-0' title='Pantalla completa'/>
                                    </button>
                                    
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card-body text-letters">
                                    <h5 className="card-title"><strong>id Item: </strong>{ item.id }</h5>
                                    <ul className='d-flex flex-column'>
                                        <li><strong>Parte del cuerpo:</strong></li>
                                        <li>{ item.bodyPart }</li>
                                        <li><strong>Descripción:</strong></li>
                                        <li>{ item.description }</li>
                                        <li><strong>Creado por:</strong></li>
                                        <li>{ creator.first_name } { creator.last_name }</li>
                                        <li><strong>Fecha de creación:</strong></li>
                                        <li>{ moment(item.createdAt).locale('es').fromNow() }, { moment(item.createdAt).locale('es').format('LLL') }</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

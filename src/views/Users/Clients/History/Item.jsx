import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import moment from 'moment/moment';
import 'moment/locale/es';

import { HeaderSection } from '../../../../components/HeaderSection';
import { Icon } from '../../../../components/Icon';
import { StateContext } from '../../../../context/stateProvider';
import { AuthContext } from '../../../../context/AuthContext';
import { ButtonDownloader } from '../../../../components/Button/ButtonDownloader';
import noImage from '../../../../assets/img/no_image.jfif'
import ClientServiceForUser from '../../../../services/User/clientService';
import ClientServiceForClient from '../../../../services/Client/clientService';
import config from '../../../../config/variables';

const defaultItem = {
    img: noImage,
    default: true,
    creator: {}
}

export const Item = () => {
    const [item, setItem] = useState(defaultItem);
    const [creator, setCreator] = useState({})
    const { idItem } = useParams();
    const { dispatch } = useContext( StateContext );
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    //? Para cuando un radiologo desea ver un item
    const getItemForUser = useMutation(
        () => ClientServiceForUser.getItem( idItem )
    );

    //? Para cuando un cliente desea ver un item
    const getItemForClient = useMutation(
        () => ClientServiceForClient.getItem( idItem )
    );

    useEffect(() => {
        user.role === 'USER_ROLE' && item.default && getItemForUser.mutateAsync().then((response) => {
            console.log(response, 'response')            
            setItem(response.item);
            setCreator( response.item.creator )
        })

        user.role === 'CLIENT_ROLE' && item.default && getItemForClient.mutateAsync().then((response) => {
            setItem(response.item);
            setCreator( response.item.creator )
        })
    }, [ user ]);

    const handleGoToBack = () => {
        navigate(-1);
    };

    const handleShowFullScreen = ( item ) => {
        const modalData = {
            imgSource: item.img,
            alt: `imagen radiográfica`
        }

        dispatch({ type: 'showModalFullScreenRadio', payload: true });
        dispatch({ type: 'setDataModalFullScreenRadio', payload: modalData });
    }

    const handleShareItem = ( id ) => {
        const { host_url } = config.urls;
        const dataModal = {
            link: `${ host_url }medic/item/${ id }`
        }

        dispatch({ type: 'showModalShareLink', payload: true });
        dispatch({ type: 'setDataModal', payload: dataModal });

    }

    return (
        <div className="container">
            <div className="row">
                <HeaderSection title='Detalle de item' goTo={ handleGoToBack }/>
                <div className="col-12">
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-lg-8">
                                <img src={item.img} className="img-fluid rounded-start" alt='test' />
                                <div className="card-img-overlay w-50 h-25">
                                    <button className=" pb-2 p-1 btn btn-letters border border-letters rounded-circle" onClick={ () => handleShowFullScreen( item ) }>
                                        <Icon 
                                            icon='BsArrowsFullscreen' 
                                            size={15} 
                                            color='primary' 
                                            className='mx-2 p-0'
                                            title='Pantalla completa'
                                        />
                                    </button>
                                    
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card-body text-letters">
                                    <h5 className="card-title"><strong>id Item: </strong>{ item.id }</h5>
                                    <ul className='d-flex flex-column'>
                                        <li><strong>Parte del cuerpo:</strong></li>
                                        <li>{ item?.bodyPart || 'No cuenta' }</li>
                                        <li><strong>Descripción:</strong></li>
                                        <li>{ item?.description || 'No cuenta' }</li>
                                        <li><strong>Creado por:</strong></li>
                                        <li>{ creator?.first_name || 'item por defecto' } { creator?.last_name || '' }</li>
                                        <li><strong>Fecha de creación:</strong></li>
                                        <li>{ moment(item.createdAt).locale('es').fromNow() }, { moment(item.createdAt).locale('es').format('LLL') }</li>
                                    </ul>
                                    <hr />
                                    {
                                        user.role === 'CLIENT_ROLE' && (
                                            <Button
                                                variant='letters'
                                                className='shadow-sm text-primary pe-3 w-100 my-2'
                                                onClick={ () => handleShareItem(item.id) }
                                            >
                                                <Icon icon='BsShareFill' title='Compartir' size={20} className='mx-2'/>
                                                Compartir con médico
                                            </Button>
                                        )
                                    }
                                    <ButtonDownloader 
                                        imgSrc={ item.download } 
                                        created={ item.createdAt }
                                        styles='btn btn-light text-letters pe-3 w-100 shadow-sm'
                                        iconColor='letters'
                                        iconTitle='Descargar'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

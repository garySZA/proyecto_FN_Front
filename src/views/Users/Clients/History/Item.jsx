import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { StateContext } from '../../../../context/stateProvider';
import { AuthContext } from '../../../../context/AuthContext';

import { HeaderSection } from '../../../../components/HeaderSection';
import { Icon } from '../../../../components/Icon';
import { ButtonDownloader } from '../../../../components/Button/ButtonDownloader';
import { AccordionInfoItem } from '../../../../components/Accordion/AccordionInfoItem';
import { AccordionValoration } from '../../../../components/Accordion/AccordionValoration';
import { ButtonDownloadPDF } from '../../../../components/Button/ButtonDownloadPDF';

import { CreateValoration } from '../../../Medic/Patients/CreateValoration';
import noImage from '../../../../assets/img/no_image.jfif'
import ClientServiceForUser from '../../../../services/User/clientService';
import ClientServiceForClient from '../../../../services/Client/clientService';
import ValorationsService from '../../../../services/Medic/valorationsService';
import config from '../../../../config/variables';

const defaultItem = {
    img: noImage,
    default: true,
    creator: {}
}

export const Item = () => {
    const [item, setItem] = useState(defaultItem);
    const [creator, setCreator] = useState({});
    const [valoration, setValoration] = useState({});
    const [showFormCreateValoration, setShowFormCreateValoration] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [editing, setEditing] = useState(false);
    const { idItem } = useParams();
    const { dispatch } = useContext( StateContext );
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const scrollToRef = useRef(null);
    const scrollToRefTop = useRef(null);
    
    //? Para cuando un radiologo desea ver un item
    const getItemForUser = useMutation(
        () => ClientServiceForUser.getItem( idItem )
    );

    //? Para cuando un cliente desea ver un item
    const getItemForClient = useMutation(
        () => ClientServiceForClient.getItem( idItem )
    );

    //? Para cuando un cliente desea ver un item
    const getItemForMedic = useMutation(
        () => ValorationsService.getItem( idItem )
    );

    const getValorationRoleMedic = useMutation(
        () => ValorationsService.getValoration( idItem )
    );

    const getValorationRoleClient = useMutation(
        () => ClientServiceForClient.getValoration( idItem )
    );

    useEffect(() => {
        user.role === 'USER_ROLE' && item.default && getItemForUser.mutateAsync().then((response) => {
            console.log(response, 'response')            
            setItem(response.item);
            setCreator( response.item.creator )
        });

        user.role === 'CLIENT_ROLE' && item.default && getItemForClient.mutateAsync().then((response) => {
            setItem(response.item);
            setCreator( response.item.creator )
        });

        user.role === 'MEDIC_ROLE' && item.default && getItemForMedic.mutateAsync().then((response) => {
            setItem(response.item);
            setCreator( response.item.creator )
        })

        user.role.length > 0 && !valoration.id && ( user.role === 'MEDIC_ROLE' ? getValorationRoleMedic : getValorationRoleClient ).mutateAsync().then((response) => {
            setValoration(response.valoration);
        }).catch((reason) => {
            reason.response.data.msg === 'Valoración no encontrado' ? 
                setShowFormCreateValoration(true)
            : console.log(reason)
        })

    }, [ user ]);

    useEffect(() => {
        isUpdated && getValorationRoleMedic.mutateAsync().then((response) => {
            setValoration(response.valoration);
        })
    }, [isUpdated])

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
            link: `${ host_url }medic/patients/${ user.uid }/item/${ id }`
        }

        dispatch({ type: 'showModalShareLink', payload: true });
        dispatch({ type: 'setDataModal', payload: dataModal });

    }

    const handleNewValoration = () => {        
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    
    const handleEditValoration = () => {
        setShowFormCreateValoration( true );
        setEditing( true );
        setTimeout(() => {
            
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 200);
    }

    return (
        <div 
            className="container"
            data-aos="fade-up"
            ref={ scrollToRefTop }
        >
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
                <HeaderSection title='Detalle de item' goTo={ handleGoToBack }/>
                {
                    !user.pending ? (

                        <div className="col-12">
                            <div className="card mb-3" >
                                <div className="row g-0">
                                    <div className="col-lg-6">
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
                                    <div className="col-lg-6">
                                        <div className="card-body text-letters">
                                            <AccordionInfoItem creator={ creator } item={ item }/>
                                            <hr />
                                            { valoration.id && (<>
                                                <AccordionValoration valoration={ valoration }/>
                                                <hr />
                                            </>) }
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
                                            {
                                                user.role === 'MEDIC_ROLE' && showFormCreateValoration && !editing && (
                                                    <Button
                                                        variant='letters'
                                                        className='shadow-sm text-primary pe-3 w-100 my-2'
                                                        onClick={ handleNewValoration }
                                                    >
                                                        <Icon icon='VscNewFile' title='Compartir' size={20} className='mx-2'/>
                                                        Realizar una valoración
                                                    </Button>
                                                )
                                            }
                                            {
                                                user.role === 'MEDIC_ROLE' && valoration.id && valoration.medic.uid === user.uid && (
                                                    <Button
                                                        variant='letters'
                                                        className='shadow-sm text-primary pe-3 w-100'
                                                        onClick={ handleEditValoration }
                                                    >
                                                        <Icon icon='MdModeEdit' title='Compartir' size={20} className='mx-2'/>
                                                        Editar valoración
                                                    </Button>
                                                )
                                            }
                                            {
                                                valoration.id && (
                                                    <ButtonDownloadPDF 
                                                        idValoration={ valoration.id } 
                                                        toast={ toast }
                                                    />
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
                    ) : (
                        <p>Tu cuenta aún no ha sido autorizada, por favor intenta mas tarde.</p>
                    )
                }
                <div className="col-12" ref={ scrollToRef }>
                    { user.role === 'MEDIC_ROLE' && showFormCreateValoration && <CreateValoration setIsUpdated={ setIsUpdated } toast={ toast } setShow={ setShowFormCreateValoration } edit={ editing } setEdit={ setEditing } valoration={ valoration } scroll={ scrollToRefTop }/> }
                </div>
            </div>
        </div>
    )
}

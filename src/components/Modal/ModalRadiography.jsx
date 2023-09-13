import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { StateContext } from '../../context/stateProvider';

import './styles.css'

export const ModalRadiography = () => {
    const { state, dispatch } = useContext( StateContext );
    const [show, setShow] = useState( state.showModalFullScreenRadio );
    const item = state.dataModalFullScreenRadio

    const handleClose = () => {
        dispatch({ type: 'showModalFullScreenRadio', payload: false });
    }

    return (
        <Modal show={ show } onHide={ handleClose } dialogClassName='fullscreen-modal' fullscreen={ true }>
            <Modal.Header closeButton/>
            <Modal.Body className='mx-auto'>
                <img src={ item.imgSource } alt={ item.alt } className='img-fluid' />
            </Modal.Body>
        </Modal>
    )
}

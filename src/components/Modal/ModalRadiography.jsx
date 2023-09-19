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
        console.log('clickando')
    }

    return (
        <Modal show={ show } onHide={ handleClose } dialogClassName='fullscreen-modal' fullscreen={ true }>
            <Modal.Header>
                <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>

            </Modal.Header>
            <Modal.Body className='mx-auto'>
                <img src={ item.imgSource } alt={ item.alt } className='img-fluid' />
            </Modal.Body>
        </Modal>
    )
}

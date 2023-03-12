import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, ProgressBar } from 'react-bootstrap'

import { StateContext } from '../context/stateProvider'

export const ModalInfo = () => {
    const { state, dispatch } = useContext( StateContext );

    const [show, setShow] = useState(state.showModalScreen);
    
    const handleClose = () => {
        dispatch({ type: 'showModalScreen', payload: false });
        dispatch({ type: 'setDataModal', payload: {} });
    };

    const handleShow = () => dispatch({ type: 'showModalScreen', payload: true });;

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         handleClose();
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, [])

    const { title, content } = state.dataModal;

    return (
        <>
            <Modal show={ show } onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> { title } </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { content }
                </Modal.Body>
                <Modal.Footer>
                    <Button className='text-primary rounded-pill' variant="secondary" onClick={ handleClose }>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

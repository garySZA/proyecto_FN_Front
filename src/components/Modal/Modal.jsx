import React, { useContext, useState } from 'react'
import { StateContext } from '../../context/stateProvider'
import { Modal, Button } from 'react-bootstrap'

export const ModalGeneric = () => {
    const { state, dispatch } = useContext( StateContext );
    const [show, setShow] = useState( state.showModalScreen );
    const { title, content, buttons = [], element, session_expired } = state.dataModal;

    const handleClose = () => {
        dispatch({ type: 'showModalScreen', payload: false });
        dispatch({ type: 'setDataModal', payload: {} });

        session_expired ? localStorage.setItem('session_expired', false) : ''
    }

    return (
        <>
            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { content }
                </Modal.Body>
                <Modal.Footer>
                    {
                        buttons.map((item, i) => (
                            <Button 
                                className={`text-${ item.letter_color } rounded-pill`} 
                                variant={ item.color } 
                                onClick={ item.action != null ? () => item.action( element ) : handleClose } 
                                key={i}
                            >
                                { item.title }
                            </Button>
                        ))
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

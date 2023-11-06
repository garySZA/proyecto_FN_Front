import React, { useContext, useState } from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { StateContext } from '../../context/stateProvider';
import { Icon } from '../Icon';

export const ModalShareLink = () => {
    const { dispatch, state } = useContext(StateContext);
    const [show, setShow] = useState(state.showModalShareLink);
    const [copySuccess, setCopySuccess] = useState(false);
    const { link } = state.dataModal;

    const onHide = () => {
        dispatch({ type: 'showModalShareLink', payload: false });
        dispatch({ type: 'setDataModal', payload: {} });
    }

    const handleCopyClick = () => {
        setCopySuccess(true);
    };

    return (
        <Modal show={ show } onHide={ onHide } centered>
            <Modal.Header closeButton>
                <Modal.Title>Compartir con un médico</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Copia el siguiente enlace y envíalo a un médico registrado en la plataforma para que pueda ver este item y/o realizar una valoración.
                </p>
                <InputGroup className='mb-3'>
                    <FormControl
                        value={ link }
                        className='text-letters'
                        readOnly
                    />
                    <CopyToClipboard text={ link } onCopy={ handleCopyClick }>
                        <Button variant='letters'>
                            <Icon icon='AiOutlineCopy' color='primary' title='Copiar'/>
                        </Button>
                    </CopyToClipboard>
                </InputGroup>
                { copySuccess && <small className='text-success'>Enlace copiado</small> }
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-letters text-primary' onClick={ onHide } >Aceptar</Button>
            </Modal.Footer>
        </Modal>
    )
}

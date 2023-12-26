import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { StateContext } from '../../context/stateProvider'
import { verifyPasswordSchema } from '../../helpers/schemas-forms';
import { defaultValuesVerifyPWD } from '../../helpers/defaultValues';
import { Input } from '../input/Input';
import AuthService from '../../services/authService';
import { ToastContainer, toast } from 'react-toastify';

export const ModalCheckPassword = () => {
    const { state, dispatch } = useContext( StateContext );
    const navigate = useNavigate();
    const [show, setShow] = useState( state.showModalConfirmPWDScreen )
    const form = useForm({
        resolver: yupResolver( verifyPasswordSchema ),
        defaultValues: defaultValuesVerifyPWD,
    })

    const { buttons = [], goTo, close, verifySuccess } = state.dataModal;
    
    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AuthService.verifyPassword( data )
            .then( response => {
                handleClose();
                close ? verifySuccess.action() && handleClose() : navigate( goTo );
            })
            .catch( (reason) => {
                console.log(reason, 'error al verificar la cuenta');
                toast.error('Contraseña incorrecta');
            })
            .finally( () => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onError')
    }

    const handleClose = () => {
        dispatch({ type: 'showModalConfirmPWDScreen', payload: false });
        dispatch({ type: 'setDataModal', payload: {} });
    }

    return (
        <>
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
            <Modal style={{zIndex:1050}} show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title> Verificar Contraseña </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Por favor ingresa tu contraseña para poder realizar esta acción.
                    </p>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            <div className="row mt-4">
                                <div className="col-12 col-md-7 mx-auto">
                                    <Input 
                                        name='password'
                                        type='password'
                                        placeholder='************'
                                        label='Contraseña'
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 col-md-7 mx-auto">
                                    <input 
                                        type="submit"
                                        value='Verificar'
                                        className='btn btn-secondary text-primary w-100 rounded-pill'
                                    />
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={ `text-${ buttons[0].letter_color } rounded-pill` }
                        variant={ buttons[0].color }
                        onClick={ buttons[0].action != null ? () => buttons[0].action : handleClose }
                    >
                        { buttons[0].title }
                    </Button>                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

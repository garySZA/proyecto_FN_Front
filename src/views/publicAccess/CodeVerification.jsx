import React, { useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import * as yup from 'yup'

import { defaultValuesCodeVerification } from '../../helpers/defaultValues'
import { Input } from '../../components/input/Input'
import { useNavigate, useParams } from 'react-router-dom'
import { StateContext } from '../../context/stateProvider'
import PasswordService from '../../services/passwordService'

const schema = yup.object().shape({
    codeVerification: yup.number()
                        .required('Debes ingresar un código de verificación')
})

export const CodeVerification = () => {
    const { idPetition } = useParams();
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValuesCodeVerification
    })
    
    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await PasswordService.verifyCode({ ...data, _id: idPetition })
            .then(( response ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });
                
                navigate(`/forgot_password/${idPetition}/reset_pwd`);
            })
            .catch(( reason ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });

                let message = 'error verificando el código de seguridad';
                
                switch ( reason.response.data.msg ) {
                    case 'PETITION_USED':
                        message = 'El código de seguridad ya fue utilizado. Genera un nuevo código e intenta nuevamente'
                        break;
                    case 'CODE_VERIFICATION_INVALID':
                        message = 'Código de seguridad inválido. Genera un nuevo código'
                }
                
                toast.error( message );
            })
    }

    const onError = () => {
        console.log('onError')
    }

    const handleGoToBack = () => {
        navigate('/login');
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
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
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-4 mx-auto shadow-lg px-5">
                    <h2 className='text-center text-titles m-5'>Verificación de Código</h2>
                    <p>
                        Ingresa el código de seguridad enviado al email registrado en tu cuenta.
                    </p>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            <Input 
                                name='codeVerification'
                                type='number'
                                placeholder='Código'
                            />
                            <div className='d-flex justify-content-center'>
                                <input 
                                    type="submit" 
                                    value='Verificar'
                                    className='btn btn-secondary w-75 rounded-pill mt-3 shadow-sm text-primary'
                                />
                            </div>
                        </form>
                    </FormProvider>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className='btn btn-light rounded-pill shadow-sm w-75 my-3'
                            onClick={ handleGoToBack }
                        >   
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

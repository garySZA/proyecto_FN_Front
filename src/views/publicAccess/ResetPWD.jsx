import React, { useContext, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { NavLink, useParams } from 'react-router-dom'
import { StateContext } from '../../context/stateProvider'

import { resetPasswordSchema } from '../../helpers/schemas-forms'
import { defaultValuesResetPWD } from '../../helpers/defaultValues'
import { Input } from '../../components/input/Input'
import PasswordService from '../../services/passwordService'

export const ResetPWD = () => {
    const { dispatch } = useContext(StateContext);
    const { idPetition } = useParams();
    const [isReseted, setIsReseted] = useState(false);
    const form = useForm({
        resolver: yupResolver( resetPasswordSchema ),
        defaultValues: defaultValuesResetPWD
    });

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await PasswordService.resetPWD({...data, idPetition })
            .then(( response ) => {
                toast.success('Tu contraseña ha sido cambiada correctamente')
                setIsReseted(true);
            })
            .catch(( reason ) => {
                let message = 'error verificando el código de seguridad';
                
                switch ( reason.response.data.msg ) {
                    case 'PETITION_USED':
                        message = 'El código de seguridad ya fue utilizado. Genera un nuevo código e intenta nuevamente'
                        break;
                }
                
                toast.error( message );
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onError')
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
                    <h2 className='text-center text-titles m-5'>Restablecer Contraseña</h2>
                    {
                        !isReseted ? 
                    <>
                        <p>
                            Ingresa una nueva contraseña para tu cuenta.
                        </p>
                        <FormProvider { ...form }>
                            <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                                <Input 
                                    name='password'
                                    type='password'
                                    placeholder='Contraseña'
                                />
                                <Input 
                                    name='repeat_password'
                                    type='password'
                                    placeholder='Repetir la contraseña'
                                />
                                <div className="d-flex justify-content-center">
                                    <input 
                                        type="submit" 
                                        value='Cambiar'
                                        className='btn btn-secondary w-75 rounded-pill mt-3 text-primary'
                                    />
                                </div>
                            </form>
                        </FormProvider>
                        <div className="d-flex justify-content-center">
                            <NavLink
                                className='btn w-75 my-3'
                                to={'/login'}
                            >
                                Cancelar
                            </NavLink>
                        </div>
                    </>
                    : <>
                        <p>Tu contraseña fue actualizada correctamente, por favor inicia sesión con la nueva contraseña.</p>
                        <div className="d-flex justify-content-center mb-5">
                            <NavLink
                                className='btn btn-secondary w-75 rounded-pill mt-3 text-primary'
                                to={'/login'}
                            >
                                Iniciar sesión
                            </NavLink>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

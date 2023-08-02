import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { NavLink } from 'react-router-dom'

import { resetPasswordSchema } from '../../helpers/schemas-forms'
import { defaultValuesResetPWD } from '../../helpers/defaultValues'
import { Input } from '../../components/input/Input'

export const ResetPWD = () => {
    const form = useForm({
        resolver: yupResolver( resetPasswordSchema ),
        defaultValues: defaultValuesResetPWD
    });

    const onSubmit = async ( data ) => {
        console.log('onsubmit')
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
                    <p>
                        Ingresa una nueva contraseña para tu cuenta.
                    </p>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            <Input 
                                name='password'
                                type='text'
                                placeholder='Contraseña'
                            />
                            <Input 
                                name='repeat_password'
                                type='text'
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
                </div>
            </div>
        </div>
    )
}

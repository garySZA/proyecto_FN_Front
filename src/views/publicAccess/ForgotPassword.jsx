import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { StateContext } from '../../context/stateProvider'

import { Input } from '../../components/input/Input'
import PasswordService from '../../services/passwordService'
import { ToastContainer, toast } from 'react-toastify'

const schema = yup.object().shape({
    email: yup.string()
                .required('El campo es requerido.')
                .email('El email ingresado no es válido')
});

const defaultValues = {
    email: ''
}

export const ForgotPassword = () => {
    const { dispatch } = useContext( StateContext );
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver( schema ),
        defaultValues
    })

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });
        
        await PasswordService.create( data )
            .then( res => {
                dispatch({ type: 'showLoaderScreen', payload: false });

                navigate(`/forgot_password/${res.petitionId}`)
            })
            .catch(( reason ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });
                console.log(reason, 'error buscando la cuenta con el email')
                toast.error('No existe una cuentra registrada con el email ingresado')
            })
    }

    const onError = () => {
        console.log('onError')
    }

    const handleGoToBack = () => {
        navigate('/');
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
                        <h2 className='text-center text-titles m-5'>Restablecer contraseña</h2>
                        <p>
                            Para poder encontrar tu cuenta, por favor ingresa el email registrado.
                        </p>
                        <FormProvider { ...form }>
                            <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                                <Input 
                                    name='email'
                                    type='text'
                                    placeholder='Email'
                                />
                                <div className='d-flex justify-content-center'>
                                    <input 
                                        type="submit"
                                        value='Buscar'
                                        className='btn btn-secondary w-75 rounded-pill mt-3 text-primary shadow-sm'
                                    />
                                </div>
                            </form>
                        </FormProvider>
                        <div className='d-flex justify-content-center'>
                            <Button
                                className='btn btn-light w-75 my-3 rounded-pill shadow-sm'
                                to={ '/login' }
                            >
                                Volver
                            </Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}   

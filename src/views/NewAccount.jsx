import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

import { Input } from '../components/input/Input'

import { newUserSchema } from '../helpers/schemas-forms'
import { userDefaultValues } from '../helpers/defaultValues'
import { NavLink } from 'react-router-dom'

export const NewAccount = () => {
    const form = useForm({
        resolver: yupResolver( newUserSchema ),
        defaultValues: userDefaultValues,
    });
    
    const onSubmit = async ( data ) => {
        console.log('submit', data);
    }

    const onError = () => {
        console.log('error')
    }

    return (
        <div
            className='container vh-100 d-flex justify-content-center align-items-center'
        >
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
            <div
                className='row my-auto w-100 bg-primary'
            >
                <div
                    className='col-12 col-md-8 col-xl-6 mx-auto shadow-lg px-5'
                >
                    <h2
                        className='text-center text-titles m-5'
                    >
                        Crear cuenta
                    </h2>
                    <FormProvider {...form}>
                        <form
                            onSubmit={ form.handleSubmit( onSubmit, onError ) }
                        >
                            <div className="row">
                                <div className="col-6">
                                    <Input 
                                        name='first_name'
                                        type='text'
                                        placeholder='Juan'
                                        label='Nombre(s)'
                                    />
                                </div>
                                <div className="col-6">
                                    <Input 
                                        name='last_name'
                                        type='text'
                                        placeholder='Flores'
                                        label='Apellido(s)'
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Input 
                                        name='date'
                                        type='text'
                                        placeholder='07/10/1997'
                                        label='Fecha de nacimiento'
                                    />
                                </div>
                                <div className="col-6">
                                    <Input 
                                        name='gender'
                                        type='text'
                                        placeholder='Masculino'
                                        label='Género'
                                    />
                                </div>
                                <Input 
                                    name='email'
                                    type='email'
                                    placeholder='Juan@gmail.com'
                                    label='Email'
                                />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Input 
                                        name='password'
                                        type='password'
                                        placeholder='*********'
                                        label='Contraseña'
                                    />
                                </div>
                                <div className="col-6">
                                    <Input 
                                        name='repeat_password'
                                        type='password'
                                        placeholder='*********'
                                        label='Contraseña'
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Input 
                                        name='phone'
                                        type='number'
                                        placeholder='67573722'
                                        label='Teléfono'
                                    />
                                </div>
                                <div className="col-6">
                                    <Input 
                                        name='ci'
                                        type='number'
                                        placeholder='14113578'
                                        label='C.I.'
                                    />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <NavLink
                                    className='btn w-50'
                                    to={ '/' }
                                >
                                    Volver
                                </NavLink>
                                <input 
                                    type="submit" 
                                    value='Crear'
                                    className='btn btn-secondary w-50 rounded-pill'
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

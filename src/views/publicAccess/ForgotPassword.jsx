import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../../components/input/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { NavLink } from 'react-router-dom'

const schema = yup.object().shape({
    parameter: yup.string()
                .required('El campo es requerido.')
});

const defaultValues = {
    parameter: ''
}

export const ForgotPassword = () => {
    const form = useForm({
        resolver: yupResolver( schema ),
        defaultValues
    })

    const onSubmit = () => {
        console.log('onsubmit');
    }

    const onError = () => {
        console.log('onError')
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-4 mx-auto shadow-lg px-5">
                    <h2 className='text-center text-titles m-5'>Restablecer contraseña</h2>
                    <p>
                        Para poder encontrar tu cuenta, por favor ingresa el email registrado o nùmero de celular.
                    </p>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            <Input 
                                name='parameter'
                                type='text'
                                placeholder='Email/Nro de Celular'
                            />
                            <div className='d-flex justify-content-center'>
                                <input 
                                    type="submit"
                                    value='Buscar'
                                    className='btn btn-secondary w-75 rounded-pill mt-3 text-primary'
                                />
                            </div>
                        </form>
                    </FormProvider>
                    <div className='d-flex justify-content-center'>
                        <NavLink
                            className='btn w-75 my-3'
                            to={ '/login' }
                        >
                            Volver
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}   

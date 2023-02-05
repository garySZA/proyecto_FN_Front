import React, { useContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { StateContext } from '../context/stateProvider';
import { validarEmail } from '../helpers/validators';
import { AuthContext } from '../context/AuthContext.jsx';
import { Input } from '../components/input/Input';

const schema = yup.object().shape({
    email: yup.string()
        .email('El email ingresado no es válido')
        .required('El email es requerido'),

    password: yup.string()
        .min(8, 'La contraseña debe tener almenos 8 caracteres')
        .required('La contraseña es requerida')
});

const defaultValues = {
    email: '',
    password: ''
};

export const Login = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const form = useForm({
        resolver: yupResolver( schema ),
        defaultValues: defaultValues,
    });

    const { state, dispatch } = useContext(StateContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    
    const onSubmit = ( data ) => {
        console.log(data)
        dispatch({ type: 'setClients', payload: listClients })
        state.listClients
    }

    const onError = ( error ) => {
        console.log('error', error);
    }

    const handleOnBack = () => {
        navigate('/');
    }
    
    return (
        <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-4 mx-auto shadow-lg px-5">
                    <h2 
                    className='text-center text-titles m-5'
                    >
                        Iniciar Sesión
                    </h2>
                    <FormProvider {...form}>
                        <form onSubmit={ form.handleSubmit(onSubmit, onError) }>
                            <Input 
                                name='email'
                                type='email'
                                placeholder='tuemail@ejemplo.com'
                                label='Email'
                            />
                            <Input 
                                name='password'
                                type='password'
                                placeholder='tu contraseña'
                                label='Contraseña'
                            />
                            <small className='text-titles'>He olvidado mi contraseña</small>
                            <div className='d-flex justify-content-center'>
                                <input 
                                    type="submit" 
                                    value='Acceder'
                                    className='btn btn-secondary w-75 rounded-pill mt-3'
                                />

                            </div>
                        </form>
                    </FormProvider>
                    <div className='d-flex justify-content-center'>
                        <button
                            className='btn w-75 mb-2'
                            onClick={ () => handleOnBack }
                        >
                            Volver
                        </button>
                    </div>
                    <small
                        className='text-titles'
                    >
                        Aún no tienes una cuenta? <NavLink className='text-secondary' to={'/new_account'}>Crear cuenta aquí</NavLink>
                    </small>
                </div>
            </div>
        </div>
    )
}

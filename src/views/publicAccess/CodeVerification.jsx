import React, { useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import * as yup from 'yup'

import { defaultValuesCodeVerification } from '../../helpers/defaultValues'
import { Input } from '../../components/input/Input'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { StateContext } from '../../context/stateProvider'
import PasswordService from '../../services/passwordService'

const schema = yup.object().shape({
    codeVerification: yup.number()
                        .required('Debes ingresar un código de verificación')
})

//revisar flujo, mas que todo la query que se hace para obtener la peticion deberia llegar el id de la peticion

export const CodeVerification = () => {
    const { id } = useParams();
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValuesCodeVerification
    })
    
    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await PasswordService.verifyCode({ ...data, _id: id })
            .then(( response ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });
                
                navigate(`/forgot_password/${id}/${response.petitionDB}`);
            })
            .catch(( reason ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });
                console.log(reason, 'error verificando el código de seguridad');
                toast.error('El código ingresado es inválido');
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
                                    value='verificar'
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
                            Cancelar
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

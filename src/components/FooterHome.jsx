import React, { useContext } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { FaAdn, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'

import { StateContext } from '../context/stateProvider'

import { contactFormDefaultValues } from '../helpers/defaultValues'
import { newContactSchema } from '../helpers/schemas-forms'
import { Input } from './input/Input'
import { InputArea } from './input/InputArea'

import ContactService from '../services/contactService'

const modalInfo = {
    title: 'Listo!',
    content: 'Los datos han sido enviados correctamente, recibirá una respuesta en el correo ingresado lo mas antes posible. Gracias!',
    buttons: [{
        title: 'Entendido',
        color: 'secondary',
        letter_color: 'primary'
    }]
}

export const FooterHome = () => {
    const form = useForm({
        resolver: yupResolver( newContactSchema ),
        defaultValues: contactFormDefaultValues
    });

    const { dispatch } = useContext(StateContext);

    const onSubmit = async ( data ) => {
        
        dispatch({ type: 'showLoaderScreen', payload: true });
        
        await ContactService.create( data )
            .then( res => {
                dispatch({ type: 'showLoaderScreen', payload: false });

                dispatch({ type: 'showModalScreen', payload: true });
                dispatch({ type: 'setDataModal', payload: modalInfo });

                form.reset();
            })
            .catch(( e ) => {
                dispatch({ type: 'showLoaderScreen', payload: false });
                console.log(e)
                toast.error('Ocurrió un problema. Por favor vuelte a intentarlo más tarde.')
            })

    }

    const onError = () => {
        toast.error('Por favor llena los campos correctamente y vuelve a intentar.')
    }
    
    return (
        <>
            <footer className='bg-letters'>
                <div className="container">
                    <div className="row py-5">
                        <div className="col-12 col-lg-6 col-xl-4 mx-auto d-flex justify-content-center align-items-center flex-column order-lg-first">
                            <h2
                                className='text-primary'
                            >
                                Estudio de Rayos X S.R.L.
                            </h2>
                            <ul className='w-50'>
                                <li className='fs-3'>
                                    <a 
                                        href="http://www.google.com"
                                        target='_blank'
                                        className='text-primary'
                                    >
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li className='fs-3'>
                                    <a 
                                        href="http://www.google.com"
                                        target='_blank'
                                        className='text-primary'
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li className='fs-3'>
                                    <a 
                                        href="http://www.google.com"
                                        target='_blank'
                                        className='text-primary'
                                    >
                                        <FaTiktok />
                                    </a>
                                </li>
                                <li className='fs-3'>
                                    <a 
                                        href="http://www.google.com"
                                        target='_blank'
                                        className='text-primary'
                                    >
                                        <FaWhatsapp />
                                    </a>
                                </li>
                            </ul>
                            <small
                                className='text-primary'
                            >
                                Derechos reservados &copy;
                            </small>
                        </div>
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
                        >
                        </ToastContainer>
                        <div className="col-12 col-lg-6 col-xl-4 mx-auto mb-5 mb-lg-0 order-first">
                            
                            <h2
                                className='text-primary'
                            >
                                Contáctanos
                            </h2>
                            <FormProvider { ...form }>
                                <form
                                    onSubmit={ form.handleSubmit( onSubmit, onError ) }
                                >
                                    <Input 
                                        name='emailClient'
                                        type='email'
                                        placeholder='tu_email@gmail.com'
                                        label='Email'
                                        colorPlaceholder='inputFooter'
                                        colorLabel='primary'
                                    />
                                    <InputArea
                                        name='text'
                                        placeholder='tu duda aqui...'
                                        label='Cual es tu duda'
                                        colorPlaceholder='inputFooter'
                                        colorLabel='primary'
                                    />
                                    <input 
                                        type='submit'
                                        value='Enviar'
                                        className='btn btn-secondary w-100 rounded-pill text-primary'
                                    />
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

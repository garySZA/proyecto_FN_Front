import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import { FaAdn, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { contactFormDefaultValues } from '../helpers/defaultValues'
import { newContactSchema } from '../helpers/schemas-forms'
import { Input } from './input/Input'
import { InputArea } from './input/InputArea'

export const FooterHome = () => {
    const form = useForm({
        resolver: yupResolver( newContactSchema ),
        defaultValues: contactFormDefaultValues
    });

    const onSubmit = () => {
        console.log('submit')
    }

    const onError = () => {
        console.log('error en submit')
    }
    
    return (
        <>
            <footer className='bg-letters fixed-bottom'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2
                                className='text-primary'
                            >
                                Estudio de Rayos X S.R.L.
                            </h2>
                            <ul>
                                <li>
                                    <a 
                                        href="http://www.google.com"
                                        className='text-primary'
                                    >
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="http://www.google.com"
                                        className='text-primary'
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="http://www.google.com"
                                        className='text-primary'
                                    >
                                        <FaTiktok />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="http://www.google.com"
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
                        <div className="col">
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
                                        name='email'
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

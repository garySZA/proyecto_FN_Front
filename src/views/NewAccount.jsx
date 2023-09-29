import React, { useContext, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import moment from 'moment/moment'

import { Input } from '../components/input/Input'
import { InputRadio } from '../components/input/InputRadio'
import { InputDate } from '../components/input/InputDate'

import { newUserSchema } from '../helpers/schemas-forms'
import { userDefaultValues } from '../helpers/defaultValues'
import { genderOptions } from '../helpers/optionsRadioBtn'
import { StateContext } from '../context/stateProvider'
import { setFormErrorsFromServer } from '../helpers/form'
import UserService from '../services/public/userService'

export const NewAccount = () => {
    const form = useForm({
        resolver: yupResolver( newUserSchema ),
        defaultValues: userDefaultValues,
    });
    
    const { dispatch } = useContext(StateContext);
    const navigate = useNavigate();

    const [limitDate, setLimitDate] = useState('');
    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('YYYY-MM-DD');

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });
        
        await UserService.create( data )
            .then( res => {
                toast.success("¡Cuenta creada exitosamente!", { autoClose: 3050 })
                setTimeout(() => {
                    navigate('/login');
                }, 4000);
            })
            .catch(( reason ) => {
                console.log(reason, 'error al crear la cuenta')
                setFormErrorsFromServer( reason, form.setError, form.setFocus );
                reason.response.data.errors.forEach(( error ) => {
                    toast.error(error.msg)
                })
            })
            .finally(() => {
                dispatch({ type: "showLoaderScreen", payload: false });
            })
    }

    const onError = () => {
        console.log('error')
    }

    const handleOnChangeDate = (e) => {
        if( e.target.value ){
            const dateChange = moment(e.target.value)
                .utcOffset(0)
                .format('YYYY-MM-DD');
            
            setLimitDate(dateChange);
        }
    };

    const handleGoToBack = () => {
        navigate(-1);
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
                    className='col-12 col-md-8 col-xl-8 mx-auto shadow-lg px-5'
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
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='first_name'
                                        type='text'
                                        placeholder='Juan'
                                        label='Nombre(s)'
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='last_name'
                                        type='text'
                                        placeholder='Flores'
                                        label='Apellido(s)'
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <InputDate 
                                        name='date'
                                        type='date'
                                        label='Fecha de nacimiento'
                                        onChangeCustom={handleOnChangeDate}
                                        max={dateMax}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                <Input 
                                    name='email'
                                    type='email'
                                    placeholder='Juan@gmail.com'
                                    label='Email'
                                />
                                </div>
                                <InputRadio 
                                    name='gender'
                                    label='Género'
                                    options={ genderOptions }
                                />
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='password'
                                        type='password'
                                        placeholder='*********'
                                        label='Contraseña'
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='repeat_password'
                                        type='password'
                                        placeholder='*********'
                                        label='Repetir contraseña'
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='phone'
                                        type='number'
                                        placeholder='67573722'
                                        label='Celular'
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='ci'
                                        type='number'
                                        placeholder='14113578'
                                        label='C.I.'
                                    />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className="col-12 col-lg-6 order-lg-first">
                                    <Button
                                        className='btn btn-light rounded-pill w-100 order-2 shadow-sm'
                                        onClick={ handleGoToBack }
                                    >
                                        Volver
                                    </Button>
                                </div>
                                <div className="col-12 col-lg-6 order-first">
                                    <input 
                                        type="submit" 
                                        value='Crear'
                                        className='btn btn-secondary w-100 rounded-pill text-primary shadow'
                                    />
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

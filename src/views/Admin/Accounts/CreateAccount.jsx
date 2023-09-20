import React, { useContext, useState } from 'react'
import moment from 'moment'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

import { newUserAdminSchema } from '../../../helpers/schemas-forms'
import { userDefaultValues } from '../../../helpers/defaultValues'
import { genderOptions, roleOptions } from '../../../helpers/optionsRadioBtn'
import { InputRadio } from '../../../components/input/InputRadio'
import { Input } from '../../../components/input/Input'
import { StateContext } from '../../../context/stateProvider'
import AccountService from '../../../services/Admin/accountService'

export const CreateAccount = () => {
    const [limitDate, setLimitDate] = useState('');
    const { dispatch } = useContext( StateContext );
    const form = useForm({
        resolver: yupResolver( newUserAdminSchema ),
        defaultValues: userDefaultValues
    });

    const today = new Date();
    const dateMax = moment( today ).utcOffset(0).format('yyyy-MM-dd');

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.createAccount( data )
            .then( response => {
                form.reset();
                toast.success(response.msg);
            })
            .catch( ( reason ) => {
                console.log(reason, 'error creando cuenta')
                reason.response.data.errors.forEach(( error ) => {
                    toast.error( error.msg )
                })
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onerror');
    }
    
    const handleOnChangeDate = ( e ) => {
        if( e.target.value ){
            const dateChange = moment( e.target.value )
                .utcOffset(0)
                .format('yyyy-MM-dd');

            setLimitDate( dateChange );
        }
    }

    return (
        <>
            <div className="container vh-100 d-flex justify-content-center align-items-ceter">
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
                    <div className="col-12 col-md-8 col-xl-8 mx-auto shadow-lg px-5">
                        <h2 className='text-center text-titles m-5'>Crear Cuenta</h2>
                        <FormProvider { ...form }>
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
                                            placeholder='Montaño'
                                            label='Apellido(s)'
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <Input
                                            name='date'
                                            type='date'
                                            label='Fecha de nacimiento'
                                            onChangeCustom={ handleOnChangeDate }
                                            max={ dateMax }
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <Input
                                            name='email'
                                            type='email'
                                            placeholder='juan@gmail.com'
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
                                    <div className="col-6">
                                        <InputRadio
                                            name='role'
                                            label='Tipo de Usuario'
                                            options={ roleOptions }
                                        />
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <div className="col-12 col-lg-6 order-lg-first">
                                        <NavLink
                                            className='btn w-100 order-2'
                                            onClick={() => history.back()}
                                            to='#'
                                        >
                                            Volver
                                        </NavLink>
                                    </div>
                                    <div className="col-12 col-lg-6 order-first">
                                        <input 
                                            type="submit" 
                                            value='Crear'
                                            className='btn btn-secondary text-primary w-100 rounded-pill'
                                        />
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

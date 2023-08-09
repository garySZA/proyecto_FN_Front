import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

import AccountService from '../../../services/accountService'
import { StateContext } from '../../../context/stateProvider'
import { editUserSchema } from '../../../helpers/schemas-forms'
import { Input } from '../../../components/input/Input'
import { userDefaultValues } from '../../../helpers/defaultValues'
import { InputRadio } from '../../../components/input/InputRadio'
import { genderOptions } from '../../../helpers/optionsRadioBtn'

export const EditAccount = () => {
    const { id } = useParams();
    const [limitDate, setLimitDate] = useState('');
    const { dispatch } = useContext( StateContext )
    const form = useForm({
        resolver: yupResolver( editUserSchema ),
        defaultValues: userDefaultValues
    })

    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('yyyy-MM-dd');

    useEffect(() => {
        getItem.mutateAsync().then((res) => {
            const user = {
                ...res.user,
                date: moment( res.user.date ).utcOffset(0).format('yyyy-MM-DD')
            }
            
            form.reset(user);
        })
    }, [form.reset])

    const getItem = useMutation(
        () => AccountService.getAccount( id )
    );

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await AccountService.putAccount( id, data )
            .then( res => {
                toast.success('Cambios guardados existosamente')
            })
            .catch(( reason ) => {
                console.log(reason, 'error editando cuenta')
                reason.response.data.errors-forEach(( error ) => {
                    toast.error( error.msg )
                })
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    };

    const onError = () => {
        console.log('onerror')
    }

    const handleOnChangeDate = (e) => {
        if( e.target.value ){
            const dateChange = moment( e.target.value )
                .utcOffset(0)
                .format('yyyy-MM-dd');

            setLimitDate( dateChange )
        }
    }

    return (
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
                    <h2 className='text-center text-titles m-5'>Editar Cuenta</h2>
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
                                        value='Guardar'
                                        className='btn btn-secondary text-primary w-100 rounded-pill'
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

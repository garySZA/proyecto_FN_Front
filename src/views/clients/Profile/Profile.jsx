import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify'
import { NavLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { editProfileClientSchema } from '../../../helpers/schemas-forms';
import { userDefaultValues } from '../../../helpers/defaultValues';
import { Input } from '../../../components/input/Input';
import { InputRadio } from '../../../components/input/InputRadio';
import { genderOptions } from '../../../helpers/optionsRadioBtn';
import { AuthContext } from '../../../context/AuthContext';
import { StateContext } from '../../../context/stateProvider';
import ClientService from '../../../services/Client/clientService';

export const Profile = () => {
    const { user } = useContext( AuthContext ); 
    const [limitDate, setLimitDate] = useState('');
    const { dispatch } = useContext( StateContext );
    const form = useForm({
        resolver: yupResolver( editProfileClientSchema ),
        defaultValues: userDefaultValues
    });

    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('yyyy-MM-dd');

    //? Haciendo peticion para obtener datos del cliente
    useEffect(() => {
        if( user.uid ){
            getProfile.mutateAsync().then((response) => {
                const profile = {
                    ...response.user,
                    date: moment( response.user.date ).utcOffset(0).format('yyyy-MM-DD')
                }
    
                form.reset( profile );
            })
        }
        
    }, [user])
    
    const getProfile = useMutation(
        () => ClientService.getProfile(user.uid)
    );

    // TODO: ver como hacer para que el cliente pueda cambiar su contraseña en esta sección
    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await ClientService.updateProfile( user.uid, data )
            .then( response => {
                toast.success('Cambios guardados')
                
                const profile = {
                    ...response.profile,
                    date: moment( response.profile.date ).utcOffset(0).format('yyyy-MM-DD')
                }
    
                form.reset( profile );
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
        <div className="container d-flex justify-content-center">
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
                    <h2 className='text-center text-titles m-5'>Mi Perfil</h2>
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

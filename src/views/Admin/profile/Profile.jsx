import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment';

import { AuthContext } from '../../../context/AuthContext';
import { editProfileClientSchema } from '../../../helpers/schemas-forms';
import { userDefaultValues } from '../../../helpers/defaultValues';
import { Input } from '../../../components/input/Input';
import { genderOptions } from '../../../helpers/optionsRadioBtn';
import { InputRadio } from '../../../components/input/InputRadio';
import { StateContext } from '../../../context/stateProvider';
import ProfileService from '../../../services/Admin/profileService';

export const Profile = () => {
    const [limitDate, setLimitDate] = useState('');
    const { dispatch } = useContext( StateContext )
    const form = useForm({
        resolver: yupResolver( editProfileClientSchema ),
        defaultValues: userDefaultValues
    });

    const getProfile = useMutation(
        () => ProfileService.getProfile()
    );

    useEffect(() => {
        getProfile.mutateAsync().then(( response ) => {
            const profile = {
                ...response.profile,
                date: moment( response.profile.date ).utcOffset(0).format('yyyy-MM-DD')
            }

            form.reset( profile );
        })
    }, [])
    

    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('yyyy-MM-dd');
    
    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await ProfileService.updateProfile( data )
            .then(( response ) => {
                toast.success('Cambios guardados');

                const profile = {
                    ...response.profile,
                    date: moment( response.profile.date ).utcOffset(0).format('yyyy-MM-DD')
                }

                form.reset( profile );
            })
            .catch(( reason ) => {
                console.log(reason, 'error editando cuenta')
                reason.response.data.errors.forEach(( error ) => {
                    toast.error( error.msg )
                })
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    };

    const onError = () => {
        console.log('onError')
    }

    const handleOnChangeDate = ( e ) => {
        if( e.target.value ){
            const dateChange = moment( e.target.value )
                .utcOffset(0)
                .format('yyyy-MM-dd');

            setLimitDate( dateChange );
        }
    }

    const handleChangePWD = () => {
        const modalData = {
            buttons: [{
                title: 'Cancelar',
                color: 'primary',
                letter_color: 'letters',
                action: null
            }],
            goTo: '/admin/profile/change_pass'
        }

        dispatch({ type: 'showModalConfirmPWDScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: modalData });
    }

    return (
        <div 
            className="container d-flex justify-content-center"
            data-aos="fade-up"
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
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-8 mx-auto shadow px-5">
                    <h2 className='text-center text-titles m-5'>Mi Perfíl</h2>
                    <h3 className='text-letters mb-3'>Datos Personales</h3>
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
                                <div className="col-12 col-lg-6 mx-auto">
                                    <input 
                                        type="submit" 
                                        value='Guardar'
                                        className='btn btn-secondary text-primary w-100'
                                    />
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                    <hr />
                    <button
                        className='btn mb-3 text-letters text-decoration-underline'
                        onClick={ handleChangePWD }
                    >
                        Cambiar contraseña
                    </button>
                </div>
            </div>
        </div>
    )
}

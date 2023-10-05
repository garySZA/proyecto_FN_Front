import React, { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'react-bootstrap'
import moment from 'moment'

import { editProfileClientSchema } from '../../../helpers/schemas-forms'
import { userDefaultValues } from '../../../helpers/defaultValues'
import { Input } from '../../../components/input/Input'
import { genderOptions } from '../../../helpers/optionsRadioBtn'
import { InputRadio } from '../../../components/input/InputRadio'
import { AuthContext } from '../../../context/AuthContext'
import { StateContext } from '../../../context/stateProvider'
import UserService from '../../../services/User/userService'

export const Profile = () => {
    const { user, getUser  } = useContext( AuthContext );
    const { dispatch } = useContext( StateContext );
    const [limitDate, setLimitDate] = useState('');
    const form = useForm({
        resolver: yupResolver( editProfileClientSchema ),
        defaultValues: userDefaultValues
    });

    const today = new Date();
    const dateMax = moment(today).utcOffset(0).format('yyyy-MM-dd');
    
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
        () => UserService.getProfile()
    );

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await UserService.updateProfile( data )
            .then( async response => {
                toast.success('Cambios guardados');

                const profile = {
                    ...response.profile,
                    date: moment( response.profile.date ).utcOffset(0).format('yyyy-MM-DD')
                }
    
                form.reset( profile );
                await getUser();
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
    }

    const onError = () => {
        console.log('onError');
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
            goTo: '/user/profile/change_pass'
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
                <div className="col-12 col-md-8 col-xl-8 mx-auto shadow-lg px-5">
                    <h2 className='text-center text-titles m-5'>Mi Perfíl</h2>
                    <h3>Datos Personales</h3>
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
                                        className='btn btn-secondary text-primary w-100 rounded-pill'
                                    />
                                </div>
                            </div>
                        </form>
                    </FormProvider>

                    <hr />

                    <Button
                        className='btn btn-light text-letters mb-3 text-decoration-underline rounded-pill'
                        onClick={ handleChangePWD }
                    >
                        Cambiar contraseña
                    </Button>
                </div> 
            </div>
        </div>
    )
}
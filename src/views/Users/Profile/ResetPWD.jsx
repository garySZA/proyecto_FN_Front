import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom'

import { Input } from '../../../components/input/Input'
import { ToastContainer, toast } from 'react-toastify'
import { StateContext } from '../../../context/stateProvider'
import { resetPasswordSchema } from '../../../helpers/schemas-forms'
import { defaultValuesResetPWD } from '../../../helpers/defaultValues'
import UserService from '../../../services/User/userService'
import { AuthContext } from '../../../context/AuthContext'
import { FormResetPWD } from '../../../components/FormResetPWD'

export const ResetPWD = () => {
    const { dispatch } = useContext( StateContext );
    const { logout } = useContext( AuthContext );
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver( resetPasswordSchema ),
        defaultValues: defaultValuesResetPWD
    });

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await UserService.changePassword( data )
            .then((response) => {
                toast.success('Contraseña actualizada');
                
                setTimeout(() => {
                    onSuccessSubmit();
                }, 5000);
            })
            .catch( reason => {
                console.log(reason, 'error al actualizar contraseña');

                toast.error( reason.response.data.msg )
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onerror')
    }

    const handleGoToBack = () => {
        navigate(-1);
    }

    const onSuccessSubmit = () => {
        logout();
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
                    <h2 className='text-center text-titles m-5'>Restablecer Contraseña</h2>
                    <p>
                        Ingresa una nueva contraseña para tu cuenta.
                    </p>
                    <FormResetPWD 
                        form={ form } 
                        onSubmit={ onSubmit }
                        onError={ onError }
                    />
                    <div className="d-flex justify-content-center">
                        <NavLink
                            className='btn w-75 my-3'
                            to='#'
                            onClick={ handleGoToBack }
                        >
                            Cancelar
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
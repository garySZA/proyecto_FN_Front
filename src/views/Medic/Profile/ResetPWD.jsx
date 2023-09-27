import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';

import { AuthContext } from '../../../context/AuthContext';
import { FormResetPWD } from '../../../components/FormResetPWD';
import { resetPasswordSchema } from '../../../helpers/schemas-forms';
import { defaultValuesResetPWD } from '../../../helpers/defaultValues';
import { StateContext } from '../../../context/stateProvider';
import MedicService from '../../../services/Medic/medicService';

export const ResetPWD = () => {
    const { logout } = useContext( AuthContext );
    const { dispatch } = useContext( StateContext );
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver( resetPasswordSchema ),
        defaultValues: defaultValuesResetPWD
    });

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await MedicService.changePassword( data )
            .then((response) => {
                toast.success('Contraseña actualizada');

                setTimeout(() => {
                    onSuccessSubmit();
                }, 5000);
            })
            .catch( reason => {
                console.log(reason, 'error al actualizar la contraseña');

                toast.error( reason.response.data.msg );
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onError');
    }
    
    const handleGoToBack = () => {
        navigate(-1);
    }

    const onSuccessSubmit = () => {
        logout();
    }
    
    return (
        <div className="container d-flex justify-content-center align-items-center">
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
            <div className="row w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-4 mx-auto shadow px-5">
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
                        <Button
                            className='btn btn-light w-75 my-3 rounded-pill'
                            onClick={ handleGoToBack }
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

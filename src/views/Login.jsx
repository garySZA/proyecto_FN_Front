import React, { useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup';

import { AuthContext } from '../context/AuthContext.jsx';
import { Input } from '../components/input/Input';

const schema = yup.object().shape({
    email: yup.string()
        .email('El email ingresado no es válido')
        .required('El email es requerido'),

    password: yup.string()
        .required('La contraseña es requerida')
});

const defaultValues = {
    email: '',
    password: ''
};

export const Login = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const form = useForm({
        resolver: yupResolver( schema ),
        defaultValues: defaultValues,
    });
    
    const onSubmit = async ( data ) => {
        auth.login( data )
            .then( res => {

                switch (res.user.role) {
                    case 'ADMIN_ROLE':
                        navigate('/admin/stadistics')
                        break;
                    case 'CLIENT_ROLE':
                        navigate('/client/home')
                        break;
                    case 'USER_ROLE':
                        navigate('/user/clients')
                        break;
                    case 'MEDIC_ROLE':
                        const goTo = localStorage.getItem('goto');
                        if( goTo ){
                            localStorage.removeItem('goto');
                            navigate(goTo);
                        } else {
                            navigate('/medic/patients')
                        }
                        break;
                    default:
                        toast.error('No tienes acceso al sistema')
                        break;
                }
            })
            .catch(( e ) => {
                console.log(e, 'errors')

                let message = 'Datos ingresados incorrectos'
                switch ( e.response.data.msg ) {
                    case 'USER_NOT_FOUND':
                        message = 'Usuario no registrado'
                        break;
                    case 'USER_DELETED':
                        message = 'Cuenta Bloqueada.'
                        break;
                }

                toast.error( message );
            })
    }

    const onError = ( error ) => {
        console.log('error', error);
    }

    const handleGoToBack = () => {
        navigate('/');
    }
    
    return (
        <div 
            className='container vh-100 d-flex justify-content-center align-items-center'
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="50"
            data-aos-offset="0"
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
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto shadow-lg px-5">
                    <h2 
                    className='text-center text-titles m-5'
                    >
                        Iniciar Sesión
                    </h2>
                    <FormProvider {...form}>
                        <form onSubmit={ form.handleSubmit(onSubmit, onError) }>
                            <Input 
                                name='email'
                                type='email'
                                placeholder='tuemail@ejemplo.com'
                                label='Email'
                            />
                            <Input 
                                name='password'
                                type='password'
                                placeholder='tu contraseña'
                                label='Contraseña'
                            />
                            <small><NavLink className='text-secondary' to={ '/forgot_password' }>He olvidado mi contraseña</NavLink></small>
                            <div className='d-flex justify-content-center'>
                                <input 
                                    type="submit" 
                                    value='Acceder'
                                    className='btn btn-secondary w-75 rounded-pill mt-3 text-primary shadow-sm'
                                />

                            </div>
                        </form>
                    </FormProvider>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className='btn btn-light rounded-pill w-75 my-2 shadow-sm'
                            onClick={ handleGoToBack }
                        >
                            Volver
                        </Button>
                    </div>
                    <div className='mb-4'>
                        <small
                            className='text-titles my-3'
                        >
                            Aún no tienes una cuenta? <NavLink className='text-secondary text-decoration-underline' to={'/new_account'}>Crear cuenta aquí</NavLink>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { StateContext } from '../context/stateProvider';
import { validarEmail } from '../helpers/validators';

const listClients = [
    {
        id: 1,
        name: 'juan'
    },
    {
        id: 2,
        name: 'Gary'
    }
]

export const Login = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(StateContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = ( data ) => {
        console.log(data)
        dispatch({ type: 'setClients', payload: listClients })
        state.listClients
    }

    const handleOnBack = () => {
        navigate('/');
    }
    
    return (
        <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-4 mx-auto shadow-lg px-5">
                    <h2 
                    className='text-center text-titles m-5'
                    >
                        Iniciar Sesión
                    </h2>
                    <form onSubmit={ handleSubmit( onSubmit ) }>
                        <div className="mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-2">
                            <label for="exampleFormControlInput1" className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <a className='text-titles' href='/new_account'>He olvidado mi contraseña</a>
                        <div className='d-flex justify-content-center'>
                            <input 
                                type="submit" 
                                value='Acceder'
                                className='btn btn-secondary w-75 rounded-pill mt-3'
                            />

                        </div>
                    </form>
                    <div className='d-flex justify-content-center'>
                        <button
                            className='btn w-75 mb-2'
                            onClick={ () => handleOnBack }
                        >
                            Volver
                        </button>
                    </div>
                    <p
                        className='text-titles fs-6'
                    >
                        Aún no tienes una cuenta? <NavLink className='text-secondary' to={'/new_account'}>Crear cuenta aquí</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

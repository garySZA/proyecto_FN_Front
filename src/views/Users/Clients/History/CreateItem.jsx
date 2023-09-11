import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { newItemSchema } from '../../../../helpers/schemas-forms';
import { itemDefaultValues } from '../../../../helpers/defaultValues';
import { Input } from '../../../../components/input/Input';
import { InputImage } from '../../../../components/input/InputImage';
import ClientService from '../../../../services/User/clientService';
import { StateContext } from '../../../../context/stateProvider';

export const CreateItem = () => {
    const { idHistory } = useParams();
    const { dispatch } = useContext(StateContext);
    const form = useForm({
        resolver: yupResolver( newItemSchema ),
        defaultValues: itemDefaultValues,
    });

    const { register, watch, formState: { errors } } = form;

    const onSubmit =  async data => {
        const formData = new FormData();
        formData.append('file', data.files[0]);
        formData.append('description', data.description);
        formData.append('title', data.title);

        dispatch({ type: 'showLoaderScreen', payload: true });

        await ClientService.createItem( idHistory, formData )
            .then( response => {
                toast.success('Item creado')
            })
            .catch(( reason ) => {
                console.log(reason, 'error')
                toast.error('Error al crear item')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = () => {
        console.log('onError')
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
                    <h2 className='text-center text-titles m-4'>
                        Crear item
                    </h2>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            { !watch('files' || watch('files').length === 0 ? (
                                <small>no hay imagen</small>
                            ) : ( <small> hay imagen { watch('files')[0].name } </small> ) ) }
                            <div className="row">
                                <div className="col-12">
                                    <InputImage 
                                        name='imageUpload' 
                                        label='Selecciona una imagen' 
                                        colorLabel='letters'
                                        register={ register }
                                        errors={ errors }
                                    />
                                </div>
                                <div className="col-12 col-lg-6 my-4">
                                    <Input 
                                        name='title'
                                        type='text'
                                        placeholder='título'
                                        label='Título'
                                    />
                                </div>
                                <div className="col-12 col-lg-6 my-4">
                                    <Input 
                                        name='description'
                                        type='text'
                                        placeholder='descripción'
                                        label='Descripción'
                                    />
                                </div>
                                <div className='row mb-3'>
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
                                            className='btn btn-secondary w-100 rounded-pill'
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

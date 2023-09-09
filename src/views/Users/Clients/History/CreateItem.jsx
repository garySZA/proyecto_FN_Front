import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
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
    const [image, setImage] = useState('');
    const form = useForm({
        resolver: yupResolver( newItemSchema ),
        defaultValues: itemDefaultValues,
    });

    const { register, watch, formState: { errors } } = form;
    
    const convert2base64 = file => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage( reader.result.toString() );
        };

        reader.readAsDataURL( file )
    }

    const onSubmit =  async data => {

        console.log(data, 'data')

        const file = data.files[0];

        const formData = new FormData();
        formData.append('file', data.files[0]);
        formData.append('description', data.description);
        formData.append('title', data.title);

        if( data.files.length > 0){
            convert2base64( data.files[0] );
        }

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
                    <h2 className='text-center text-titles m-5'>
                        Crear item
                    </h2>
                    { image ? <img src={ image } width='450' /> : null }
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            { !watch('files' || watch('files').length === 0 ? (
                                <small>no hay imagen</small>
                            ) : ( <small> hay imagen { watch('files')[0].name } </small> ) ) }
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='title'
                                        type='text'
                                        placeholder='título'
                                        label='Título'
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <Input 
                                        name='description'
                                        type='text'
                                        placeholder='descripción'
                                        label='Descripción'
                                    />
                                </div>
                                <div className="col-12">
                                    {/* <InputImage 
                                        name='image'
                                        placeholder='seleccione una imagen'
                                        label='Selecciona una imagen'
                                    /> */}
                                    <input type="file" id='imageUpload' { ...register('files') } />
                                    <label htmlFor="imageUpload">Selecciona una img</label>
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
                                    { errors.files && <div className='text-danger'>{ errors.files.message }</div> }
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

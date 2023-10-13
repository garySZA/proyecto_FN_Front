import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

import { editItemSchema, newItemSchema } from '../../../../helpers/schemas-forms';
import { itemDefaultValues } from '../../../../helpers/defaultValues';
import { Input } from '../../../../components/input/Input';
import { InputImage } from '../../../../components/input/InputImage';
import { StateContext } from '../../../../context/stateProvider';
import { AuthContext } from '../../../../context/AuthContext';
import ClientService from '../../../../services/User/clientService';
import { useMutation } from '@tanstack/react-query';

export const CreateItem = ({ edit }) => {
    const { idHistory, idItem } = useParams();
    const { dispatch } = useContext(StateContext);
    const { user } = useContext(AuthContext)
    const [isReseted, setIsReseted] = useState(false);
    const [item, setItem] = useState(undefined);
    const navigate = useNavigate();
    const form = useForm({
        resolver: yupResolver( edit ? editItemSchema : newItemSchema ),
        defaultValues: itemDefaultValues,
    });

    const { register, watch, formState: { errors } } = form;

    const getItem = useMutation(
        () => ClientService.getItem( idItem )
    )

    useEffect(() => {
        if( edit ){
            getItem.mutateAsync().then(( response ) => {
                form.reset( response.item );
                setItem(response.item);

                console.log(item,'utes')
            })
        }
    }, [])

    const onSubmit =  async data => {
        const formData = new FormData();
        formData.append('file', data.files[0]);
        formData.append('description', data.description);
        formData.append('bodyPart', data.bodyPart);
        formData.append('creator', user.uid);

        dispatch({ type: 'showLoaderScreen', payload: true });

        await ( edit ?  ClientService.updateItem( item.id, formData ) : ClientService.createItem( idHistory, formData ))
            .then( response => {
                toast.success(`Item ${ edit ? 'editado' : 'creado' }`)
                if( !edit ){
                    form.reset()
                    setIsReseted(true);
                }
            })
            .catch(( reason ) => {
                console.log(reason, 'error')
                toast.error(`Error al ${ edit ? 'editar' : 'crear' } item`)
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
            <div
                className='row my-auto w-100 bg-primary'
            >
                <div
                    className='col-12 col-md-8 col-xl-8 mx-auto shadow-lg px-5'
                >
                    <h2 className='text-center text-titles m-4'>
                        Crear item
                    </h2>
                    {
                        !user.pending ? (

                            <FormProvider { ...form }>
                                <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                                    <div className="row">
                                        <div className="col-12">
                                            <InputImage 
                                                name='imageUpload' 
                                                label='Selecciona una imagen' 
                                                colorLabel='letters'
                                                register={ register }
                                                errors={ errors }
                                                isReseted={ isReseted }
                                                setIsReseted={ setIsReseted }
                                                imgEdit={ item }
                                                edit={ edit }
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 my-4">
                                            <Input 
                                                name='bodyPart'
                                                type='text'
                                                placeholder='Ejem: Tórax'
                                                label='Parte del cuerpo'
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 my-4">
                                            <Input 
                                                name='description'
                                                type='text'
                                                placeholder='Una breve descripción'
                                                label='Descripción'
                                            />
                                        </div>
                                        <div className='row mb-3'>
                                            <div className="col-12 col-lg-6 order-lg-first">
                                                <Button
                                                    className='btn btn-light w-100 order-2 rounded-pill'
                                                    onClick={() => history.back()}

                                                >
                                                    Volver
                                                </Button>
                                            </div>
                                            <div className="col-12 col-lg-6 order-first">
                                                <input 
                                                    type="submit" 
                                                    value={ edit ? 'Guardar' : 'Crear' }
                                                    className='btn btn-secondary w-100 rounded-pill text-primary'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </FormProvider>
                        ) : (
                            <p>Tu cuenta aún no ha sido autorizada, por favor intenta mas tarde.</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

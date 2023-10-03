import React, { useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { createValorationSchema } from '../../../helpers/schemas-forms';
import { defaultValuesCreateValoration } from '../../../helpers/defaultValues';
import { InputArea } from '../../../components/input/InputArea';
import { AuthContext } from '../../../context/AuthContext';
import { StateContext } from '../../../context/stateProvider';
import { Input } from '../../../components/input/Input';
import ValorationsService from '../../../services/Medic/valorationsService';

export const CreateValoration = ({ setIsUpdated, toast, setShow }) => {
    const { idItem, idPatient } = useParams();
    const { user: { uid: idMedic } } = useContext(AuthContext);
    const { dispatch } = useContext(StateContext);
    const form = useForm({
        resolver: yupResolver( createValorationSchema ),
        defaultValues: defaultValuesCreateValoration
    });

    const onSubmit = async ( data ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await ValorationsService.createValoration({ ...data, idItem, idPatient, idMedic })
            .then(( response ) => {
                setIsUpdated( true );
                setShow( false );
                toast.success('Tu valoración ha sido registrada');
            })
            .catch(( reason ) => {
                toast.error('Error al registrar tu valoración');
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            });
    }

    const onError = ( ) => {
        console.log('onError');
    }

    const handleCancelCreate = () => {
        console.log('cancelanding')
    }

    return (
        <div 
            className="d-flex justify-content-center align-items-center"
            data-aos="fade-in"
        >
            <div className="row my-auto w-100 bg-primary">
                <div className="col-12 col-md-8 col-xl-8 mx-auto shadow-sm px-5">
                    <h2 className='text-center text-titles my-5 m-xl-5'>Registrar valoración</h2>
                        <p>
                            Llena los campos del siguiente formulario para poder registrar tu valoración respecto al item del paciente.
                        </p>
                        <FormProvider { ...form }>
                            <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                                <div className="row">
                                    <div className="col-12">
                                        <InputArea
                                            name='studyMethod'
                                            type='text'
                                            placeholder='describe el método de estudio'
                                            label='Método de estudio:'
                                            colorPlaceholder='text-letters'
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label='Motivo del estudio:'
                                            name='reason'
                                            type='text'
                                            colorPlaceholder='text-letters'
                                            placeholder='ingresa el motivo de estudio'
                                        />
                                    </div>
                                    <div className="col-12">
                                        <InputArea
                                            name='description'
                                            type='text'
                                            placeholder='ingresa una descripción'
                                            label='Descripción:'
                                            colorPlaceholder='text-letters'
                                        />
                                    </div>
                                    <div className="col-12">
                                        <InputArea
                                            name='conclusion'
                                            type='text'
                                            placeholder='tu conclusión'
                                            label='Conclusión:'
                                            colorPlaceholder='text-letters'
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input 
                                        type="submit" 
                                        value='Registrar'
                                        className='btn btn-letters w-75 mt-3 text-primary'
                                    />
                                </div>
                            </form>
                        </FormProvider>
                        <div className="d-flex justify-content-center">
                            <Button 
                                variant='light'
                                className='text-letters'
                                onClick={ () => handleCancelCreate }
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}

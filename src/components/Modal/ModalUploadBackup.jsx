import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { StateContext } from '../../context/stateProvider';
import { uploadBackupSchema } from '../../helpers/schemas-forms';
import { defaultValuesUploadBackup } from '../../helpers/defaultValues';
import { InputUploadBackup } from '../input/InputUploadBackup';
import BackupService from '../../services/Admin/backupService';

export const ModalUploadBackup = () => {
    const { state, dispatch } = useContext( StateContext );
    const [show, setShow] = useState( state.showModalUploadBackup );
    const form = useForm({
        resolver: yupResolver( uploadBackupSchema ),
        defaultValues: defaultValuesUploadBackup
    });

    const { register, watch, formState: { errors } } = form;

    const onSubmit = async data => {
        const formData = new FormData();
        formData.append('file', data.files[0]);

        dispatch({ type: 'showLoaderScreen', payload: true });
        
        await BackupService.uploadBackup( formData )
            .then( response => {
                toast.success('Backup guardado')
                form.reset();

                dispatch({ type: 'setIsDataBackupUpdate', payload: true })
            })
            .catch( reason => {
                console.log(reason, 'error');
                toast.error('Error al subir el backup')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const onError = ( e ) => {
        console.log('onError', e);
    }

    const handleClose = () => {
        dispatch({ type: 'showModalUploadBackup', payload: false });
    }

    return (
        <>
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
            <Modal style={{ zIndex: 1050 }} show={ show } onHide={ handleClose } >
                <Modal.Header closeButton>
                    <Modal.Title> Subir Backup </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Debe subir un backup generado por el mismo sistema para no sufrir algún daño en los datos.
                    </p>
                    <FormProvider { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                            <div className='row mt-4'>
                                <div className='col-12 col-md-12 mx-auto mb-2'>
                                    <InputUploadBackup 
                                        errors={ errors }
                                        label='Selecciona un archivo .gz'
                                        name='file'
                                        register={ register }
                                    />
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-12 col-md-7 mx-auto'>
                                        <input
                                            type='submit'
                                            value='Subir'
                                            className='btn btn-secondary text-primary w-100 rounded-pill'
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={ `text-letters rounded-pill` }
                        variant='light'
                        onClick={ () => handleClose() }
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

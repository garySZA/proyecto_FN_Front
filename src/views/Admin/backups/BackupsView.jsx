import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import BackupService from '../../../services/Admin/backupService';
import { StateContext } from '../../../context/stateProvider';
import { TableBackups } from '../../../components/Table/TableBackups';
import { defaultFilters, defaultResult } from '../../../helpers/defaultValues';
import { headerTableAllBackupsAdmin, headerTableBackupsAdmin } from '../../../helpers/tableContents';
import { TableAllBackups } from '../../../components/Table/TableAllBackups';

export const BackupsView = () => {
    const [result, setResult] = useState( defaultResult );
    const [filters, setFilters] = useState({ ...defaultFilters })
    const [resultAllBackups, setResultAllBackups] = useState(defaultResult);
    const [filtersAllBackups, setFiltersAllBackups] = useState({ ...defaultFilters });
    const [isUpdated, setIsUpdated] = useState( true );
    const [isUpdatedAllBackups, setIsUpdatedAllBackups] = useState(true);
    const { dispatch, state } = useContext( StateContext );

    const getItems = useMutation(
        () => BackupService.getBackupsRegistered( filters )
    );

    const getAllBackups = useMutation(
        () => BackupService.getAllBackups( filtersAllBackups )
    );

    useEffect(() => {

        (isUpdated || state.isDataBackupUpdated) && getItems.mutateAsync().then( res => {
            setResult( res );
            setIsUpdated( false );
            dispatch({ type: 'setIsDataBackupUpdate', payload: false })
        });
    }, [isUpdated, state.isDataBackupUpdated])
    
    useEffect(() => {
        (isUpdatedAllBackups || state.isDataBackupUpdated) && getAllBackups.mutateAsync().then( res => {
            setResultAllBackups( res );
            setIsUpdatedAllBackups( false );
            dispatch({ type: 'setIsDataBackupUpdate', payload: false })
        })
    }, [isUpdatedAllBackups, state.isDataBackupUpdated])
    

    const handleCreateBackup = async () => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await BackupService.generateBackup()
            .then( response => {
                toast.success('Backup creado');

                setIsUpdated(true);
            })
            .catch( reason => {
                console.log(reason.message, 'Error creando backup')
                toast.error('Error al crear backup')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    const handleDownloadBackup = async ( item ) => {
        dispatch({ type: 'showLoaderScreen', payload: true });
        
        BackupService.downloadBackup({ fileName: 'radiografia__2023-12-23_235428.gz' })
        .then( async response => {
            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = item.file;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch( reason => {
            console.error('Error en la descarga: ', reason.message)
        })
        .finally( () => {
            dispatch({ type: 'showLoaderScreen', payload: false });
        })
    }

    const handleChangeBackup = async ( item ) => {
        const { file } = item;
        dispatch({ type: 'showModalScreen', payload: false });
        dispatch({ type: 'setDataModal', payload: {}});

        dispatch({ type: 'showLoaderScreen', payload: true });

        await BackupService.changeBackup({ fileName: file })
            .then( response  => {
                toast.success('Cambio realizado');
                setIsUpdated( true );
            })
            .catch( reason => {
                console.log(reason);
                toast.error('Ocurrió un error, intenta mas tarde.')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })



        console.log(item, 'item')
    }

    const modalInfo = {
        title: 'Atención!',
        content: 'Los datos actuales del sistema serán reemplazados por completo por los que contiene el backup seleccionado. ¿Estas seguro de realizar esta acción?',
        buttons: [{
            title: 'Cargar Backup',
            color: 'light',
            letter_color: 'letters',
            action: handleChangeBackup
        },
        {
            title: 'Cancelar',
            color: 'danger',
            letter_color: 'primary'
        },]
    }

    const handleConfirmChangeBackup = ( item ) => {
        dispatch({ type: 'showModalScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: { ...modalInfo, element: item } });
    }


    const handleGenerateDropOptions = ( item ) => {
        const dropOptions = [
            {
                label: 'Cargar Backup',
                action: handleConfirmChangeBackup,
                state: true
            },
            {
                label: 'Descargar Backup',
                action: handleDownloadBackup,
                state: true
            }
        ]

        return dropOptions;
    }
    
    const handleShowModalUploadBackup = () => {
        dispatch({ type: 'showModalUploadBackup', payload: true });
    }

    const handleShowUploadBackupModal = () => {
        const modalData = {
            buttons: [{
                title: 'Cancelar',
                color: 'primary',
                letter_color: 'letters',
                action: null
            }],
            close: true,
            verifySuccess:{
                action: handleShowModalUploadBackup
            }
        }

        dispatch({ type: 'showModalConfirmPWDScreen', payload: true });
        dispatch({ type: 'setDataModal', payload: modalData });
    }

    return (
        <>
            <div className="container">
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
                <div className="row">
                    <div className="col col-md-12 mx-auto">
                        <div className='d-flex mb-2'>
                            <h2 className='text-letters'>Backups del Sistema</h2>
                            <Button 
                                className='ms-auto me-2 text-letters' 
                                variant='light'
                                onClick={ () => handleShowUploadBackupModal() }
                            >
                                Subir un backup
                            </Button>
                            <Button 
                                className='text-primary' 
                                variant='letters'
                                onClick={ () => handleCreateBackup() }
                            >
                                Generar backup
                            </Button>
                        </div>
                    </div>
                    <hr />
                    <div className='col col-md-12 mx-auto'>
                        <h3 className='text-letters'>Backups registrados</h3>
                        <TableBackups 
                            filters={ filters }
                            getItems={ getItems }
                            headers={ headerTableBackupsAdmin }
                            isUpdated={ isUpdated }
                            options
                            optionsDrop={ handleGenerateDropOptions }
                            result={ result }
                            setFilters={ setFilters }
                            setIsUpdated={ setIsUpdated }
                            setResult={ setResult }
                            showSearch={false}
                        />
                    </div>
                    <hr />
                    <div className='col col-md-12 mx-auto'>
                        <h3 className='text-letters'>Todos los backups realizados: </h3>
                        <TableAllBackups 
                            filters={ filtersAllBackups }
                            getItems={ getAllBackups }
                            headers={ headerTableAllBackupsAdmin }
                            isUpdated={ isUpdatedAllBackups }
                            options
                            optionsDrop={ handleGenerateDropOptions }
                            result={ resultAllBackups }
                            setFilters={ setFiltersAllBackups }
                            setIsUpdated={ setIsUpdatedAllBackups }
                            setResult={ setResultAllBackups }
                            showSearch={false}
                        />
                    </div>
                </div>
            </div>
        
        </>
    )
}

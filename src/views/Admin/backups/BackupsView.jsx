import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { StateContext } from '../../../context/stateProvider'
import BackupService from '../../../services/Admin/backupService';
import { ToastContainer, toast } from 'react-toastify';

export const BackupsView = () => {
    const { dispatch } = useContext( StateContext );

    const handleCreateBackup = async () => {
        dispatch({ type: 'showLoaderScreen', payload: true });

        await BackupService.generateBackup()
            .then( response => {
                toast.success('Backup creado')
            })
            .catch( reason => {
                console.log(reason.message, 'Error creando backup')
                toast.error('Error al crear backup')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
    }

    
    
    return (
        <div className="col">
            <div className="row">
                <div className="col-12 d-flex mb-2">
                    <h2 className='text-letters'>Backups del Sistema</h2>
                    <Button 
                        className='ms-auto text-primary' 
                        variant='letters'
                        onClick={ () => handleCreateBackup() }
                    >
                        Generar backup
                    </Button>
                </div>
                <hr />
                <div className="col">
                    <button onClick={ () => { downloadBackup() } }>Descargar backup</button>
                </div>
                <div className="col">
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
                </div>
            </div>
        </div>
    )
}

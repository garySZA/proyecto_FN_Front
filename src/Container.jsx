import React, { useContext } from 'react'
import LoaderScreen from './components/Loader/LoaderScreen';
import { StateContext } from './context/stateProvider'
import { AppRouter } from './router';
import { ModalGeneric } from './components/Modal/Modal';
import { ModalCheckPassword } from './components/Modal/ModalCheckPassword';
import { ModalRadiography } from './components/Modal/ModalRadiography';
import { ModalShareLink } from './components/Modal/ModalShareLink';
import { ModalUploadBackup } from './components/Modal/ModalUploadBackup';

export const Container = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            { state.showModalConfirmPWDScreen && <ModalCheckPassword /> }
            { state.showModalUploadBackup && <ModalUploadBackup /> }
            { state.showModalFullScreenRadio && <ModalRadiography /> }
            { state.showModalShareLink && <ModalShareLink /> }
            <AppRouter />
        </>
    )
}

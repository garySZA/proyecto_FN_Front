import React, { useContext } from 'react'
import { StateContext, StateProvider } from './context/stateProvider'
import { AppRouter } from './router';
import LoaderScreen from './components/Loader/LoaderScreen';
import { ModalGeneric } from './components/Modal/Modal';

export const Container = () => {
    const { state } = useContext( StateContext );
    
    return (
        <>
            { state.showLoaderScreen && <LoaderScreen /> }
            { state.showModalScreen && <ModalGeneric /> }
            <AppRouter />
        </>
    )
}
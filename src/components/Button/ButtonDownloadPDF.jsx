import React, { useContext } from 'react';
import moment from 'moment/moment';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import 'moment/locale/es';

import { Icon } from '../Icon';
import { StateContext } from '../../context/stateProvider';
import ClientService from '../../services/Client/clientService';

export const ButtonDownloadPDF = ({ idValoration, toast, item }) => {
    const { idItem } = useParams();
    const { dispatch } = useContext( StateContext );
    const { bodyPart, createdAt } = item;
    const date = moment(createdAt).locale('es').format('LLL');

    const handleDownloadPDF = async () => {
        try {
            dispatch({ type: 'showLoaderScreen', payload: true });

            await ClientService.downloadPDF( idItem, idValoration )
            .then(( response ) => {
                const pdfBlob = new Blob([response], { type: 'application/pdf' });
                const pdfURL = window.URL.createObjectURL( pdfBlob );

                const link = document.createElement('a');
                link.href = pdfURL;
                link.download = `${bodyPart} ${date}.pdf`;
                document.body.appendChild( link );
                link.click();

                window.URL.revokeObjectURL( pdfURL );

                toast.success('PDF listo')
            })
            .catch((reason) => {
                console.log(reason, 'reason')
            })
            .finally(() => {
                dispatch({ type: 'showLoaderScreen', payload: false });
            })
        } catch (error) {
            console.log( 'Error al descargar el pdf', error );
            toast.error('Error al descargar PDF, vuelve a intentar mas tarde')
        }
    }
    
    return (
        <>
            <Button
                variant='letters'
                className='shadow-sm text-primary pe-3 w-100 my-2'
                onClick={ handleDownloadPDF }
            >
                <Icon 
                    icon='FaFileDownload' 
                    title='Compartir' 
                    size={20} 
                    className='mx-2'
                    color='primary'
                />
                Descargar valoración
            </Button>
        </>
    )
}

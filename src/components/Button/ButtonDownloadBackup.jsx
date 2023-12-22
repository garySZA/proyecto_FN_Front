import React from 'react'
import { Button } from 'react-bootstrap';

export const ButtonDownloadBackup = () => {
    const downloadBackup = async () => {
        try {
            const response = await fetch('http://localhost:7171/api/admin/backup', {
                method: 'GET',
            })

            if( !response.ok ){
                throw new Error('Error al descargar el archivo');
            }

            //Respuesta positiva
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'backup.gz';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error en la descarga: ', error.message)
        }
    }

    return (
        <Button> Descargar backup </Button>
    )
}

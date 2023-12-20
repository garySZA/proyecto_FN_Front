import React from 'react'
import { Button } from 'react-bootstrap';
import moment from 'moment/moment';
import 'moment/locale/es';
import { Icon } from '../Icon';

export const ButtonDownloader = ({ imgSrc, styles, iconColor, iconTitle, item }) => {
    
    const handleDownload = async () => {
        const { bodyPart, createdAt } = item;
        const date = moment(createdAt).locale('es').format('LLL');

        const imageBlob = await fetch(imgSrc)
            .then((response) => response.arrayBuffer())
            .then((buffer) => new Blob([buffer], { type: 'image/jpeg' }));

            const link = document.createElement('a');
            link.href = URL.createObjectURL(imageBlob);
            link.download = `${bodyPart} - ${ date }.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    }
    
    return (
        <Button className={`${styles}`} onClick={() => handleDownload() }>
            <Icon icon='AiOutlineDownload' className='mb-1 p-0 mx-1' color={ iconColor } title={ iconTitle }/>
            Descargar imagen
        </Button>
    )
}

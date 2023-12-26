import React from 'react'
import { getFileExtension, isBackupExtensionAllowed } from '../../helpers/methods';

export const InputUploadBackup = ({ name, label, register, errors }) => {
    
    const handleOnChange = ( event ) => {
        if( event.target.files.length > 0 ){
            const file = event.target.files[0];
            const { name } = file;
            const fileExtension = getFileExtension( name );

            if( isBackupExtensionAllowed( fileExtension ) ){
                const reader = new FileReader();
                reader.readAsDataURL( file );
            }
        } else {
            console.log('not file')
        }
    }
    
    return (
        <>
            <div>
                <label 
                    htmlFor={ name }
                    className='form-label'
                >
                    { label }
                </label>
                <input 
                    type="file" 
                    id={ name }
                    className='form-control text-letters'
                    { ...register('files') }
                    onChange={ handleOnChange }
                    accept='.gz'
                />
            </div>
            {
                errors.files && <small className='text-danger'>{ errors.files.message }</small>
            }
        </>
    )
}

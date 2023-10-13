import React, { useEffect, useState } from 'react';

import noImage from '../../assets/img/no_image.jfif';
import { getFileExtension, isImageExtensionAllowed } from '../../helpers/methods';

const imageDefault = {
    src: noImage,
    alt: 'image not uploaded'
}

export const InputImage = ({ name, label, colorLabel, placeholder, colorPlaceholder,  register, errors, isReseted, setIsReseted, imgEdit, edit }) => {
    const [image, setImage] = useState({ ...imageDefault, src: edit ? imgEdit : imageDefault.src  });

    useEffect(() => {
        if( isReseted ){
            setImage({ ...imageDefault })
            setIsReseted(false);
        }

        if( imgEdit?.img ){
            setImage({ src: imgEdit.img, alt: 'radiography' })
        }

    }, [isReseted, imgEdit])
    

    const handleChangeImage = ( event ) => {
        if( event.target.files.length > 0 ){
            const file = event.target.files[0];
            const { name } = file;
            const fileExtension = getFileExtension( name )
            
            if( isImageExtensionAllowed( fileExtension ) ){
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage({
                        src: reader.result.toString(),
                        alt: 'x-ray uploaded today'
                    });
                }
        
                reader.readAsDataURL( file );
            }
        } else {
            setImage({ ...imageDefault })
        }
    }

    return (
        <>
            <div className='text-center w-100 mx-auto shadow-sm'>
                <img 
                    src={ image.src }
                    alt={ image.alt }
                    className='rounded img-thumbnail'
                />
            </div>
            <div>
                <label 
                    htmlFor={ name }
                    className={ `form-label` }
                >
                    { label }
                </label>
                <input 
                    type="file"
                    id={ name }
                    className={ `form-control text-letters` }
                    { ...register('files') }
                    onChange={ handleChangeImage }
                />
            </div>
            {
                errors.files && <small className='text-danger'>{ errors.files.message }</small>
            }
        </>
    )
}

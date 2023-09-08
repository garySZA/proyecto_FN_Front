import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { Controller, useFormState } from 'react-hook-form';

export const InputImage = ({ name, label, colorLabel, placeholder, colorPlaceholder }) => {
    const formState = useFormState();
    const [image, setImage] = useState(null);
    
    const handleImageUpload = ( event ) => {
        const file = event.target.files[0];

        console.log(file, 'arch')

        if( file ){
            const reader = new FileReader();

            reader.onload = ( e ) => {
                setImage( e.target.result );
            }

            reader.readAsDataURL( file );
        }
    };

    return (
        <Controller
            name={ name }
            defaultValue={''}
            render={({ field }) => (
                <div className='mb-3'>
                    <label 
                        htmlFor={ name }
                        className={`form-label text-${colorLabel}`}
                    >
                        { label }
                    </label>
                    <div className="input-group">
                        <input 
                            type="file"
                            id={ name } 
                            placeholder={ placeholder }
                            className={`form-control ${ colorPlaceholder } text-letters`}
                            onChange={ handleImageUpload }
                            
                        />
                    </div>

                    {
                        image && (
                            <div>
                                <h5 className='mt-3'> Imagen cargada:</h5>
                                <Image src={ image } alt='Imagen cargada' fluid className='mb-3'/>
                                <Button variant='danger' onClick={() => setImage(null)}>
                                    Eliminar imagen
                                </Button>
                            </div>
                        )
                    }
                    {
                        formState.errors[name] &&
                            <small className='text-danger'>
                                { String(formState.errors[name] ? (!formState.errors[name]?.message.msg ? formState.errors[name]?.message : '') : '' )}
                            </small>
                    }
                </div>
            )}
        >

        </Controller>
    )
}

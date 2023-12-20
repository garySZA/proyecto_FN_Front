import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { bodyParts } from '../../helpers/bodyParts';


export const DropdownBodyParts = ({ name }) => {
    const formState = useFormState();
    const { control } = useFormContext();
    
    return (
        <Controller
            name={ name }
            control={control}
            defaultValue=''
            render={({ field }) => (
                <div>
                    <label 
                        htmlFor="bodyPart"
                        className='form-label'
                    >
                        Parte del Cuerpo
                    </label>
                    <select 
                        name="bodyPart" 
                        id="bodyPart"
                        aria-label='Parte de cuerpo'
                        className='form-select'
                        value={ bodyParts[0].value }
                        { ...field }
                    >
                        {
                            bodyParts.map((part, i) => (
                                <option value={part.value} key={ i }>{ part.label }</option>
                            ))
                        }
                    </select>
                    {
                        formState.errors[name] &&
                            <small
                                className='text-danger'
                            >
                                { String(formState.errors[name] ? (!formState.errors[name]?.message.msg ? formState.errors[name]?.message : '') : '' ) }
                            </small>
                    }
                </div>

            )}
        >
        </Controller>
    )
}

import React from 'react'
import { Controller, useFormState } from 'react-hook-form'

export const InputArea = ({ name, placeholder, label, colorPlaceholder, colorLabel }) => {
    const formState = useFormState();

    return (
        <Controller
            name={ name }
            render={({field}) => (
                <div className='mb-3'>
                    <label className={`form-label text-${ colorLabel }`}>{ label }</label>
                    <textarea
                        className={`form-control ${ colorPlaceholder } text-${colorLabel}`}
                        rows='3'
                        placeholder={ placeholder }
                        { ...field }
                    ></textarea>
                    {
                        formState.errors[name] &&
                            <small
                                className='text-danger'
                            >
                                { String(formState.errors[name] ? formState.errors[name]?.message : '') }
                            </small>
                    }
                </div>
            )}
        ></Controller>
    )
}

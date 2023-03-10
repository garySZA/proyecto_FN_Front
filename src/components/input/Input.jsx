import React from 'react'
import { Controller, useFormState } from 'react-hook-form'

export const Input = ({ name, type, placeholder, label, colorPlaceholder, colorLabel }) => {
    const formState = useFormState();

    return (
        <Controller
            name={ name }
            render={({field}) => (
                <div className='mb-3'>
                    <label htmlFor="email" className={`form-label text-${colorLabel}`}>{ label }</label>
                    <input 
                        type={ type } 
                        placeholder={ placeholder }
                        className={`form-control ${ colorPlaceholder } text-${colorLabel}`}
                        { ...field }
                    />
                    { 
                        formState.errors[name] &&
                            <small
                                className='text-danger'
                            >
                                { String(formState.errors[name] ? (!formState.errors[name]?.message.msg ? formState.errors[name]?.message : '') : '' )}
                            </small>
                    }
                </div>
            )}
        >

        </Controller>
    )
}
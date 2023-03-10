import React from 'react'
import { Controller, useFormState } from 'react-hook-form'

const styleError = {
    
}

export const Input = ({ name, type, placeholder, label }) => {
    const formState = useFormState();

    return (
        <Controller
            name={ name }
            render={({field}) => (
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>{ label }</label>
                    <input 
                        type={ type } 
                        placeholder={ placeholder }
                        className='form-control'
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
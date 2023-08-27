import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const InputRadio = ({ name, label, options, disabled, align='between' }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    
    return (
        <Controller
            name={ name }
            control={ control }
            render={({ field: { name, value, onBlur, ref, onChange } }) => (
                <div
                    className='d-flex flex-column'
                >
                    <h6
                        className='text-titles'
                    >
                        { label }
                    </h6>
                    <div
                        className={ `d-flex flex-column flex-md-row w-100 justify-content-${align} flex-wrap flex-md-nowrap mb-3`}
                    >
                        {
                            options?.map(({label: optionLabel, value: optionValue}, index) => (
                                <label
                                    htmlFor={ optionValue }
                                    className='d-flex w-25 align-items-center gap-2 text-letters'
                                    key={ index }
                                >
                                    <input
                                        type='radio'
                                        name={ name }
                                        onBlur={ onBlur }
                                        value={ optionValue }
                                        ref={ ref }
                                        checked={ String(value) === String(optionValue) }
                                        onChange={ onChange }
                                        disabled={ disabled }
                                        id={ optionValue }
                                        className='text-secondary'
                                        
                                    />
                                    <p
                                        className='mb-0'
                                    >
                                        { optionLabel }
                                    </p>
                                </label>
                            ))
                        }
                    </div>
                    {
                        errors[name] && 
                            <small
                                className='text-danger mb-2'
                            >
                                { String(errors[name] ? errors[name]?.message : '') }
                            </small>
                    }
                </div>
            )}
        >

        </Controller>
    )
}
import React from 'react'
import { Controller, useFormState } from 'react-hook-form'

export const InputDate = ({ name, type, label, placeholder, min='', max='', onChangeCustom = (e) => {}, disabled=false }) => {
    const formState = useFormState();

    const getDate = ( value ) => {
        if( value ){
            return value.toString().substring(0,10);
        }

        return value
    }

    return (
        <Controller
            name={ name }
            render={({ field }) => (
                <div
                    className='mb-3 w-100'
                >
                    <label
                        className='form-label'
                    >
                        { label }
                    </label>
                    <input
                        type={ type }
                        placeholder={ placeholder }
                        spellCheck={ false }
                        {...field}
                        value={ type === 'date' ? getDate(field.value) : field.value }
                        min={ min }
                        max={ max }
                        disabled={ disabled }
                        onChange={( e ) => {
                            onChangeCustom( e );
                            field.onChange( e );
                        }}
                        className='w-100 form-control'
                    />
                    {
                        formState.errors[name] && (
                            <small
                                className='text-danger'
                            >
                                { String( formState.errors[name] ? formState.errors[name]?.message : '' ) }
                            </small>
                        )
                    }
                </div>
            )}
        >

        </Controller>
    )
}

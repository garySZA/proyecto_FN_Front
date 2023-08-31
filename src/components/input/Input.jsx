import React, { useState } from 'react'
import { Controller, useFormState } from 'react-hook-form'
import { FaEyeSlash, FaEye } from 'react-icons/fa';

export const Input = ({ name, type='text', placeholder, label, colorPlaceholder, colorLabel }) => {
    const formState = useFormState();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Controller
            name={ name }
            defaultValue={''}
            render={({field}) => (
                <div className='mb-3'>
                    <label 
                        htmlFor={ name } 
                        className={`form-label text-${colorLabel}`}
                    >
                        { label }
                    </label>
                    <div className="input-group">
                        <input 
                            type={ type === 'password' ? (showPassword ? 'text' : 'password')  : type } 
                            placeholder={ placeholder }
                            className={`form-control ${ colorPlaceholder } text-primary`}
                            id={ name }
                            { ...field }
                        />
                        {
                            type === 'password' ?
                                <button className='float-end' type='button' onClick={ togglePasswordVisibility }>
                                    {
                                        showPassword ? 
                                        <FaEyeSlash className='text-letters'/>
                                        :
                                        <FaEye className='text-letters'/>
                                    }
                                </button>
                            : ''
                        }
                    </div>

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
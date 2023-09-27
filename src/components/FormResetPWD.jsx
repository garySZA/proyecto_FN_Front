import React from 'react'
import { FormProvider } from 'react-hook-form'

import { Input } from './input/Input'

export const FormResetPWD = ({ form, onSubmit, onError }) => {
    return (
        <FormProvider { ...form }>
            <form onSubmit={ form.handleSubmit( onSubmit, onError ) }>
                <Input
                    name='password'
                    type='password'
                    placeholder='Contraseña'
                />
                <Input 
                    name='repeat_password'
                    type='password'
                    placeholder='Repetir la contraseña'
                />
                <div className="d-flex justify-content-center">
                    <input 
                        type="submit" 
                        value='Cambiar'
                        className='btn btn-secondary w-75 mt-3 text-primary rounded-pill'
                    />
                </div>
            </form>
        </FormProvider>
    )
}

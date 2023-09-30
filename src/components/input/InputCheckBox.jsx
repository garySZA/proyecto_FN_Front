import React from 'react';

export const InputCheckBox = ({ isChecked, setIsChecked }) => {
    
    const handleCheckboxChange = () => {
        setIsChecked( !isChecked );
    }
    return (
        <>
            <label 
                htmlFor="checkbox"
                className='form-check-label text-letters'
            >
                <input 
                    type="checkbox" 
                    id="checkbox" 
                    className='form-check-input'
                    
                    checked={ isChecked }
                    onChange={ handleCheckboxChange }
                />
                Trabajo en el laboratorio o soy médico?
            </label>
        </>
    )
}
